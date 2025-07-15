"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function DonationsPage() {
  const router = useRouter();

  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [formData, setFormData] = useState({
    donorName: '',
    donorEmail: '',
    amount: '',
    currency: '',
    paymentMethod: '',
    campaign: '',
    date: '',
  });

  const donationSchema = z.object({
    donorName: z.string().min(1, "Donor name is required"),
    donorEmail: z.string().email("Invalid email address"),
    amount: z.number().positive("Amount must be a positive number"),
    paymentMethod: z.string().min(1, "Payment method is required"),
    campaign: z.string().optional(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input changed:", e.target.id, e.target.value); // Add this line
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Clear previous errors
    setErrors({});

    // Validate formData with Zod schema
    const parsed = donationSchema.safeParse({
      ...formData,
      amount: parseFloat(formData.amount), // Convert amount to number for validation
    });

    if (!parsed.success) {
      // If validation fails, set errors and stop
      const fieldErrors: Record<string, string | undefined> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path.length > 0) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      console.error('Validation errors:', fieldErrors); // Log validation errors
      return; // Stop submission
    }

    try {
      const response = await fetch('/api/admin/donations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({...formData, amount: parseFloat(formData.amount)}), // Convert amount to number
      }); // Use parsed data which includes the converted amount

      if (response.ok) {
        router.push('/admin/donations'); // Redirect to the donations list page
      } else {
        console.error('Failed to create donation:', response.statusText);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error('Error creating donation:', error);
      // Optionally display an error message to the user
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle>Admin: Create Donation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donorName">Donor Name</Label>
                <Input
                  id="donorName"
                  placeholder="John Doe"
                  value={formData.donorName}
                  onChange={handleChange}
                  className={errors.donorName ? 'border-red-500' : ''}
                />
                {errors.donorName && <p className="text-red-500 text-xs mt-1">{errors.donorName}</p>}
              </div>
              <div>
                <Label htmlFor="donorEmail">Donor Email</Label>
                <Input
                  id="donorEmail"
                  placeholder="john@example.com"
                  value={formData.donorEmail}
                  onChange={handleChange}
                  className={errors.donorEmail ? 'border-red-500' : ''}
                />
                {errors.donorEmail && <p className="text-red-500 text-xs mt-1">{errors.donorEmail}</p>}
              </div>
              <div>
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className={errors.amount ? 'border-red-500' : ''}
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>
              <div>
                <Label htmlFor="currency">Currency</Label>
                <Input
                  id="currency"
                  placeholder="USD"
                  value={formData.currency}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Input
                  id="paymentMethod"
                  placeholder="Stripe, PayPal, etc."
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={errors.paymentMethod ? 'border-red-500' : ''}
                />
                {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
              </div>
              <div>
                <Label htmlFor="campaign">Campaign</Label>
                <Input
                  id="campaign"
                  placeholder="Building Fund"
                  value={formData.campaign}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>
            </div>
            <Button className="w-full">Create Donation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}