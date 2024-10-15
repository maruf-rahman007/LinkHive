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
        const user = await prisma.user.findUniqueOrThrow({
            where: { email: session.user.email },
            select: { id: true }
        });

        const profile = await prisma.profile.findUnique({
            where: { userId: user.id },
            include: { accounts: true }
        });

        return NextResponse.json({ profile });
    } catch (error) {
        console.error("Error in GET /api/profile:", error);
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
        if (!url || !platform) {
            return NextResponse.json({ message: 'URL and platform are required.' }, { status: 400 });
        }

        const user = await prisma.user.findUniqueOrThrow({
            where: { email: session.user.email },
            select: { id: true }
        });

        const profile = await prisma.profile.findUniqueOrThrow({
            where: { userId: user.id },
            select: { id: true }
        });

        const newUrlData = await prisma.account.create({
            data: {
                url: url,
                platform: platform,
                profileId: profile.id,
                userId: user.id
            }
        });

        return NextResponse.json({
            message: 'URL added successfully',
            newUrlData
        });
    } catch (error) {
        console.error("Error in POST /api/add-url:", error);
        return NextResponse.json({ error: error || "Error while adding URL." }, { status: 500 });
    }
}
