"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import TipTapEditor from "@/components/TipTapEditor";
import { UploadButton } from "@/components/shared/UploadButton";
import { createEventAction } from "../actions";

export default function CreateEventPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    isVirtual: false,
    onlineLink: "",
  });
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === "boolean") {
          fd.append(k, v ? "true" : "false");
        } else {
          fd.append(k, v);
        }
      });
      if (imageUrl) fd.append("imageUrl", imageUrl);
      if (session?.user?.id) {
        fd.append("userId", session.user.id);
      }
      await createEventAction(fd);
      router.push("/admin/events");
    } catch (err) {
      setError("Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 bg-gray-900 text-gray-100 rounded-2xl shadow-2xl border border-gray-700 mt-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-400 hover:text-blue-600 font-semibold mb-6 transition-colors"
        aria-label="Back to Events"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
        <span className="text-base">Back</span>
      </button>
      <h1 className="text-3xl font-extrabold mb-6 text-center">Create Event</h1>
      <form onSubmit={handleCreate} className="space-y-6">
        {session?.user?.id && <input type="hidden" name="userId" value={session.user.id} />}
        <div className="flex flex-col gap-2">
          <label htmlFor="title" className="text-base font-semibold text-gray-300">
            Event Title <span className="text-red-500">*</span>
          </label>
          <Input id="title" name="title" placeholder="Enter event title" value={form.title} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400 text-base px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-blue-600" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="description" className="text-base font-semibold text-gray-300">Description</label>
          <div className="max-h-[30vh] overflow-y-auto rounded-lg border border-gray-700 bg-gray-800">
            <TipTapEditor value={form.description} onContentChange={desc => setForm(f => ({ ...f, description: desc }))} />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="date" className="text-base font-semibold text-gray-300">Date</label>
            <Input id="date" name="date" type="date" value={form.date} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700 text-base px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-blue-600 input-white-icons" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="time" className="text-base font-semibold text-gray-300">Time</label>
            <Input id="time" name="time" type="time" value={form.time} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700 text-base px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-blue-600 input-white-icons" />
          </div>
        </div>
        {!form.isVirtual && (
          <div className="flex flex-col gap-2">
            <label htmlFor="location" className="text-base font-semibold text-gray-300">Location</label>
            <Input id="location" name="location" placeholder="Location" value={form.location} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400 text-base px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-blue-600" />
          </div>
        )}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            id="isVirtual"
            name="isVirtual"
            checked={form.isVirtual}
            onChange={e => setForm(f => ({ ...f, isVirtual: e.target.checked, onlineLink: e.target.checked ? f.onlineLink : "" }))}
            className="h-4 w-4 border-gray-700 bg-gray-800 rounded"
          />
          <label htmlFor="isVirtual" className="text-base font-semibold text-gray-100">Virtual Event (Online)</label>
        </div>
        {form.isVirtual && (
          <div className="flex flex-col gap-2">
            <label htmlFor="onlineLink" className="text-base font-semibold text-gray-300">Online Meeting/Join Link</label>
            <Input id="onlineLink" name="onlineLink" placeholder="e.g. Zoom, Google Meet" value={form.onlineLink} onChange={handleFormChange} required={form.isVirtual} className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400 text-base px-4 py-2 rounded-lg shadow focus:ring-2 focus:ring-blue-600" />
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-base font-semibold text-gray-300">Event Image</label>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-2 flex flex-col items-center">
            <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
          </div>
        </div>
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <div className="flex flex-row gap-4 justify-end mt-6">
          <Button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 text-base font-semibold" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </Button>
        </div>
      </form>
    </div>
  );
}