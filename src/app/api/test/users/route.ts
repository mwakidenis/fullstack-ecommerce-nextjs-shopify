import { NextResponse } from "next/server";
import data from "@/app/api/test.json";

// Handle GET requests for test data
// Returns JSON response containing data from test.json
export async function GET() {
  // TODO: Add error handling if test.json is malformed
  // TODO: Consider adding request validation

  return NextResponse.json({
    data
  });
}
