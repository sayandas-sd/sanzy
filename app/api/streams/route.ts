import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";
import { prismaClient } from "@/lib/db";


var YT_REGEX = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

//@ts-ignore
import youtubesearchapi from "youtube-search-api";
import { stringify } from "querystring";


const streamSchema = z.object({
    creatorId: z.string(),
    url: z.string()
})

export async function POST(req: NextRequest) {

    try{
        const data = streamSchema.parse(await req.json())

        const yt = data.url.match(YT_REGEX)

        if(!yt) {
            return NextResponse.json({
                message: "wrong Input"
            },{
                status: 411
            })
        }
        
        const extractedId = data.url.split("?v=")[1];

        const res = await youtubesearchapi.GetVideoDetails(extractedId);
        
        const thumbnail = res.thumbnail.thumbnails;
        thumbnail.sort((a: {width: number}, b: {width: number}) => a.width < b.width ? -1 : 1);

        const stream = await prismaClient.stream.create({
            data: {
                userId: data.creatorId,
                url: data.url,
                extractedId,
                type: "Youtube",
                title: res.title ?? "sorry can't find the video",
                smallImage: (thumbnail.length > 1 ? thumbnail[thumbnail.length - 2].url : thumbnail[thumbnail.length - 1].url) ?? "https://img.freepik.com/premium-photo/happy-dog-wearing-headphones-portrait-isolated-background_759707-3861.jpg",
                bigImage: thumbnail[thumbnail.length - 1].url ?? "https://img.freepik.com/premium-photo/happy-dog-wearing-headphones-portrait-isolated-background_759707-3861.jpg"
            }
        })

        return NextResponse.json({
            message: "added new stream",
            id: stream.id
        })

    } catch(e) {
        console.log(e)
        return NextResponse.json({
            message: "Invalid Stream"
        },{
            status: 411
        })
    }
}


export async function GET(req: NextRequest) {

    const creatorId = req.nextUrl.searchParams.get("creatorId");

    const streams = await prismaClient.stream.findMany({
        where: {
            id: creatorId ?? "" 
        }
    })

    return NextResponse.json({
        streams
    })
}



