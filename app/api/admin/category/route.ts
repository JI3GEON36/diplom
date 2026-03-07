import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const category = await prisma.category.findMany({
        orderBy:{
            name:'desc'
        }
    })


    return NextResponse.json(category)
}