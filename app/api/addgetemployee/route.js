// Import necessary modules
import connectDB from "@/db";
import Employee from "@/app/models/EmployeeSchema";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  try {
    // Ensure the request contains JSON data
    const { nameId, name, email, mobile, designation, gender, courses, image } = await req.json();

    // Connect to the database
    const db = await connectDB();

    // Check if the email already exists in the database
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      // If email exists, return an alert message
      return NextResponse.json({
        message: 'Employee with this email already exists',
      }, {
        status: 400, // Bad Request status code
      });
    }

    // If email does not exist, create a new employee
    const employee = await Employee.create({ nameId, name, email, mobile, designation, gender, courses, image });

    // Return success response
    return NextResponse.json({
      message: 'Employee created successfully',
      data: employee,
    }, {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json({
      message: 'Error creating employee. Please try again.',
    }, {
      status: 500,
    });
  }
};

export const GET = async (req, res) => {
  try {
    // Connect to the database
    const db = await connectDB();

    // Retrieve all employees
    const employees = await Employee.find();

    // Return success response with employee data
    return NextResponse.json({
      data: employees,
    }, {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json({
      message: 'Error fetching employees. Please try again.',
    }, {
      status: 500,
    });
  }
};

export const PUT = async (req, res) => {
  try {


     console.log("req",req);
      const { id } = req.query;
      const { nameId, name, email, mobile, designation, gender, courses, image } = await req.json();

      // Connect to the database
      const db = await connectDB();

      // Check if the employee exists
      const existingEmployee = await Employee.findById(id);
      if (!existingEmployee) {
          return NextResponse.json({
              message: 'Employee not found',
          }, {
              status: 404, // Not Found status code
          });
      }

      // Update the employee fields
      existingEmployee.nameId = nameId;
      existingEmployee.name = name;
      existingEmployee.email = email;
      existingEmployee.mobile = mobile;
      existingEmployee.designation = designation;
      existingEmployee.gender = gender;
      existingEmployee.courses = courses;
      existingEmployee.image = image;

      // Save the updated employee
      const updatedEmployee = await existingEmployee.save();

      // Return success response with updated employee data
      return NextResponse.json({
          message: 'Employee updated successfully',
          data: updatedEmployee,
      }, {
          status: 200,
      });
  } catch (error) {
      console.error('Error updating employee:', error);
      return NextResponse.json({
          message: 'Error updating employee. Please try again.',
      }, {
          status: 500,
      });
  }
};





export const DELETE = async (req, res) => {
  try {
    // Ensure the request contains JSON data
    const { nameId } = await req.json();

    // Connect to the database
    const db = await connectDB();
 
    // Check if the user exists
    

    const existingEmployee = await Employee.findOne({ nameId });

    if (!existingEmployee) {
      return NextResponse.json({
        message: 'Employee not found',
      }, {
        status: 404
      });
    }

    // Delete the employee
    await Employee.deleteOne({ nameId }); // Use deleteOne to remove the employee

    // Return success response
    return NextResponse.json({
      message: 'Employee deleted successfully',
    }, {
      status: 200
    });
  } catch (error) {
    console.error('Error deleting employee:', error);
    return NextResponse.json({
      message: 'Error deleting employee. Please try again.',
    }, {
      status: 500
    });
  }
};



