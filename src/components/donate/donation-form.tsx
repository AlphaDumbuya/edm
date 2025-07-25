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
  
  const handlePayPalRedirect = () => {
    window.open('https://www.paypal.com/donate/?hosted_button_id=3P7G7PYAUF96N', '_blank');
  };
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
      <p className="text-xs text-muted-foreground text-center flex items-center justify-center mb-6">
        <Lock className="h-3 w-3 mr-1" /> Secure payment powered by Stripe.
      </p>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <span className="relative px-3 text-sm text-muted-foreground bg-background">
          Or donate with
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={handlePayPalRedirect}
        className="w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 mt-6 bg-[#0070ba] hover:bg-[#005ea6] text-white border-0"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.067 8.478c.492.315.844.827.983 1.481.157.736.132 1.404-.161 2.041-.294.637-.796 1.154-1.485 1.551-.764.44-1.713.656-2.847.656h-2.72l-.641 3.997h-2.084l.641-3.997H9.014l-.641 3.997H6.289l1.923-12h7.759c1.163 0 2.009.227 2.535.682.526.455.79 1.068.79 1.839 0 .819-.265 1.539-.795 2.159-.53.62-1.256 1.029-2.179 1.224.857.032 1.523.226 1.996.583zm-6.562-3.997h-2.359l-.682 4.258h2.359c.935 0 1.661-.174 2.179-.521.518-.347.777-.832.777-1.454 0-.566-.185-1.004-.554-1.314-.37-.31-.917-.466-1.642-.466l.002-.503z"/>
        </svg>
        <span className="text-base sm:text-lg font-semibold">Donate with PayPal</span>
      </Button>
    </form>
  );
}

