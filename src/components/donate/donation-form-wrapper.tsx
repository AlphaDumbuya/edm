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
      const { clientSecret: newClientSecret, error } = await createPaymentIntent({ amount });
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

  const handleSuccessfulPayment = () => {
    setPaymentSuccessful(true);
    setClientSecret(null); // Invalidate client secret after successful payment
    // Optionally reset currentAmount or customAmount here
    // setCurrentAmount(5000); // Reset to default for a new donation
    // setCustomAmount('');
  };
  
  const handlePaymentError = (errorMessage: string) => {
    // If payment fails, we might want to fetch a new client secret
    // if the existing one is no longer usable.
    // For now, just log error. User might need to re-enter amount or refresh.
    console.error("Payment error reported:", errorMessage);
    // Potentially fetch a new client secret if the error indicates it's necessary
    // fetchClientSecret(currentAmount);
  };

  if (!stripePromise) {
    return <p className="text-destructive text-center p-4">Stripe is not configured. Please set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.</p>;
  }

  if (paymentSuccessful) {
    return (
      <div className="text-center p-8 bg-green-50 border border-green-200 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold text-green-700 mb-3">Thank You for Your Donation!</h3>
        <p className="text-green-600 mb-6">Your generosity is greatly appreciated and will make a significant impact.</p>
        <Button onClick={() => {
            setPaymentSuccessful(false);
            setCurrentAmount(5000); // Reset to a default amount
            setCustomAmount('');
            // fetchClientSecret(5000); // Fetch new client secret for default amount
        }}>Make Another Donation</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-lg font-semibold text-foreground mb-3 block">Choose Donation Amount</Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {predefinedAmounts.map((amount) => (
            <Button
              key={amount}
              variant={currentAmount === amount && !customAmount ? 'default' : 'outline'}
              onClick={() => handleAmountButtonClick(amount)}
              className="py-3 text-base"
            >
              ${(amount / 100).toFixed(2)}
            </Button>
          ))}
        </div>
        <div className="relative">
          <Label htmlFor="custom-amount" className="sr-only">Custom Amount</Label>
           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            id="custom-amount"
            type="number"
            step="0.01"
            min="1.00"
            value={customAmount}
            onChange={handleCustomAmountChange}
            onBlur={handleCustomAmountBlur}
            placeholder="Or enter custom amount"
            className="pl-7 py-3 text-base w-full"
          />
        </div>
      </div>

      {isLoadingClientSecret && (
        <div className="flex items-center justify-center p-6 text-muted-foreground">
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
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
         <p className="text-destructive text-center p-4">
            {currentAmount < 100 ? "Minimum donation is $1.00. Please select or enter a valid amount." : "Could not initialize payment. Please try again or select an amount."}
        </p>
       )}
    </div>
  );
}
