import { NextResponse } from "next/server";
import test from "@/app/api/test.json";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const user = test.filter((x) => params.userId === x.id.toString());
  //   const data = await request.json();

  return NextResponse.json({
    user,
  });
}