// src/components/donate/donation-form-wrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type Stripe as StripeType } from '@stripe/stripe-js';
import DonationForm from './donation-form';
import { createPaymentIntent } from '@/app/donate/actions';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlert } from 'lucide-react';
import { ComponentInstanceIcon } from '@radix-ui/react-icons';

// Ensure your Stripe publishable key is set in .env as NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : null;

const predefinedAmounts = [2500, 5000, 10000, 25000]; // in cents

export default function DonationFormWrapper() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [currentAmount, setCurrentAmount] = useState<number>(5000); // Default to $50 in cents
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isLoadingClientSecret, setIsLoadingClientSecret] = useState<boolean>(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    if (currentAmount > 0 && !paymentSuccessful) {
      fetchClientSecret(currentAmount);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAmount, paymentSuccessful]);

  const fetchClientSecret = async (amount: number) => {
    if (amount < 100) { // Minimum $1.00
        toast({ title: "Invalid Amount", description: "Minimum donation is $1.00.", variant: "destructive"});
        setClientSecret(null);
        return;
    }
    setIsLoadingClientSecret(true);
    try {
      const { clientSecret: newClientSecret, error } = await createPaymentIntent({ amount, currency: 'usd' });
      if (error) {
        toast({ title: 'Error', description: error, variant: 'destructive' });
        setClientSecret(null);
      } else {
        setClientSecret(newClientSecret);
      }
    } catch (e: any) {
      toast({ title: 'Error', description: e.message || 'Failed to initialize payment.', variant: 'destructive' });
      setClientSecret(null);
    } finally {
      setIsLoadingClientSecret(false);
    }
  };

  const handleAmountButtonClick = (amount: number) => {
    setCurrentAmount(amount);
    setCustomAmount(''); // Clear custom amount if a button is clicked
    setPaymentSuccessful(false); // Allow re-fetching client secret for new amount
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomAmount(value);
    const amountInCents = Math.round(parseFloat(value) * 100);
    if (!isNaN(amountInCents) && amountInCents > 0) {
      setCurrentAmount(amountInCents);
       setPaymentSuccessful(false);
    } else if (value === '') {
        // If input is cleared, perhaps revert to a default or do nothing specific for currentAmount
        // For now, let's keep currentAmount as is, fetchClientSecret will validate
    }
  };
  
  const handleCustomAmountBlur = () => {
    const amountInCents = Math.round(parseFloat(customAmount) * 100);
    if (!isNaN(amountInCents) && amountInCents >= 100) {
      setCurrentAmount(amountInCents);
      setPaymentSuccessful(false); 
    } else if (customAmount !== '' && (isNaN(amountInCents) || amountInCents < 100)) {
        toast({ title: "Invalid Amount", description: "Minimum donation is $1.00. Please enter a valid amount.", variant: "destructive"});
        // Optionally clear customAmount or currentAmount here if invalid on blur
    }
  };

  const handleSuccessfulPayment = async (donorName?: string, donorEmail?: string) => {
    setPaymentSuccessful(true);
    setClientSecret(null); // Invalidate client secret after successful payment
    // Save donation record to backend
    try {
      await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: (currentAmount / 100).toFixed(2),
          donorName: donorName || undefined,
          donorEmail: donorEmail || undefined,
          paymentMethod: 'stripe',
        }),
      });
    } catch (err) {
      // Optionally show a toast or log error
      console.error('Failed to save donation record:', err);
    }
  };
  
  const handlePaymentError = (errorMessage: string) => {
    console.error("Payment error reported:", errorMessage);
  };

  if (!stripePromise) {
    return (
      <Alert variant="destructive">
        <ComponentInstanceIcon className="h-4 w-4 mr-2" />
        <AlertTitle>Stripe Configuration Error</AlertTitle>
        <AlertDescription>Stripe is not configured. Please set the <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> environment variable to enable donations.</AlertDescription>
      </Alert>
    );  }

  if (paymentSuccessful) {
    return (
      <div className="text-center p-6 sm:p-8 bg-green-50 border border-green-200 rounded-lg shadow-md">
        <h3 className="text-xl sm:text-2xl font-semibold text-green-700 mb-2 sm:mb-3">Thank You for Your Donation!</h3>
        <p className="text-green-600 mb-4 sm:mb-6 text-sm sm:text-base">Your generosity is greatly appreciated and will make a significant impact.</p>
        <Button 
          onClick={() => {
            setPaymentSuccessful(false);
            setCurrentAmount(5000); // Reset to a default amount
            setCustomAmount('');
          }}
          size="sm"
          className="text-xs sm:text-sm"
        >
          Make Another Donation
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 max-h-[80vh] overflow-y-auto">
      <div>
        <Label className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-3 block">Choose Donation Amount</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3 sm:mb-4">
          {predefinedAmounts.map((amount) => (
            <Button
              key={amount}
              variant={currentAmount === amount && !customAmount ? 'default' : 'outline'}
              onClick={() => handleAmountButtonClick(amount)}
              className="py-2.5 sm:py-3 text-sm sm:text-base"
              size="sm"
            >
              ${(amount / 100).toFixed(2)}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Label htmlFor="custom-amount" className="sr-only">Custom Amount</Label>
           <span className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm sm:text-base">$</span>
          <Input
            id="custom-amount"
            type="number"
            step="0.01"
            min="1.00"
            value={customAmount}
            onChange={handleCustomAmountChange}
            onBlur={handleCustomAmountBlur}
            placeholder="Or enter custom amount"
            className="pl-6 sm:pl-7 py-2.5 sm:py-3 text-sm sm:text-base w-full"
          />
        </div>
      </div>

      {isLoadingClientSecret && (
        <div className="flex items-center justify-center p-4 sm:p-6 text-muted-foreground text-sm sm:text-base">
          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
          <span>Initializing secure payment...</span>
        </div>
      )}

      {!isLoadingClientSecret && clientSecret && currentAmount >= 100 && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: 'stripe' } }}>
          <DonationForm 
            clientSecret={clientSecret} 
            donationAmount={currentAmount}
            onSuccessfulPayment={handleSuccessfulPayment}
            onPaymentError={handlePaymentError}
          />
        </Elements>
      )}
       {!isLoadingClientSecret && (!clientSecret || currentAmount < 100) && currentAmount > 0 && (
         <p className="text-destructive text-center p-4 text-sm sm:text-base">
            {currentAmount < 100 ? "Minimum donation is $1.00. Please select or enter a valid amount." : "Could not initialize payment. Please try again or select an amount."}
        </p>
       )}
    </div>
  );
}

