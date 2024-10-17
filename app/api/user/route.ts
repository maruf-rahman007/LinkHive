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
// Handling POST requests
export async function POST(req: Request) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session || !session.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    });

    if (!user) {
        return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    try {
        const data = await req.json(); // Parse the incoming JSON data
        const { username, title, profilePicture } = data;

        const existingUsernameProfile = await prisma.profile.findUnique({
            where: {
                username: username,
            }
        })
        if (existingUsernameProfile && existingUsernameProfile.userId != user.id) {
            return NextResponse.json({
                message: "Username is taken Try another one"
            }, { status: 409 })
        }
        // Check if a profile with the same userId already exists
        const existingProfile = await prisma.profile.findUnique({
            where: {
                userId: user.id,
            },
        });

        if (existingProfile) {
            // Update the existing profile
            const updatedProfile = await prisma.profile.update({
                where: { id: existingProfile.id },
                data: {
                    headline: title,
                    image: profilePicture,
                    username: username,
                    name: session.user.name,
                },
            });

            return NextResponse.json({
                message: 'Profile updated successfully',
                updatedProfile,
            },{ status: 200 });
        } else {
            // Create a new profile if it doesn't exist
            const newProfile = await prisma.profile.create({
                data: {
                    userId: user.id,
                    headline: title,
                    image: profilePicture,
                    username: username,
                    name: session.user.name,
                },
            });

            return NextResponse.json({
                message: 'Profile created successfully',
                newProfile,
            },{ status: 200 });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return NextResponse.json(
            { message: 'Something went wrong, please try again', error: error },
            { status: 500 }
        );
    }
}
