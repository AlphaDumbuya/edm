"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Event } from "@prisma/client";
import { deleteEventAction, getPaginatedEventsAction } from "./actions";
import { hasRole } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

const itemsPerPage = 10; // Define how many items per page
const initialEvents: Event[] = []; // Temporary placeholder for demo

export default function EventsClientPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [totalEvents, setTotalEvents] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEventAction(id);
        setEvents(events.filter(event => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const fetchEvents = async (page: number, query: string) => {
    setLoading(true);
    // Simulate data fetching
    const filtered = initialEvents.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    );
    const fetchedEvents = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
    setEvents(fetchedEvents);
    setTotalEvents(filtered.length);
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

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Events</h1>
      {session && <p>Logged in as {session.user?.name}</p>}

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      {loading && <p>Loading events...</p>}
      {!loading && events.length === 0 && <p>No events found.</p>}

      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{new Date(event.date).toDateString()} at {event.time}</p>
            <p>{event.location}</p>
            <div dangerouslySetInnerHTML={{ __html: event.description }} />
            <button
              onClick={() => handleDelete(event.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
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
