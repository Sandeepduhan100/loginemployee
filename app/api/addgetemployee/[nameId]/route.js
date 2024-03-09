import connectDB from "@/db";
import Employee from "@/app/models/EmployeeSchema";
import { NextResponse } from "next/server";





export const GET = async (req, res) => {
    try {
        const url = req.nextUrl;
        // console.log("search path", url);
        const nameId = url.pathname.split('/').pop();

        // console.log("getting name id", nameId); 
        // Connect to the database
        const db = await connectDB();

        // Find the employee by nameId
        const employee = await Employee.findOne({ nameId });

        // Check if the employee exists
        if (!employee) {
            return NextResponse.json({
                message: 'Employee not found',
            }, {
                status: 404, // Not Found status code
            });
        }

        return NextResponse.json({
            employee: employee,
          }, {
            status: 200,
          });

        // Return success response with employee data
        // const response = NextResponse.json({ data: employee });
        // console.log("Response:", response);
        // return response;
    } catch (error) {
        console.error('Error fetching employee:', error);
        return res.status(500).json({ message: 'Error fetching employee. Please try again.' });
    }
};



export const PUT = async (req, res) => {
    try {
        // const url = req.nextUrl;
        // const nameId = url.pathname.split('/').pop();

        // Destructure request body to get data to update
        const {nameId, name, email, mobile, designation, gender, courses, image } = await req.json();

      console.log("name id",nameId);
      console.log("name id",name);
      console.log("name id",email);
      console.log("name id",mobile);
      console.log("name id",designation);
      console.log("name id",gender);
      console.log("name id",courses);


        // Connect to the database
        const db = await connectDB();

        // Check if the employee exists by ID
        const existingEmployee = await Employee.findOne({ nameId });
        if (!existingEmployee) {
            return NextResponse.json({
                message: 'Employee not found',
            }, {
                status: 404, // Not Found status code
            });
        }

        // Update the employee fields
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
            employee: updatedEmployee,
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

// export const PUT = async (req, res) => {
//     try {
//       // Ensure the request contains JSON data
//       const { id, name, description } = await req.json();
  
//       // Connect to the database
//       const db = await connectDB();
   
//       // Check if the user exists
//       const existingUser = await User.findOne({ id });
  
//       if (!existingUser) {
//         console.log('User with this ID does not exist.');
//         return NextResponse.json({
//           message: 'User with this ID does not exist.',
//         }, {
//           status: 404,
//         });
//       }
  
//       // Update the user data
//       await User.updateOne({ id }, { name, description });
  
//       return NextResponse.json({
//         message: 'User data updated successfully',
//       }, {
//         status: 200,
//       });
//     } catch (error) {
//       console.error('Error during user data update:', error);
//       return NextResponse.json({
//         message: 'Error updating user data. Please try again 000.',
//       }, {
//         status: 500,
//       });
//     }
//   };