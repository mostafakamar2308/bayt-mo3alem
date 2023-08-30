import dbConnect from "@/DB/connect";
import { NextResponse } from "next/server";
import User from "@/DB/Models/User";

export async function GET(req) {
  return NextResponse.json({ success: "done" });
}

export async function POST(req) {
  const { name, email } = await req.json();
  await dbConnect();
  await User.create({ name, email });
  return NextResponse.json({ success: "done" });
}
