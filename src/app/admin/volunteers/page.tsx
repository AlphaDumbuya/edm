"use client";
import { useEffect, useState } from 'react';
import { RotateCw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import RestrictedButton from '@/components/admin/RestrictedButton';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

function VolunteersClient() {
  const { data: session } = useSession();
  const role = session?.user?.role || "VIEWER";
  const [volunteers, setVolunteers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [volunteerToDelete, setVolunteerToDelete] = useState<string | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<any | null>(null);

  useEffect(() => {
    async function fetchVolunteers() {
      setLoading(true);
      try {
        const res = await fetch('/api/volunteer');
        if (!res.ok) throw new Error('Failed to fetch volunteers');
        const data = await res.json();
        setVolunteers(data.volunteers || []);
      } catch (err) {
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    }
    fetchVolunteers();
  }, []);

  const handleDelete = (id: string) => {
    if (!id) return;
    setVolunteerToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!volunteerToDelete) return;
    try {
      const res = await fetch(`/api/volunteer/${volunteerToDelete}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete volunteer');
      setVolunteers(volunteers => volunteers.filter(v => v.id !== volunteerToDelete));
      setIsDeleteDialogOpen(false);
      setVolunteerToDelete(null);
    } catch (err) {
      alert('Failed to delete volunteer.');
    }
  };

  // Refresh volunteers list
  const handleRefresh = () => {
    setLoading(true);
    fetch('/api/volunteer')
      .then(res => res.json())
      .then(data => setVolunteers(data.volunteers || []))
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full max-w-full sm:max-w-2xl lg:max-w-4xl mx-auto p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 gap-2 w-full">
        <h1 className="text-lg sm:text-2xl font-bold w-full sm:w-auto text-left mt-4 mb-2">Volunteer Signups</h1>
        <div className="flex w-full sm:w-auto justify-end">
          <button
            className="flex items-center gap-2 px-2 py-1 sm:px-4 sm:py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto justify-center"
            onClick={handleRefresh}
            title="Refresh volunteer list"
            disabled={loading}
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full">
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto w-full max-w-full mx-auto text-xs sm:text-sm">
            <table className="min-w-full w-full bg-gray-900 text-gray-100 border border-gray-700 rounded shadow text-xs sm:text-sm">
              <thead className="bg-gray-800 text-gray-200">
                <tr>
                  <th className="px-4 py-3 border-b border-gray-700 text-left font-semibold text-sm">Name</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-left font-semibold text-sm">Areas of Interest</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-left font-semibold text-sm">Submitted</th>
                  <th className="px-4 py-3 border-b border-gray-700 text-left font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {volunteers.length === 0 ? (
                  <tr><td colSpan={4} className="text-center py-6 text-gray-400">No volunteer signups yet.</td></tr>
                ) : (
                  volunteers.map((v) => (
                    <tr key={v.id} className="hover:bg-gray-800">
                      <td className="px-4 py-3 border-b border-gray-700 break-all max-w-xs text-sm">{v.name}</td>
                      <td className="px-4 py-3 border-b border-gray-700 break-all max-w-xs text-sm">{Array.isArray(v.areasOfInterest) ? v.areasOfInterest.join(', ') : v.areasOfInterest || '-'}</td>
                      <td className="px-4 py-3 border-b border-gray-700 break-all max-w-xs text-sm">{new Date(v.createdAt).toLocaleString()}</td>
                      <td className="px-4 py-3 border-b border-gray-700 text-sm flex gap-2">
                        <button
                          className="text-sm px-4 py-2 min-w-[80px] w-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                          onClick={() => setSelectedVolunteer(v)}
                        >View</button>
                        <RestrictedButton 
                          allowedRoles={["ADMIN", "SUPER_ADMIN"]} 
                          userRole={role} 
                          onClick={() => handleDelete(v.id)} 
                          title={role === "VIEWER" ? "Viewers cannot delete volunteers." : undefined}
                          className="text-sm px-4 py-2 min-w-[80px] w-auto bg-red-600 text-white rounded hover:bg-red-700 transition"
                        >Delete</RestrictedButton>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      {/* Volunteer Details Modal */}
      {selectedVolunteer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-8 max-w-md w-full text-gray-100 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white text-xl"
              onClick={() => setSelectedVolunteer(null)}
              title="Close"
            >&#10005;</button>
            <h2 className="text-xl font-bold mb-4">Volunteer Details</h2>
            <div className="space-y-2">
              <div><span className="font-semibold text-gray-300">Name:</span> {selectedVolunteer.name}</div>
              <div><span className="font-semibold text-gray-300">Email:</span> {selectedVolunteer.email}</div>
              <div><span className="font-semibold text-gray-300">Phone:</span> {selectedVolunteer.phone || '-'}</div>
              <div><span className="font-semibold text-gray-300">Areas of Interest:</span> {Array.isArray(selectedVolunteer.areasOfInterest) ? selectedVolunteer.areasOfInterest.join(', ') : selectedVolunteer.areasOfInterest || '-'}</div>
              <div><span className="font-semibold text-gray-300">Availability:</span> {selectedVolunteer.availability || '-'}</div>
              <div><span className="font-semibold text-gray-300">Message:</span> {selectedVolunteer.message || '-'}</div>
              <div><span className="font-semibold text-gray-300">Submitted:</span> {new Date(selectedVolunteer.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
          {/* Mobile Card/List Layout */}
          <div className="md:hidden w-full space-y-3">
            {volunteers.length === 0 ? (
              <div className="text-center py-6 text-gray-400">No volunteer signups yet.</div>
            ) : (
              volunteers.map((v) => (
                <div key={v.id} className="bg-gray-900 border border-gray-700 rounded shadow p-3 flex flex-col gap-1 text-xs">
                  <div><span className="font-semibold text-gray-300">Name:</span> {v.name}</div>
                  <div><span className="font-semibold text-gray-300">Areas of Interest:</span> {Array.isArray(v.areasOfInterest) ? v.areasOfInterest.join(', ') : v.areasOfInterest || '-'}</div>
                  <div><span className="font-semibold text-gray-300">Submitted:</span> {new Date(v.createdAt).toLocaleString()}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="text-xs px-3 py-1 min-w-[60px] w-auto bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      onClick={() => setSelectedVolunteer(v)}
                    >View</button>
                    <RestrictedButton 
                      allowedRoles={["ADMIN", "SUPER_ADMIN"]} 
                      userRole={role} 
                      onClick={() => handleDelete(v.id)} 
                      title={role === "VIEWER" ? "Viewers cannot delete volunteers." : undefined}
                      className="xs:text-sm text-xs xs:px-4 xs:py-2 px-2 py-1 xs:min-w-[80px] min-w-[40px] xs:w-auto w-auto bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >Delete</RestrictedButton>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {/* Removed Create Volunteer button for all roles */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-gray-900 text-gray-100 border border-gray-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-gray-100">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              This action cannot be undone. This will permanently delete this volunteer.
            </AlertDialogDescription>
          </AlertDialogHeader>
              <AlertDialogFooter className="mt-4 flex flex-row gap-x-2 justify-center">
                <button onClick={() => setIsDeleteDialogOpen(false)} className="min-w-[64px] max-w-[96px] bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium py-1.5 px-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-gray-500 text-xs">Cancel</button>
                <button onClick={confirmDelete} className="min-w-[64px] max-w-[96px] bg-red-600 hover:bg-red-700 text-white font-medium py-1.5 px-2 rounded shadow focus:outline-none focus:ring-2 focus:ring-red-500 text-xs">Delete</button>
              </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default VolunteersClient;
