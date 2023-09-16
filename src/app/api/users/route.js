import dbConnect from "@/DB/connect";
import { NextResponse } from "next/server";
import User from "@/DB/Models/Teacher";

export async function GET(req) {
  return NextResponse.json({ success: "done" });
}
