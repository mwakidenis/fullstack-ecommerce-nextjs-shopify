// import { loadStripe, Stripe } from '@stripe/stripe-js';

// let stripePromise: Promise<Stripe | null>;
// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
//   }
//   return stripePromise;
// };

// export default getStripe;


import Stripe from 'stripe';

export const StripeConnection = new Stripe(process.env.NEXT_PUBLIC_STRIPE_TEST_SECRET_KEY!, {
  apiVersion: '2023-08-16', 
});