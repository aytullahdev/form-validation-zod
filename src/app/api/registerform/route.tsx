import { schema } from "@/app/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  const parse = schema.safeParse(data);
  if (parse.success) {
    return NextResponse.json({ message: "User registered successfully" });
  } else {
    return NextResponse.json({ message: "User registration failed" });
  }
}
