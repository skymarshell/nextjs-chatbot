import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ test: "test" });
  } catch (error) {
    NextResponse.json({ error: "/test " + error }, { status: 401 });
  }
}
