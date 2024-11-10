// import sgMail from '@sendgrid/mail';

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// type ReceiptEmailProps = {
//   to: string;
//   amount: number;
//   currency: string;
//   paymentIntentId: string;
// };

// export const sendReceiptEmail = async ({
//   to,
//   amount,
//   currency,
//   paymentIntentId,
// }: ReceiptEmailProps) => {
//   const msg = {
//     to,
//     from: 'no-reply@yourdomain.com', // Verified sender in SendGrid
//     subject: 'Your Payment Receipt',
//     text: `Thank you for your payment of ${currency.toUpperCase()} ${amount.toFixed(2)}. Your payment ID is ${paymentIntentId}.`,
//     html: `
//       <h1>Thank You for Your Payment!</h1>
//       <p>Amount: <strong>${currency.toUpperCase()} ${amount.toFixed(2)}</strong></p>
//       <p>Payment ID: <strong>${paymentIntentId}</strong></p>
//       <p>If you have any questions, please contact us.</p>
//     `,
//   };

//   await sgMail.send(msg);
// };
