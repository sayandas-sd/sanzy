import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import { prismaClient } from "@/lib/db";
const YT_REGEX = new RegExp("^https?:\/\/(www\.)?youtube\.com\/watch\?v=[a-zA-Z0-9_-]{11}$");

const streamSchema = z.object({
    creatorID: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {
    try{
        const data = streamSchema.parse(await req.json())
        const yt = YT_REGEX.test(data.url)

        if(!yt) {
            return NextResponse.json({
                msg: "wrong Input"
            },{
                status: 411
            })
        }

        const extractedId = data.url.split("?v=")[1];

        await prismaClient.stream.create({
            data: {
                userId: data.creatorID,
                url: data.url,
                extractedId,
                type: "Youtube"
            }
        })

    } catch(e) {
        return NextResponse.json({
            msg: "Invalid Stream"
        },{
            status: 411
        })
    }
    const data = await req.json();
    const { success } = streamSchema.safeParse(data);
}

