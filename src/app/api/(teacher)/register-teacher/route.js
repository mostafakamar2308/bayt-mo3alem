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
    if (error.name === "ValidationError") {
      console.log(Object.keys(error.errors)[0]);
      return NextResponse.json({
        success: false,
        message: error.errors[Object.keys(error.errors)[0]].message,
      });
    } else if (error.code === 11000) {
      return NextResponse.json({
        success: false,
        error,
        message: `please use another ${Object.keys(error.keyPattern)[0]}`,
      });
    } else {
      return NextResponse.json({
        success: false,
        error,
        message: "An error has occured, please try again later",
      });
    }
  }
}
