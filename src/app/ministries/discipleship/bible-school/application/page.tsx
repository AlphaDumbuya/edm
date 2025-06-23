"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import PageHeader from "@/components/shared/page-header";
import SectionTitle from "@/components/shared/section-title";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FileText, Mail, MapPin } from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  denomination: string;
  dateOfBirth: string;
  educationHistory: string;
  churchName: string;
  churchAddress: string;
  pastorName: string;
  previousMinistryExperience: string;
  desiredProgram: string;
  personalTestimony: string;
  reference1Name: string;
  reference1Contact: string;
  reference2Name: string;
  reference2Contact: string;
}

export default function OnlineApplicationPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    gender: "",
    maritalStatus: "",
    nationality: "",
    denomination: "",
    dateOfBirth: "",
    educationHistory: "",
    churchName: "",
    churchAddress: "",
    pastorName: "",
    previousMinistryExperience: "",
    desiredProgram: "",
    personalTestimony: "",
    reference1Name: "",
    reference1Contact: "",
    reference2Name: "",
    reference2Contact: "",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [passportPhoto, setPassportPhoto] = useState<File | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSelectChange = (name: keyof FormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim() && key !== "churchAddress" && key !== "previousMinistryExperience") {
        newErrors[key as keyof FormData] = `${key.replace(
          /([A-Z])/g,
          " $1"
        )} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 1000));
      setSubmissionStatus("Application submitted successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        maritalStatus: "",
        nationality: "",
        denomination: "",
        dateOfBirth: "",
        educationHistory: "",
        churchName: "",
        churchAddress: "",
        pastorName: "",
        previousMinistryExperience: "",
        desiredProgram: "",
        personalTestimony: "",
        reference1Name: "",
        reference1Contact: "",
        reference2Name: "",
        reference2Contact: "",
      });
      setPassportPhoto(null);
    } catch {
      setSubmissionStatus("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPassportPhoto(file);
  };

  const formFields = [
    { id: "fullName", label: "Full Name", type: "text" },
    { id: "email", label: "Email", type: "email" },
    { id: "phone", label: "Phone Number", type: "tel" },
    { id: "address", label: "Address", type: "text" },
    { id: "dateOfBirth", label: "Date of Birth", type: "date" },
    { id: "nationality", label: "Nationality", type: "text" },
    { id: "denomination", label: "Denomination", type: "text" },
    { id: "churchName", label: "Church Name", type: "text" },
    { id: "churchAddress", label: "Church Address", type: "text" },
    { id: "pastorName", label: "Pastor Name", type: "text" },
    { id: "reference1Name", label: "Reference 1 Name", type: "text" },
    { id: "reference1Contact", label: "Reference 1 Contact", type: "text" },
    { id: "reference2Name", label: "Reference 2 Name", type: "text" },
    { id: "reference2Contact", label: "Reference 2 Contact", type: "text" },
  ];

  return (
    <div className="container max-w-6xl mx-auto py-12 px-4">
      <PageHeader
        title="Online Application"
        subtitle="Apply to the ReGom/EDM Bible Institute"
        icon={FileText}
      />
      <SectionTitle
        title="Application Form"
        subtitle="Please fill out the form below carefully."
      />

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Application Form</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map(({ id, label, type }) => (
              <div className="space-y-2" key={id}>
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  name={id}
                  type={type}
                  value={(formData as any)[id]}
                  onChange={handleChange}
                  required
                />
                {errors[id as keyof FormData] && (
                  <p className="text-sm text-red-500">{errors[id as keyof FormData]}</p>
                )}
              </div>
            ))}

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select onValueChange={handleSelectChange("gender")} value={formData.gender}>
                <SelectTrigger id="gender">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.gender && <p className="text-sm text-red-500">{errors.gender}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select onValueChange={handleSelectChange("maritalStatus")} value={formData.maritalStatus}>
                <SelectTrigger id="maritalStatus">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
              {errors.maritalStatus && <p className="text-sm text-red-500">{errors.maritalStatus}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="educationHistory">Education History</Label>
              <Textarea
                id="educationHistory"
                name="educationHistory"
                value={formData.educationHistory}
                onChange={handleChange}
                rows={4}
              />
              {errors.educationHistory && <p className="text-sm text-red-500">{errors.educationHistory}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="previousMinistryExperience">Previous Ministry Experience</Label>
              <Textarea
                id="previousMinistryExperience"
                name="previousMinistryExperience"
                value={formData.previousMinistryExperience}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="desiredProgram">Desired Program</Label>
              <Select onValueChange={handleSelectChange("desiredProgram")} value={formData.desiredProgram}>
                <SelectTrigger id="desiredProgram">
                  <SelectValue placeholder="Select Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diploma">Diploma in Theology</SelectItem>
                  <SelectItem value="certificate">Certificate in Ministry</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.desiredProgram && <p className="text-sm text-red-500">{errors.desiredProgram}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="personalTestimony">Personal Testimony</Label>
              <Textarea
                id="personalTestimony"
                name="personalTestimony"
                value={formData.personalTestimony}
                onChange={handleChange}
                rows={6}
              />
              {errors.personalTestimony && <p className="text-sm text-red-500">{errors.personalTestimony}</p>}
            </div>

            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="passportPhoto">Upload Passport Photo</Label>
              <Input
                id="passportPhoto"
                name="passportPhoto"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
              />
              {passportPhoto && <p className="text-sm text-muted-foreground">File selected: {passportPhoto.name}</p>}
            </div>

            <div className="md:col-span-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
              {submissionStatus && (
                <p
                  className={`text-center text-sm mt-4 ${
                    submissionStatus.includes("successfully")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {submissionStatus}
                </p>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <SectionTitle subtitle="If you prefer to submit a hard copy application." title="" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-10">
        {[
          {
            title: "Makeni Campus Submission",
            icon: MapPin,
            address: "123 Main Street, Makeni, Sierra Leone",
          },
          {
            title: "Freetown Campus Submission",
            icon: MapPin,
            address: "456 Ocean Drive, Freetown, Sierra Leone",
          },
          {
            title: "Email Submission",
            icon: Mail,
            address: "admissions@regomedm.org",
          },
        ].map((loc, i) => (
          <Card key={i} className="shadow-lg">
            <CardHeader>
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit mb-3">
                <loc.icon className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-center">{loc.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground text-center">
              <p className="font-semibold">{loc.address}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <SectionTitle subtitle="Get a fillable PDF version." title="" />
      <div className="text-center mt-8">
        <a href="/path/to/your/application-form.pdf" download>
          <Button size="lg">
            <FileText className="mr-2" /> Download PDF Form
          </Button>
        </a>
      </div>
    </div>
  );
}
