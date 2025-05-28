// EventsPage.tsx (or .jsx depending on your setup)

'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteEventAction, getPaginatedEventsAction } from "./actions";
import { type Event } from "@prisma/client";

// Utility function for checking role
function hasRole(role: string, allowedRoles: string[]) {
  return allowedRoles.includes(role);
}

// Client Component
function EventsClientPage({ events }: { events: Event[] }) {
  const { data: session } = useSession();
  const userRole = session?.user?.role;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Location</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>{event.title}</TableCell>
            <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
            <TableCell>{event.time}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell className="text-right">
              {userRole && hasRole(userRole, ['SUPER_ADMIN', 'ADMIN', 'EDITOR']) && (
                <>
                  <button className="text-blue-600 hover:underline mr-2">Edit</button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="text-red-600 hover:underline">Delete</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete the
                          event and remove its data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={async () => {
                            await deleteEventAction(event.id);
                            window.location.reload();
                          }}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function EventsPageWrapper() {
  const searchParams = useSearchParams();
  // Ensure search is always a string, defaulting to empty if null or undefined
  const searchParam = searchParams.get('search');
  const search = searchParam === null || searchParam === undefined
    ? ''
    : searchParam;

  const page = parseInt(searchParams.get('page') || '1');

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getPaginatedEventsAction(page, search);
      setEvents(data.events || []); // Ensure events is always an array
      // You might want to set totalEvents here too if you need it in the wrapper
      setLoading(false);
    };
    fetchEvents();
  }, [search, page]);

  if (loading) return <div>Loading...</div>;
  return <EventsClientPage events={events} />;
}
