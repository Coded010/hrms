import { NextResponse } from "next/server";

export default async function proxy(request) {
    const isPrefetch =
        request.headers.get("next-router-prefetch") === "1" ||
        request.headers.get("purpose") === "prefetch";

    if (isPrefetch) {
        return NextResponse.next();
    }

    const cookies = request.cookies.getAll();
    const hasSessionCookie = cookies.some((c) => c.name.startsWith("sb-"));

    const PROTECTED_PATHS = ["/dept", "/admin", "/hr", "/finance", "/me"];
    const isProtected = PROTECTED_PATHS.some((p) =>
        request.nextUrl.pathname.startsWith(p)
    );

    if (!hasSessionCookie && isProtected) {
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

    return response;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
