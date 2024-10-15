import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// Handling GET requests
export async function GET(req: Request) {
    // Extract the username from query parameters
    const { searchParams } = new URL(req.url);
    const username = searchParams.get("username"); // Get the username from the query string

    console.log("Requested username:", username);
    
    if (!username) {
        return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }

    try {
        // Fetch the profile along with its associated accounts
        const profile = await prisma.profile.findUnique({
            where: { username: username },
            include: {
                accounts: true, // Include related accounts
            },
        });
        console.log("Here is profile from card info",profile);
        // Check if the profile was found
        if (profile) {
            return NextResponse.json({ profile });
        } else {
            return NextResponse.json({ error: "No such user exists" }, { status: 404 });
        }
    } catch (error) {
        console.error("Error fetching data from the database:", error);
        return NextResponse.json({ error: "Error while fetching data from the database" }, { status: 500 });
    }
}
