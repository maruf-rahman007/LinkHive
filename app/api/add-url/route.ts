import { NEXT_AUTH } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Use findUniqueOrThrow for more concise error handling
        const user = await prisma.user.findUniqueOrThrow({
            where: { email: session.user.email },
            select: { id: true } // Only get the id
        });

        const profile = await prisma.profile.findUniqueOrThrow({
            where: { userId: user.id },
            include: { accounts: true } // Include related accounts
        });

        return NextResponse.json({ profile });
    } catch (error) {
        // Return specific error messages
        return NextResponse.json({ error: error || "Error while fetching profile." }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(NEXT_AUTH);

    if (!session?.user) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { url, platform } = await req.json();
        
        const user = await prisma.user.findUniqueOrThrow({
            where: { email: session.user.email },
            select: { id: true } // Only get the id
        });

        const profile = await prisma.profile.findUniqueOrThrow({
            where: { userId: user.id },
            select: { id: true } // Only get the id
        });

        const newUrlData = await prisma.account.create({
            data: {
                url: url || "",
                platform: platform || "",
                profileId: profile.id,
                userId: user.id
            }
        });

        return NextResponse.json({
            message: 'URL added successfully',
            newUrlData
        });
    } catch (error) {
        return NextResponse.json({ error: error|| "Error while adding URL." }, { status: 500 });
    }
}
