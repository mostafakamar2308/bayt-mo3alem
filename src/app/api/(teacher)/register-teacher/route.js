import User from "@/DB/Models/Teacher";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import dbConnect from "@/DB/connect";
export async function POST(request) {
  try {
    const { name, email, password, phoneNumber, gender, subject } =
      await request.json();
    await dbConnect();
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      gender,
      phoneNumber,
      subject,
    });
    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET
    );
    const cookieStore = cookies();
    cookieStore.set("token", token);
    return NextResponse.json({ success: true, token });
  } catch (error) {
    return NextResponse.json({
      success: false,
      msg: error,
    });
  }
}
