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
  isVirtual?: boolean;
  onlineLink?: string;
};
import { deleteEventAction, getPaginatedEventsAction, createEventAction, updateEventAction } from "./actions";
import { hasRole } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import TipTapEditor from "@/components/TipTapEditor";
import ImagePreview from "@/components/events/ImagePreview";
import UploadThingImage from "@/components/events/UploadThingImage";
import { UploadButton } from "@/components/shared/UploadButton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import RestrictedButton from "@/components/admin/RestrictedButton";

const itemsPerPage = 10; // Define how many items per page
const initialEvents: Event[] = []; // Temporary placeholder for demo

export default function EventsClientPage() {
  // Fetch events helper
  const fetchEvents = async (page: number, query: string) => {
    setLoading(true);
    try {
      // Adjusted to pass two arguments as expected
      const res = await getPaginatedEventsAction(page, query);
      // Map event dates to string if needed
      const mappedEvents = (res.events || []).map((event: any) => ({
        ...event,
        date: typeof event.date === 'string' ? event.date : event.date?.toISOString?.() || '',
      }));
      setEvents(mappedEvents);
      setTotalEvents(res.totalEvents || 0);
    } catch (err) {
      setError('Failed to fetch events.');
    } finally {
      setLoading(false);
    }
  };
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const role = session?.user?.role || "VIEWER";

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', location: '', isVirtual: false, onlineLink: '' });
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

  const handleDelete = (event: Event) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
  };
  const confirmDelete = async () => {
    setLoading(true);
    setError(null);
    if (!eventToDelete || !session?.user?.id) {
      setError('No event selected or user not authenticated.');
      setLoading(false);
      return;
    }
    try {
      await deleteEventAction(eventToDelete.id, session.user.id);
      toast({ title: 'Event deleted!' });
      setDeleteDialogOpen(false);
      setEventToDelete(null);
      await fetchEvents(currentPage, searchQuery);
    } catch (err) {
      setError('Failed to delete event.');
    } finally {
      setLoading(false);
    }
  };

  // ...existing handlers and logic...

  // ...existing handlers and logic...

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams?.toString() || "");
    params.set("search", query);
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  // Remove modal logic; use router to navigate to create page
  const openCreate = () => {
    router.push("/admin/events/create");
  };
  const openEdit = (event: Event) => {
    setEditEvent(event);
    setForm({
      title: event.title,
      description: event.description,
      date: event.date ? new Date(event.date).toISOString().slice(0, 10) : '',
      time: event.time || '',
      location: event.location || '',
      isVirtual: event.isVirtual || false,
      onlineLink: event.onlineLink || '',
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
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === 'boolean') {
          fd.append(k, v ? 'true' : 'false');
        } else {
          fd.append(k, v);
        }
      });
      if (imageUrl) fd.append('imageUrl', imageUrl);
      await createEventAction(fd);
      toast({ title: 'Event created!' });
      closeModals();
      await fetchEvents(1, searchQuery);
      setCurrentPage(1);
    } catch (err) {
      setError('Failed to create event.');
    } finally {
      setLoading(false);
    }
  };

  // Define handleEdit for editing events
  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!editEvent) return;
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (typeof v === 'boolean') {
          fd.append(k, v ? 'true' : 'false');
        } else {
          fd.append(k, v);
        }
      });
      if (imageUrl) fd.append('imageUrl', imageUrl);
      await updateEventAction(editEvent.id, fd, session?.user?.id || "");
      toast({ title: 'Event updated!' });
      closeModals();
      await fetchEvents(currentPage, searchQuery);
    } catch (err) {
      setError('Failed to update event.');
    } finally {
      setLoading(false);
    }
  };
  // Refresh handler
  const handleRefresh = async () => {
    setLoading(true);
    const page = currentPage;
    const query = searchQuery;
    await fetchEvents(page, query);
    setLoading(false);
  };

  // Only one return at the end of the component
  return (
    <div className="container mx-auto py-4 px-2 sm:px-4 min-h-screen bg-[#10172a] text-gray-100 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-6 w-full">
        <h1 className="text-2xl font-semibold text-gray-100 w-full sm:w-auto text-left mb-4 sm:mb-0">Events Management</h1>
        <div className="flex flex-row justify-between gap-2 w-full sm:w-auto sm:justify-end">
          <RestrictedButton
            allowedRoles={["ADMIN", "SUPER_ADMIN", "EDITOR"]}
            userRole={role}
            onClick={openCreate}
            className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 w-auto order-1 sm:order-none"
            title={role === "VIEWER" ? "Viewers cannot create events." : undefined}
          >
            + Create Event
          </RestrictedButton>
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto justify-center order-2 sm:order-none"
            onClick={handleRefresh}
            title="Refresh event list"
            disabled={loading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582M20 20v-5h-.581m-2.638 2.638A7.974 7.974 0 0112 20c-4.418 0-8-3.582-8-8 0-1.657-.507-3.197-1.382-4.462m2.638-2.638A7.974 7.974 0 0112 4c4.418 0 8 3.582 8 8 0 1.657-.507-3.197-1.382 4.462" />
            </svg>
            <span>Refresh</span>
          </button>
        </div>
      </div>
      {session && <p className="text-gray-400 text-sm mb-2">Logged in as {session.user?.name}</p>}
      {error && <div className="mb-4 text-red-400">{error}</div>}
      <div className="mb-4 flex flex-col sm:flex-row gap-2 w-full">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-700 bg-gray-900 text-gray-100 rounded-md w-full placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {/* Create Event Dialog removed: now handled by /admin/events/create page */}
      {/* Edit Event Dialog */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent className="max-h-[90vh] overflow-y-auto bg-gray-900 text-gray-100 border border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-100">Edit Event</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            {session?.user?.id && (
              <input type="hidden" name="userId" value={session.user.id} />
            )}
            <Input name="title" placeholder="Title" value={form.title} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400" />
            <div className="max-h-[40vh] overflow-y-auto">
              <TipTapEditor value={form.description} onContentChange={desc => setForm(f => ({ ...f, description: desc }))} />
            </div>
            <Input name="date" type="date" value={form.date} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700" />
            <Input name="time" type="time" value={form.time} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700" />
            {!form.isVirtual && (
              <Input name="location" placeholder="Location" value={form.location} onChange={handleFormChange} required className="bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400" />
            )}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                id="isVirtual-edit"
                name="isVirtual"
                checked={form.isVirtual}
                onChange={e => setForm(f => ({ ...f, isVirtual: e.target.checked, onlineLink: e.target.checked ? f.onlineLink : '' }))}
                className="h-4 w-4 border-gray-700 bg-gray-800 rounded"
              />
              <label htmlFor="isVirtual-edit" className="text-sm font-medium text-gray-100">Virtual Event (Online)</label>
            </div>
            {form.isVirtual && (
              <Input
                name="onlineLink"
                placeholder="Online Meeting/Join Link (e.g. Zoom, Google Meet)"
                value={form.onlineLink}
                onChange={handleFormChange}
                required={form.isVirtual}
                className="mt-2 bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400"
              />
            )}
            <div>
              <label className="block mb-1 font-medium text-gray-100">Event Image</label>
              <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
            </div>
            <DialogFooter>
              <button type="button" onClick={closeModals} className="px-4 py-2 bg-gray-700 text-gray-100 rounded">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800">Save</button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {loading && <p className="text-gray-400 text-sm">Loading events...</p>}
      {!loading && events.length === 0 && <p className="text-gray-400 text-sm">No events found.</p>}

      {/* Event List Table */}
      <div className="overflow-x-auto w-full mt-6">
        <table className="min-w-full w-full bg-gray-900 border border-gray-700 rounded-md text-gray-100">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-4 py-2 text-left text-xs font-semibold whitespace-nowrap">Title</th>
              <th className="px-4 py-2 text-left text-xs font-semibold whitespace-nowrap">Date</th>
              <th className="px-4 py-2 text-left text-xs font-semibold whitespace-nowrap">Location</th>
              <th className="px-4 py-2 text-left text-xs font-semibold whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-gray-700 hover:bg-gray-800 transition">
                <td className="px-4 py-2 font-medium text-gray-100 whitespace-nowrap">{event.title}</td>
                <td className="px-4 py-2 text-gray-300 whitespace-nowrap">{new Date(event.date).toLocaleDateString()} {event.time}</td>
                <td className="px-4 py-2 text-gray-300 whitespace-nowrap">{event.location}</td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <RestrictedButton
                      allowedRoles={["ADMIN", "SUPER_ADMIN", "EDITOR"]}
                      userRole={role}
                      onClick={() => openEdit(event)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 w-full sm:w-auto"
                      title={role === "VIEWER" ? "Viewers cannot edit events." : undefined}
                    >
                      Edit
                    </RestrictedButton>
                    <RestrictedButton
                      allowedRoles={["ADMIN", "SUPER_ADMIN"]}
                      userRole={role}
                      onClick={() => handleDelete(event)}
                      className="px-3 py-1 bg-red-700 text-white rounded hover:bg-red-800 w-full sm:w-auto"
                      title={role === "VIEWER" ? "Viewers cannot delete events." : undefined}
                    >
                      Delete
                    </RestrictedButton>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">Are you sure you want to delete this event?</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="mb-4 text-gray-300">This action cannot be undone.</div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteDialogOpen(false)} className="bg-gray-700 text-gray-100 rounded">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} disabled={loading} className="bg-red-700 text-white hover:bg-red-800 rounded">
              {loading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1 || loading}
          className="px-4 py-2 bg-gray-800 text-gray-100 rounded disabled:opacity-50 border border-gray-700"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {Math.ceil(totalEvents / itemsPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalEvents || loading}
          className="px-4 py-2 bg-gray-800 text-gray-100 rounded disabled:opacity-50 border border-gray-700"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
