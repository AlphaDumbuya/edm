"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Event } from "@prisma/client";
import { deleteEventAction, getPaginatedEventsAction } from "./actions"; // Corrected import
import { hasRole } from "@/lib/utils"; // Client-side utility
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons"; // Client-side icons

interface EventsClientPageProps {
  events: Event[];
  itemsPerPage: number;
}

export default function EventsClientPage({ events: initialEvents, itemsPerPage }: EventsClientPageProps) {
  console.log('initialEvents:', initialEvents);
  const { data: session } = useSession();
  // You can add client-side logic here, e.g., for handling deletions or other interactions
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [totalEvents, setTotalEvents] = useState(0); // Initialize totalEvents
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage
  const [searchQuery, setSearchQuery] = useState("");
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEventAction(id);
        // Update the state to reflect the deletion
        setEvents(events.filter(event => event.id !== id));
      } catch (error) {
        console.error("Error deleting event:", error);
        // Optionally, display an error message to the user
      }
    }
  };

  // Client-side data fetching with pagination and search
  const fetchEvents = async (page: number, query: string) => {
    setLoading(true);
    // In a real application, you would call an API route or a server action
    // that handles fetching events with pagination and search parameters.
    // For this example, we'll simulate fetching.
    console.log(`Fetching events for page ${page} with query "${query}"`);
    // Replace with actual fetch logic
    const fetchedEvents = initialEvents.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    ).slice((page - 1) * itemsPerPage, page * itemsPerPage);

    setEvents(fetchedEvents);
    console.log('events state after fetchEvents:', fetchedEvents);
    // Simulate fetching total count
    setTotalEvents(initialEvents.filter(event =>
      event.title.toLowerCase().includes(query.toLowerCase())
    ).length);
    setLoading(false);
  };

  // Effect for handling initial load, pagination, and search changes
  useEffect(() => {
    const page = parseInt(searchParams.get("page") || "1", 10);
    const query = searchParams.get("search") || "";
    setSearchQuery(query);
    fetchEvents(page, query);
    console.log('events state in useEffect:', events);
  }, [searchParams]); // Re-run effect when search params change

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", e.target.value);
    params.set("page", "1"); // Reset to page 1 on search
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-semibold mb-6">Events</h1>

      {/* Example of using session data on the client side */}
      {session && (
        <p>Logged in as {session.user?.name}</p>
      )}

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md w-full"
        />
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading events...</p>}

      {/* Render event list or loading message */}
      {!loading && events.length === 0 && (
        <p>No events found.</p>
      )}

      {/* Render your event list here */}
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="border p-4 rounded-md">
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p>{event.date.toDateString()} at {event.time}</p>
            <p>{event.location}</p>
            {/* Render description - you might need to parse the HTML if you stored it as such */}
            <div dangerouslySetInnerHTML={{ __html: event.description }} />

            {/* Example of a client-side action */}
            <button
              onClick={() => handleDelete(event.id)}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(parseInt(searchParams.get("page") || "1") - 1)}
          disabled={parseInt(searchParams.get("page") || "1") <= 1 || loading}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <span>
          Page {parseInt(searchParams.get("page") || "1")} of {Math.ceil(totalEvents / itemsPerPage)}
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
