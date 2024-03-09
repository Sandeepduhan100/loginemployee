// Import necessary modules
import connectDB from "@/db";
import User from "@/app/models/UserSchema";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // Ensure the request contains JSON data
    const { username, password } = await req.json();

    // Connect to the database
    const db = await connectDB();
 
    // Check if the user exists
    const existingUser = await User.findOne({ username });

    if (!existingUser || existingUser.password !== password) {
      console.log('Invalid username or password');
      return NextResponse.json({
        message: 'Invalid username or password',
      }, {
        status: 400,
      });
    }

    // If the user exists and password matches, return success
    return NextResponse.json({
      message: 'Login successful',
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({
      message: 'Error during login. Please try again.',
    }, {
      status: 500,
    });
  }
};
