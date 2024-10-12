import { NEXT_AUTH } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Handling GET requests
export async function GET(req: Request) {
    const session = await getServerSession(NEXT_AUTH);

    return NextResponse.json({
        session
    });
}

// Handling POST requests
export async function POST(req: Request) {
    const session = await getServerSession(NEXT_AUTH);

    console.log(session)
    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const user = await prisma.user.findUnique({
        where:{
            email:session.user.email
        }
    })

    if(!user) {
        return NextResponse.json({ message: 'User Does not exist' }, { status: 404 });
    }

    try {
      const data = await req.json(); // Parse the incoming JSON data
      const { username, title, profilePicture } = data;
  
      // Log received data for debugging
      console.log('Received data:', { username, title, profilePicture });
  
      // Check if a profile with the same userId (username) already exists
      const existingProfile = await prisma.profile.findUnique({
        where: {
          username: username,
        },
      });
  
      if (existingProfile) {
        // Return error if username already exists
        return NextResponse.json(
          { message: "Username already exists, please choose another name" },
          { status: 400 }
        );
      }
  
      // Create a new profile if the username is unique
      const newProfile = await prisma.profile.create({
        data: {
          userId: user.id,
          headline: title,
          image: profilePicture,
          username:username,
          name:session.user.name,
        },
      });
  
      return NextResponse.json({
        message: 'Profile updated successfully',
        newProfile,
      });
    } catch (error) {
      // Log and return a more detailed error response
      //@ts-ignore
      console.error('Error processing request:', error.message);
      return NextResponse.json(
        { message: 'Something went wrong, please try again', error: error },
        { status: 500 }
      );
    }
  }