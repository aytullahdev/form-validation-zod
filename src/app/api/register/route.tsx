import { schema } from "@/app/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const parese = schema.safeParse(data);

  if (parese.success) {
    return NextResponse.json({ message: "User registered successfully" });
  } else {
    return NextResponse.json({ message: "User registration failed" });
  }
}
