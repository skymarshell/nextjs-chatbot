import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { CreateUserCookieResponse } from "@/types/Cookie";
import User_Info from "@/types/User_Info";

const privateKey = process.env.SESSION_SECRET || "default_private_key";
const User_Info_Cookie = "User_Info";

export async function GET() {
  const cookie = (await cookies()).get(User_Info_Cookie)?.value;

  try {
    if (!cookie) {
      return NextResponse.json({ error: "User not login" }, { status: 401 });
    }

    const decoded = jwt.verify(cookie, privateKey) as User_Info;

    return NextResponse.json<User_Info>(
      { username: decoded.username },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token : " + error },
      { status: 401 }
    );
  }
}

// Create cookie
export async function POST(req: NextRequest) {
  const body = await req.json();

  const username = body.username;

  const expiresDay = 30;

  const data: User_Info = {
    username,
  };

  const token = jwt.sign(data, privateKey);

  (await cookies()).set(User_Info_Cookie, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: expiresDay * 24 * 60 * 60,
    path: "/",
  });

  return NextResponse.json<CreateUserCookieResponse>(
    {
      message: "Cookie Created.",
      success: true,
      encode_value: token,
    },
    { status: 200 }
  );
}

// logout
export async function DELETE() {
  (await cookies()).set(User_Info_Cookie, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0), // Expire immediately
    path: "/",
  });

  return NextResponse.json(
    { message: "Deleted Cookie.", success: true },
    { status: 200 }
  );
}
