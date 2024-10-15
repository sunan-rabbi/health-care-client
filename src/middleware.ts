import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authRoutes = ['/login', '/register']
const commonRoutes = ['/dashboard', '/dashboard/change-password'];
const privateRoutes = {
    ADMIN: ['/dashboard/admin'],
    DOCTOR: ['/dashboard/doctor'],
    PATIENT: ['/dashboard/patient'],
    SUPER_ADMIN: ['/dashboard/super-admin']
};

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log({ pathname, flag: '=========================================================================' });

    // Retrieve the access token from cookies
    const accessToken = cookies().get('accessToken')?.value;

    // If no token, redirect to login
    if (!accessToken) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    // Allow common routes if the token is present
    if (accessToken && commonRoutes.includes(pathname)) {
        return NextResponse.next();
    }

    // Decode the access token to get the role
    let decodedValue;
    try {
        decodedValue = jwtDecode(accessToken as string);
    } catch (error) {
        // If token decoding fails, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
    }

    const role = (decodedValue as any)?.role;

    // If no role found in the token, redirect to login
    if (!role) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    // Map role to its private routes and check if the user is authorized to access the current path
    const allowedRoutes = privateRoutes[role as keyof typeof privateRoutes];
    const isAuthorized = allowedRoutes && allowedRoutes.some(route => pathname.startsWith(route));

    // If the user is authorized, allow access
    if (isAuthorized) {
        return NextResponse.next();
    }

    // Otherwise, redirect to the homepage or an unauthorized page
    return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register'], // Match all routes under /dashboard
};
