import { NEXT_AUTH } from "@/app/lib/auth";
import prisma from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";



export async function POST (req:Request) {
    
    const session = await getServerSession(NEXT_AUTH);

    if(!session.user) {
        return NextResponse.json({ message:"Unauthorized!" }, {status:401});
    }
    
    const data = await req.json();
    console.log("1 DATA ",data);
    const { id } = data.profileAccounts[data.index];
    console.log("Id For delete is : ",id);
    const deleteAccoubnt = await prisma.account.delete({
        where:{
            id:id
        }
    })
    console.log("response after delete account ,",deleteAccoubnt);
    return NextResponse.json({
        message:"Backend is fine",
        deleteAccoubnt
    },
{
    status:200
})
}