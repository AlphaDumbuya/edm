"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
// Define the Event type locally to match your event structure
type Event = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
};
import { deleteEventAction, getPaginatedEventsAction, createEventAction, updateEventAction } from "./actions";
import { hasRole } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TipTapEditor from "@/components/TipTapEditor";
import ImagePreview from "@/components/events/ImagePreview";
import UploadThingImage from "@/components/events/UploadThingImage";

const itemsPerPage = 10; // Define how many items per page
const initialEvents: Event[] = []; // Temporary placeholder for demo

export default function EventsClientPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '' });
  const [imageUrl, setImageUrl] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEventAction(id);
        setEvents(events.filter(event => event.id !== id));
        toast({ title: "Event deleted", description: "The event was successfully deleted." });
      } catch (error) {
        setError("Error deleting event.");
        toast({ title: "Delete failed", description: "Could not delete event.", variant: "destructive" });
      }
    }
  };

  const fetchEvents = async (page: number, query: string) => {
    setLoading(true);
    try {
      const result = await getPaginatedEventsAction(page, query);
      // Convert date and imageUrl to string for frontend Event type
      const events = result.events.map((event: any) => ({
        ...event,
        date: typeof event.date === "string" ? event.date : new Date(event.date).toISOString(),
        imageUrl: event.imageUrl ?? "",
      }));
      setEvents(events);
      setTotalEvents(result.totalEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("search") || "";
    setCurrentPage(page);
    setSearchQuery(query);
    fetchEvents(page, query);
  }, [searchParams]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", query);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const openCreate = () => {
    setForm({ title: '', description: '', date: '', time: '', location: '' });
    setImageUrl("");
    setShowCreate(true);
  };
  const openEdit = (event: Event) => {
    setEditEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : '',
      time: event.time || '',
      location: event.location || '',
    });
    setImageUrl(event.imageUrl || "");
    setShowEdit(true);
  };
  const closeModals = () => {
    setShowCreate(false);
    setShowEdit(false);
    setEditEvent(null);
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageUrl) fd.append('imageUrl', imageUrl);
      await createEventAction(fd);
      closeModals();
      setImageUrl("");
      toast({ title: "Event created", description: "The event was successfully created." });
      router.refresh();
    } catch (err) {
      setError("Error creating event.");
      toast({ title: "Create failed", description: "Could not create event.", variant: "destructive" });
    }
  };
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editEvent) return;
    setError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageUrl) fd.append('imageUrl', imageUrl);
      await updateEventAction(editEvent.id, fd);
      closeModals();
      setImageUrl("");
      toast({ title: "Event updated", description: "The event was successfully updated." });
      router.refresh();
    } catch (err) {
      setError("Error updating event.");
      toast({ title: "Update failed", description: "Could not update event.", variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Events</h1>
      {session && <p>Logged in as {session.user?.name}</p>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-full max-w-xs"
        />
        <button
          onClick={openCreate}
          className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Create Event
        </button>
      </div>
      {/* Create Event Dialog */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input name="title" placeholder="Title" value={form.title} onChange={handleFormChange} required />
            <TipTapEditor value={form.description} onContentChange={desc => setForm(f => ({ ...f, description: desc }))} />
            <Input name="date" type="date" value={form.date} onChange={handleFormChange} required />
            <Input name="time" type="time" value={form.time} onChange={handleFormChange} required />
            <Input name="location" placeholder="Location" value={form.location} onChange={handleFormChange} required />
            <div>
              <label className="block mb-1 font-medium">Event Image</label>
              <UploadThingImage onUpload={setImageUrl} />
            </div>
            <DialogFooter>
              <button type="button" onClick={closeModals} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {/* Edit Event Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <Input name="title" placeholder="Title" value={form.title} onChange={handleFormChange} required />
            <TipTapEditor value={form.description} onContentChange={desc => setForm(f => ({ ...f, description: desc }))} />
            <Input name="date" type="date" value={form.date} onChange={handleFormChange} required />
            <Input name="time" type="time" value={form.time} onChange={handleFormChange} required />
            <Input name="location" placeholder="Location" value={form.location} onChange={handleFormChange} required />
            <div>
              <label className="block mb-1 font-medium">Event Image</label>
              <UploadThingImage onUpload={setImageUrl} initialUrl={imageUrl} />
            </div>
            <DialogFooter>
              <button type="button" onClick={closeModals} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading && <p>Loading events...</p>}
      {!loading && events.length === 0 && <p>No events found.</p>}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{new Date(event.date).toDateString()} at {event.time}</p>
            <p>{event.location}</p>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openEdit(event)}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span>
          Page {currentPage} of {Math.ceil(totalEvents / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalEvents || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
