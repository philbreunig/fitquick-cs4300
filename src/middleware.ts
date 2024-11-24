import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: any) {
    const session = await auth();

    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, request.nextUrl.pathname);

    const reqUrl = new URL(request.url);

    if (!isAuthenticated && reqUrl.pathname !== "/") {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (reqUrl.pathname === "/") {
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/create-item/",
    ]
};

