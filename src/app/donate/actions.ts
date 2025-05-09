// src/app/donate/actions.ts
'use server';

import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

const CreatePaymentIntentInputSchema = z.object({
  amount: z.number().min(100, { message: 'Amount must be at least $1.00' }), // Amount in cents
  currency: z.string().default('usd'),
  donorName: z.string().optional(),
  donorEmail: z.string().email().optional(),
});

export type CreatePaymentIntentInput = z.infer<typeof CreatePaymentIntentInputSchema>;

export async function createPaymentIntent(input: CreatePaymentIntentInput): Promise<{ clientSecret: string | null; error: string | null }> {
  const validation = CreatePaymentIntentInputSchema.safeParse(input);
  if (!validation.success) {
    return { clientSecret: null, error: validation.error.errors.map(e => e.message).join(', ') };
  }

  const { amount, currency, donorName, donorEmail } = validation.data;

  try {
    const paymentIntentParams: Stripe.PaymentIntentCreateParams = {
      amount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {},
    };

    if (donorName) {
      paymentIntentParams.metadata!.donorName = donorName;
    }
    if (donorEmail) {
      paymentIntentParams.receipt_email = donorEmail; // Stripe can send email receipts
      paymentIntentParams.metadata!.donorEmail = donorEmail;
    }
    

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentParams);
    return { clientSecret: paymentIntent.client_secret, error: null };
  } catch (error: any) {
    console.error('Error creating PaymentIntent:', error);
    return { clientSecret: null, error: error.message || 'Failed to create payment intent.' };
  }
}
