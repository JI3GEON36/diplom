import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
    const flavors = await prisma.flavor.findMany({
        orderBy:{
            name:'desc'
        }
    })


     return NextResponse.json(flavors)
}