import { NextResponse } from "next/server";

export async function GET() {
  try {
    return NextResponse.json({ key: process.env.CHAI_AI_KEY });
  } catch (error) {
    NextResponse.json({ error: "/test " + error }, { status: 401 });
  }
}
