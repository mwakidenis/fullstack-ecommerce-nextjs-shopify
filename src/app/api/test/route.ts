import { NextResponse } from "next/server";

// GET /api/route
// Returns a simple hello world response
// Used for health checks and API verification
export async function GET() {
  return NextResponse.json({
    hello: "world"
  });
}

// POST /api/route
// Accepts JSON data in request body
// Returns the received data back to client
export async function POST(request: Request) {
  // TODO: Add request validation
  // Example of query param usage:
  // const keyword = request.nextUrl.searchParams.get("keyword")

  const data = await request.json();
  return NextResponse.json({
    data
  });
}

// PATCH /api/route
// Currently returns static response
// TODO: Implement actual update logic
export async function PATCH() {
  return NextResponse.json({
    hello: "world"
  });
}
