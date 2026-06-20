// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    // 1. Check karein ki user ke paas login token/cookie hai ya nahi
    // 'auth-token' ki jagah aap apni cookie ka real naam likhein
    const token = request.cookies.get('admin_token')?.value

    // 2. Agar token nahi hai, toh user ko login page par redirect kar dein
    if (!token) {
        // login ke sath '?callbackUrl' jodna ek achhi practice hai, 
        // taaki login ke baad user wapas usi dashboard page par aa sake
        const loginUrl = new URL('/auth/login', request.url)
        loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname)

        return NextResponse.redirect(loginUrl)
    }

    // 3. Agar token hai, toh request ko aage badhne dein
    return NextResponse.next()
}

// 4. Sabse important part: Matcher
// Yeh middleware sirf unhi routes par chalega jo '/dashboard' se shuru hote hain
export const config = {
    matcher: ['/dashboard/:path*'],
}