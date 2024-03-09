import { NextResponse } from "next/server";
import connectDb from "@/db";
import User from "@/app/models/UserSchema";

export const POST = async (req, res) => {
  try {
    // Ensure the request contains JSON data
    const body = await req.json();
    console.log("Received request body:", body);

    // Connect to the database
    const db = await connectDb();
 
    // Check if the user already exists
    const existingUser = await User.findOne({ username: body.username });

    if (existingUser) {
      // User already exists, redirect to login page
      return NextResponse.json({
        message: 'User already exists',
      }, {
        status: 200,
      });
    }

    // If the user doesn't exist, proceed with registration
    await User.create(body);

    return NextResponse.json({
      message: 'User registered successfully',
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error during user registration:', error);
    return NextResponse.json({
      message: 'Error during registration. Please try again.',
    }, {
      status: 500,
    });
  }
};
