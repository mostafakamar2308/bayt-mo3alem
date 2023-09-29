import { NextResponse } from "next/server";
import Lead from "@/DB/Models/Lead";

export async function POST(req) {
  const { name, phone, subject } = await req.json();
  try {
    const newLead = await Lead.create({
      name,
      phone,
      subject,
    });
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: e.message, success: false });
  }
}
