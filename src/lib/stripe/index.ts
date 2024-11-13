import Stripe from "stripe";

// Initialize Stripe client with test secret key
// IMPORTANT: Ensure to switch to production key in non-dev environments
// WARNING: Secret key should never be exposed to the client side
// TODO: Consider moving this to a server-side environment variable
export const StripeConnection = new Stripe(
  process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY!,
  {
    // Using specific API version to ensure stability
    // Update this periodically to access new features
    // Reference: https://stripe.com/docs/api/versioning
    apiVersion: "2024-10-28.acacia"
  }
);
