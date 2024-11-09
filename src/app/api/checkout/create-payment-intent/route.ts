import { NextRequest, NextResponse } from "next/server";
import { calculateTotalCartAmount } from "@/lib/utils";
/**
 * Initialize Stripe client with secret key
 * Make sure STRIPE_SECRET_KEY is set in environment variables
 */
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * POST - Creates a Stripe Payment Intent for processing payments
 *
 * @param {NextRequest} request - Contains cart data and shipping details
 * @returns {NextResponse} - Returns client secret for Stripe payment processing
 *
 * The function performs the following steps:
 * 1. Extracts cart and shipping details from request
 * 2. Calculates total amount from cart
 * 3. Creates a Stripe payment intent
 * 4. Returns the client secret to initialize payment flow
 */
export async function POST(request: NextRequest) {
  try {
    // Extract cart and shipping details from request body
    const { cart, shippingDetails } = await request.json();

    // Calculate total amount from cart items
    const { total } = calculateTotalCartAmount(cart);

    // Create Stripe Payment Intent
    // Amount needs to be in cents (multiply by 100)
    // Currency is set to Canadian dollars (cad)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(total * 100), // Round to avoid floating point issues
      currency: "cad",
      // Enable automatic payment methods for flexible payment options
      automatic_payment_methods: { enabled: true },
      // Store cart and shipping details in metadata for reference
      metadata: {
        cartId: cart.id,
        ...shippingDetails
      }
    });

    // Return client secret to frontend for payment processing
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    // Return error message with 400 status code for client-side handling
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
