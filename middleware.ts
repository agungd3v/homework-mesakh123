import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./app/utils/session";

export async function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;

  if (session && request.nextUrl.pathname.startsWith("/auth")) {
    return Response.redirect(new URL("/dashboard", request.url))
  }

  if (!session && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/auth", request.url));
  }

  if (session && request.nextUrl.pathname.startsWith("/dashboard/admin")) {
    const isSession: any = await getSession();
    if (isSession?.user.role != 1) {
      return NextResponse.error();
    }
  }
  if (session && request.nextUrl.pathname.startsWith("/dashboard/manager")) {
    const isSession: any = await getSession();
    if (isSession?.user.role != 2) {
      return NextResponse.error();
    }
  }
  if (session && request.nextUrl.pathname.startsWith("/dashboard/viewer")) {
    const isSession: any = await getSession();
    if (isSession?.user.role != 3) {
      return NextResponse.error();
    }
  }

  // if (!session && request.nextUrl.pathname.startsWith("/api/admin")) {
  //   return NextResponse.json({message: "api not found"}, {status: 404});
  // }
  // if (!session && request.nextUrl.pathname.startsWith("/api/manager")) {
  //   return NextResponse.json({message: "api not found"}, {status: 404});
  // }
  // if (!session && request.nextUrl.pathname.startsWith("/api/viewer")) {
  //   return NextResponse.json({message: "api not found"}, {status: 404});
  // }

  // if (session && request.nextUrl.pathname.startsWith("/api")) {
  //   const isSession: any = await getSession();
  //   if (isSession?.user.role == 1 && !request.nextUrl.pathname.startsWith("/api/admin")) {
  //     return NextResponse.json({message: "api not found"}, {status: 404});
  //   }
  //   if (isSession?.user.role == 2 && !request.nextUrl.pathname.startsWith("/api/manager")) {
  //     return NextResponse.json({message: "api not found"}, {status: 404});
  //   }
  //   if (isSession?.user.role == 3 && !request.nextUrl.pathname.startsWith("/api/viewer")) {
  //     return NextResponse.json({message: "api not found"}, {status: 404});
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
}