// src/components/donate/donation-form.tsx
'use client';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, CreditCard } from 'lucide-react';
import type Stripe from 'stripe';
import type { StripeCardElement, StripeElements, StripeCardElementChangeEvent } from '@stripe/stripe-js';

interface DonationFormProps {
  clientSecret: string;
  donationAmount: number; // in cents
  onSuccessfulPayment: (name: string, email: string) => void;
  onPaymentError: (errorMessage: string) => void;
}

const cardElementOptions = {
  style: {
    base: {
      color: 'hsl(var(--foreground))', 
      fontFamily: 'inherit', 
      fontSmoothing: 'antialiased',
      fontSize: '16px', // Base size, Tailwind will scale it
      '::placeholder': {
        color: 'hsl(var(--muted-foreground))',
      },
      iconColor: 'hsl(var(--primary))', 
    },
    invalid: {
      color: 'hsl(var(--destructive))',
      iconColor: 'hsl(var(--destructive))',
    },
  },
  classes: {
    base: 'text-sm sm:text-base', // Apply Tailwind responsive font sizes
  },
  hidePostalCode: true, 
};

export default function DonationForm({ clientSecret, donationAmount, onSuccessfulPayment, onPaymentError }: DonationFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();

  const [isProcessing, setIsProcessing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements) {
      setError('Stripe.js has not loaded yet. Please try again in a moment.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      setError('Card details component not found.');
      setIsProcessing(false);
      return;
    }

    const paymentMethodOptions: any = {
      card: cardElement,
      billing_details: {},
    };

    if (name.trim()) {
      paymentMethodOptions.billing_details!.name = name.trim();
    }
    if (email.trim()) {
      paymentMethodOptions.billing_details!.email = email.trim();
    }

    const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: paymentMethodOptions,
      receipt_email: email.trim() || undefined, 
    });

    setIsProcessing(false);

    if (paymentError) {
      const displayError = paymentError.message || 'An unknown payment error occurred.';
      setError(displayError);
      onPaymentError(displayError);
      toast({
        title: 'Payment Failed',
        description: displayError,
        variant: 'destructive',
      });
    } else if (paymentIntent?.status === 'succeeded') {
      toast({
        title: 'Payment Successful!',
        description: `Thank you for your generous donation of $${(donationAmount / 100).toFixed(2)}.`,
      });
      onSuccessfulPayment(name, email);
      setName('');
      setEmail('');
      cardElement.clear();
    } else {
      const displayError = 'Payment did not succeed. Please try again.';
      setError(displayError);
      onPaymentError(displayError);
       toast({
        title: 'Payment Not Completed',
        description: displayError,
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 p-4 sm:p-6 border rounded-lg shadow-md bg-card">
      <div>
        <Label htmlFor="name" className="text-sm sm:text-base">Full Name (Optional)</Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jane Doe"
          className="mt-1 text-sm sm:text-base"
          disabled={isProcessing}
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-sm sm:text-base">Email Address (Optional, for receipt)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="jane.doe@example.com"
          className="mt-1 text-sm sm:text-base"
          disabled={isProcessing}
        />
      </div>
      <div>
        <Label htmlFor="card-element" className="text-sm sm:text-base">Card Details</Label>
        <div id="card-element" className="mt-1 p-2.5 sm:p-3 border rounded-md bg-background">
          <CardElement options={cardElementOptions} />
        </div>
      </div>
      
      {error && <p className="text-xs sm:text-sm text-destructive">{error}</p>}

      <Button type="submit" disabled={!stripe || isProcessing} className="w-full text-base sm:text-lg py-2.5 sm:py-3">
        {isProcessing ? (
          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
        ) : (
          <CreditCard className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        )}
        {isProcessing ? 'Processing...' : `Donate $${(donationAmount / 100).toFixed(2)}`}
      </Button>
      <p className="text-xs text-muted-foreground text-center flex items-center justify-center">
        <Lock className="h-3 w-3 mr-1" /> Secure payment powered by Stripe.
      </p>
    </form>
  );
}

