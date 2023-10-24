import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const body = await request.json();
    const {playlistId} = body;
    
    const playlist = await prisma.playlist.delete({
        where: {
            id: playlistId
        }
    })

    return NextResponse.json(playlist)
}