import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== process.env.AUTH_PASSWORD) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set("auth", process.env.AUTH_PASSWORD!, {
    httpOnly: true,
    path: "/",
  });

  return NextResponse.json({ ok: true });
}
