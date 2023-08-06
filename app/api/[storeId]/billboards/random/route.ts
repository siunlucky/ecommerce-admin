import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        if (!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const billboardCount = await prismadb.billboard.count();
        const randomIndex = Math.floor(Math.random() * billboardCount);

        const randomBillboards = await prismadb.billboard.findMany({
            take: 1,
            skip: randomIndex
        });

        return NextResponse.json(randomBillboards[0]);

    } catch (error) {
        console.log('[RANDOM_BILLBOARD_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}