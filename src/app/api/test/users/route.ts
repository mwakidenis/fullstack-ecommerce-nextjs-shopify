import { NextResponse } from "next/server";
import data from "@/app/api/test.json";

export async function GET() {

  return NextResponse.json({
    data,
  });
}