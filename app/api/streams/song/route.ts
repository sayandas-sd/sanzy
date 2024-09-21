import { prismaClient } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const session = await getServerSession();

    //check user auth

    const user = await prismaClient.user.findFirst({
        where: {
            email: session?.user?.email ?? ""
        }
    })

    if(!user) {
        return NextResponse.json({
            msg: "unauthenricate"
        },{
            status: 403
        })
    }

    //fetch all stream

    const streams = await prismaClient.stream.findMany({
        where: {
            id: user.id ?? "" 
        },
        include: {
            _count: {
                select: {
                    upvotes: true
                }
            },
            upvotes:{
                where:{
                    userId: user.id
                }
                
            }
        }
    })

    return NextResponse.json({
        streams: streams.map(({_count, ...rest})=> ({
            ...rest,
            upvotes: _count.upvotes,
            likeVote: rest.upvotes.length? true :  false
        }))
    })

}