import { NextResponse } from "next/server";
/**
 * Import local JSON data containing user information
 * This is typically used for testing or demonstration purposes
 * In production, this would usually be replaced with a database call
 */
import test from "@/app/api/test.json";

/**
 * GET - Retrieves user information from local JSON data
 *
 * @param {Request} request - The incoming request object
 * @param {Object} context - Contains route parameters including userId
 * @returns {NextResponse} - Returns the matched user data or empty array
 *
 * Route Pattern:
 * /api/users/[userId]
 *
 * URL Parameters (from context):
 * - userId: The ID of the user to fetch
 *
 * Example URLs:
 * /api/users/1
 * /api/users/123
 *
 * Response format:
 * {
 *   user: [
 *     {
 *       id: number,
 *       // ... other user properties from test.json
 *     }
 *   ]
 * }
 *
 * Note: This implementation uses local JSON data.
 * Consider replacing with a database query for production use.
 */
export async function GET(request: Request, context: any) {
  // Extract userId from route parameters
  const { params } = context;

  // Filter the test data to find user matching the provided ID
  // Convert ID to string for comparison since params are always strings
  const user = test.filter((x) => params.userId === x.id.toString());

  // Return the matched user(s) in an array
  return NextResponse.json({
    user
  });
}
