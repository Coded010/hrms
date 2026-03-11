import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function proxy(request) {
    // 1. THE MAGIC FIX: Bypass Supabase completely for Next.js prefetch requests!
    // This eliminates the latency issue by stopping parallel background requests.
    const isPrefetch = 
        request.headers.get("next-router-prefetch") === "1" || 
        request.headers.get("purpose") === "prefetch";

    if (isPrefetch) {
        return NextResponse.next();
    }

    // 2. Normal Middleware Logic for actual route visits
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
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

    // 3. SECURE: Back to using getUser(). 
    // Since we bypassed prefetches, this will no longer cause lag!
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    if (user && request.nextUrl.pathname === "/") {
        const url = request.nextUrl.clone();
        url.pathname = `/dashboard/${user.id}/overview`;
        return NextResponse.redirect(url);
    }

    return response;
}

export const config = {
    matcher:[
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};