// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const auth = request.cookies.get("auth");

  if (!auth || auth.value !== process.env.AUTH_PASSWORD) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/"], // add any routes you want protected
};
