import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get("variant")?.value;

  if (cookie === "A") {
    return NextResponse.next();
  }

  if (cookie === "B") {
    return NextResponse.rewrite(new URL("/variante-b", request.url));
  }

  const variant = Math.random() < 0.5 ? "A" : "B";
  const response =
    variant === "A"
      ? NextResponse.next()
      : NextResponse.rewrite(new URL("/variante-b", request.url));

  console.log(variant);

  response.cookies.set("variant", variant, {
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 días
  });

  return response;
}
