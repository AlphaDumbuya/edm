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
    time: '',
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-xl mb-4">
        <Button
          variant="outline"
          className="mb-2 bg-gray-700 text-white hover:bg-gray-600"
          onClick={() => router.push('/admin/donations')}
        >
          ← Back to Donations
        </Button>
      </div>
      <Card className="w-full max-w-xl shadow-lg bg-gray-800 border border-gray-700 text-gray-100">
        <CardHeader>
          <CardTitle className="text-gray-100">Admin: Create Donation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="donorName" className="text-gray-200">Donor Name</Label>
                <Input
                  id="donorName"
                  placeholder="John Doe"
                  value={formData.donorName}
                  onChange={handleChange}
                  className={`bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 ${errors.donorName ? 'border-red-500' : ''}`}
                />
                {errors.donorName && <p className="text-red-500 text-xs mt-1">{errors.donorName}</p>}
              </div>
              <div>
                <Label htmlFor="donorEmail" className="text-gray-200">Donor Email</Label>
                <Input
                  id="donorEmail"
                  placeholder="john@example.com"
                  value={formData.donorEmail}
                  onChange={handleChange}
                  className={`bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 ${errors.donorEmail ? 'border-red-500' : ''}`}
                />
                {errors.donorEmail && <p className="text-red-500 text-xs mt-1">{errors.donorEmail}</p>}
              </div>
              <div>
                <Label htmlFor="amount" className="text-gray-200">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="100.00"
                  value={formData.amount}
                  onChange={handleChange}
                  className={`bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 ${errors.amount ? 'border-red-500' : ''}`}
                />
                {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
              </div>
              <div>
                <Label htmlFor="currency" className="text-gray-200">Currency</Label>
                <Input
                  id="currency"
                  placeholder="USD"
                  value={formData.currency}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <Label htmlFor="paymentMethod" className="text-gray-200">Payment Method</Label>
                <Input
                  id="paymentMethod"
                  placeholder="Stripe, PayPal, etc."
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={`bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 ${errors.paymentMethod ? 'border-red-500' : ''}`}
                />
                {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
              </div>
              <div>
                <Label htmlFor="campaign" className="text-gray-200">Campaign</Label>
                <Input
                  id="campaign"
                  placeholder="Building Fund"
                  value={formData.campaign}
                  onChange={handleChange}
                  className="bg-gray-900 border-gray-700 text-gray-100 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-gray-200">Date</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="bg-gray-900 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-600 pr-10"
                      style={{ colorScheme: 'dark' }}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="time" className="text-gray-200">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={formData.time || ''}
                    onChange={handleChange}
                    className="bg-gray-900 border-gray-700 text-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-600"
                    style={{ colorScheme: 'dark' }}
                  />
                </div>
              </div>
            </div>
            <Button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold">Create Donation</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}