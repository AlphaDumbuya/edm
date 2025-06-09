"use client";
'use client'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { z } from 'zod';
import { useRouter } from 'next/navigation';


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
      const response = await fetch('/admin/donations/api', {
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
    <form onSubmit={handleSubmit}>
      <h1 className="text-2xl font-semibold mb-4">Donation Tracking</h1>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="donorName" className="text-right">
            Donor Name
          </Label>
          <Input
            id="donorName"
            placeholder="John Doe"
            className="col-span-3"
            value={formData.donorName}
            onChange={(e) => console.log("Donor Name input changed:", e.target.value)} // Add this console.log
 />
          {errors.donorName && <p className="text-red-500 text-sm">{errors.donorName}</p>}
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
           <Label htmlFor="donorEmail" className="text-right">
            Donor Email
          </Label>
          <Input
            id="donorEmail"
            placeholder="john@example.com"
            className="col-span-3"
            value={formData.donorEmail}
            onChange={handleChange}
 />
          {errors.donorEmail && <p className="text-red-500 text-sm">{errors.donorEmail}</p>}
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            placeholder="100.00"
            className="col-span-3"
            value={formData.amount}
            onChange={handleChange}
 />
          {errors.amount && <p className="text-red-500 text-sm">{errors.amount}</p>}
  </div>

         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="currency" className="text-right">
 Currency
 </Label>_
          <Input
            id="currency"
            placeholder="USD"
            className="col-span-3"
            value={formData.currency}
            onChange={handleChange}
          />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="paymentMethod" className="text-right">
            Payment Method
          </Label>
          <Input
            id="paymentMethod"
            placeholder="Stripe"
            className="col-span-3"
            value={formData.paymentMethod}
            onChange={handleChange}
          />
        </div>_
        {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="campaign" className="text-right">
            Campaign
          </Label>
          <Input
            id="campaign"
            placeholder="Building Fund"
            className="col-span-3"
            value={formData.campaign}
            onChange={handleChange}
 />
        </div>
         <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="date" className="text-right">
            Date
          </Label>
          <Input
            id="date"
            type="date"
            className="col-span-3"
            value={formData.date}
            onChange={handleChange}
 />
        </div>
        {/* Add other fields as needed */}
      </div>

      <Button className="mt-4">Create Donation</Button>
    </form>
  );
}