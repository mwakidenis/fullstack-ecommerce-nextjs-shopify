import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hello: 'world',
    })
}

export async function POST(request: Request) {
    // console.log(req.nextUrl.serachParams.get("keyword"))
    const data = await request.json();
    return NextResponse.json({
        data,
    })
}

export async function PATCH() {
    return NextResponse.json({
        hello: 'world',
    })
}