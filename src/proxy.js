import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { getCurrentUser } from "./lib/supabase/auth/getCurrentUser";

export async function proxy(request) {
    const isPrefetch = 
        request.headers.get("next-router-prefetch") === "1" || 
        request.headers.get("purpose") === "prefetch";

    if (isPrefetch) {
        return NextResponse.next();
    }

    const cookies = request.cookies.getAll();
    const hasSessionCookie = cookies.some((c) => c.name.startsWith('sb-'));

    if (!hasSessionCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (!hasSessionCookie && request.nextUrl.pathname === "/") {
        return NextResponse.next();
    }

    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLISHABLE_KEY,
        {
            cookies: {
                getAll() { return request.cookies.getAll(); },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value),
                    );
                    response = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        response.cookies.set(name, value, options),
                    );
                },
            },
        },
    );

    const claims = await getCurrentUser();

    if (!claims && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (claims && request.nextUrl.pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = `/dashboard/${claims.sub}/overview`;
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher:[
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};