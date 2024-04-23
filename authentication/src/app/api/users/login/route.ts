import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    console.log(reqBody);

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    console.log(user);

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { success: false, message: 'Incorrect Password' },
        { status: 400 }
      );
    } else {
      const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
      };
      const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
      
      // Set the token as a cookie
      const response = NextResponse.json({
        message: "Logged in successfully",
        success: true
      });
      response.cookies.set("token", token, { httpOnly: true });
      
      return response;
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
