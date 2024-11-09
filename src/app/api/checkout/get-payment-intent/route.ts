import { NextResponse } from "next/server";
/**
 * Initialize Stripe client with secret key
 * Ensure STRIPE_SECRET_KEY is properly set in environment variables
 */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * POST - Retrieves payment intent details from Stripe
 *
 * @param {Request} req - Request containing the payment_intent ID
 * @returns {NextResponse} - Returns payment amount and currency details
 *
 * This endpoint:
 * 1. Validates the presence of payment_intent ID
 * 2. Retrieves payment details from Stripe
 * 3. Returns formatted payment information
 */
export async function POST(req: Request) {
  try {
    // Extract payment intent ID from request body
    const { payment_intent } = await req.json();

    // Validate payment intent ID presence
    if (!payment_intent) {
      return NextResponse.json(
        { error: "Payment intent ID is required" },
        { status: 400 }
      );
    }

    // Retrieve payment intent details from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(payment_intent);

    // Return formatted payment details
    // Convert amount from cents (Stripe format) to dollars for frontend display
    return NextResponse.json({
      amount: paymentIntent.amount / 100, // Convert from cents to dollars
      currency: paymentIntent.currency
    });
  } catch (error) {
    // Handle any Stripe API errors or invalid payment intent IDs
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
