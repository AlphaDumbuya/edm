"use client";
import { useEffect, useState } from 'react';
import { RotateCw } from 'lucide-react';
import GalleryAdminForm from './upload-form';
import { Dialog, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import RestrictedButton from '@/components/admin/RestrictedButton';

// Define the MediaItem type
interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  description?: string;
  category?: string;
  imageUrl?: string;
  altText?: string;
  location?: string;
  photographer?: string;
  eventName?: string;
  videoUrl?: string;
  published: boolean;
  date?: string;
}

export default function AdminGalleryPage() {
  const { data: session, status } = useSession();
  const role = session?.user?.role || "VIEWER";

  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Filter state
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/admin/gallery');
      if (!res.ok) throw new Error('Failed to fetch gallery media');
      const data = await res.json();
      setMedia(data as MediaItem[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchMedia(); }, []);

  // Get unique categories and events for dropdowns
  const categories = Array.from(new Set(media.map(m => m.category).filter(Boolean)));
  const events = Array.from(new Set(media.map(m => m.eventName).filter(Boolean)));

  // Filtered media
  const filteredMedia = media.filter(item => {
    if (typeFilter !== 'all' && item.type !== typeFilter) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    if (eventFilter !== 'all' && item.eventName !== eventFilter) return false;
    if (visibilityFilter !== 'all' && ((visibilityFilter === 'visible' && !item.published) || (visibilityFilter === 'hidden' && item.published))) return false;
    return true;
  });

  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredMedia.length / itemsPerPage);
  const paginatedMedia = filteredMedia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 py-4 sm:py-8 flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-2 w-full">
        <h1 className="text-xl sm:text-3xl font-bold w-full sm:w-auto text-left mt-4 mb-2">Gallery Management</h1>
        <div className="flex w-full sm:w-auto justify-end">
          <button
            className="flex items-center gap-1 px-1.5 py-0.5 sm:px-4 sm:py-2 bg-gray-800 text-gray-100 rounded hover:bg-gray-700 border border-gray-700 transition font-medium shadow w-auto justify-center text-[10px] whitespace-nowrap"
            onClick={fetchMedia}
            title="Refresh gallery list"
            disabled={loading}
          >
            <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      {/* Upload Form */}
      <div className="bg-gray-900 text-gray-100 p-3 sm:p-6 rounded-lg shadow-md border border-gray-700">
        <GalleryAdminForm />
      </div>
      {/* Filters and Media */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-4 w-full">
          <div className="grid grid-cols-2 gap-2 w-full sm:flex sm:flex-row sm:gap-4">
            <select className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs sm:text-sm w-full" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
              <option value="all">All Types</option>
              <option value="photo">Photo</option>
              <option value="video">Video</option>
            </select>
            <select className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs sm:text-sm w-full" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs sm:text-sm w-full" value={eventFilter} onChange={e => setEventFilter(e.target.value)}>
              <option value="all">All Events</option>
              {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
            </select>
            <select className="border border-gray-700 bg-gray-900 text-gray-100 rounded px-2 py-1 text-xs sm:text-sm w-full" value={visibilityFilter} onChange={e => setVisibilityFilter(e.target.value)}>
              <option value="all">All Visibility</option>
              <option value="visible">Visible</option>
              <option value="hidden">Hidden</option>
            </select>
          </div>
        </div>
        <div className="w-full">
          {loading ? (
            <div className="text-center text-gray-400">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 w-full">
              {paginatedMedia.length === 0 && <p className="col-span-full text-gray-400 text-center">No media found for selected filters.</p>}
              {paginatedMedia.map(item => (
                <div key={item.id} className="rounded-lg bg-gray-900 text-gray-100 shadow-lg border border-gray-700 hover:shadow-xl transition-shadow flex flex-col overflow-hidden w-full max-w-full sm:max-w-[300px] md:max-w-[300px] mx-auto">
                  {/* Media Preview */}
                  {item.type === 'photo' && item.imageUrl && (
                    <div className="w-full aspect-[4/3] bg-black flex items-center justify-center">
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover rounded-t-lg" />
                    </div>
                  )}
                  {item.type === 'video' && item.videoUrl && (
                    <div className="w-full aspect-[4/3] bg-black flex items-center justify-center group relative">
                      {/* Show YouTube thumbnail by default, play video on hover */}
                      {item.videoUrl.includes('youtube') ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${item.videoUrl.split('v=')[1]?.split('&')[0]}/hqdefault.jpg`}
                            alt={item.title}
                            className="w-full h-full object-cover absolute inset-0 transition-opacity duration-200 group-hover:opacity-0"
                          />
                          <iframe
                            src={`https://www.youtube.com/embed/${item.videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&modestbranding=1`}
                            title={item.title}
                            className="w-full h-full min-h-[200px] sm:min-h-[300px] md:min-h-[350px] absolute inset-0 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-200"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                          />
                        </>
                      ) : (
                        <video
                          src={item.videoUrl}
                          className="w-full h-full object-cover absolute inset-0 transition-opacity duration-200 group-hover:opacity-100 opacity-0"
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          onMouseOver={(e: React.MouseEvent<HTMLVideoElement>) => (e.currentTarget as HTMLVideoElement).play()}
                          onMouseOut={(e: React.MouseEvent<HTMLVideoElement>) => (e.currentTarget as HTMLVideoElement).pause()}
                        />
                      )}
                      {/* Video icon overlay */}
                      <div className="absolute top-2 right-2 bg-black/60 rounded-full p-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white opacity-80">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-7.5A2.25 2.25 0 003.75 5.25v13.5A2.25 2.25 0 006 21h7.5a2.25 2.25 0 002.25-2.25V15m3-6v6m0 0l-3-3m3 3l-3 3" />
                        </svg>
                      </div>
                    </div>
                  )}
                  {/* Card Content */}
                  <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-semibold text-xs sm:text-base mb-1 truncate" title={item.title}>
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400 mb-2">
                        {item.date ? new Date(item.date).toLocaleDateString() : ''}
                      </div>
                    </div>
                    <div className="flex flex-row gap-2 mt-2 items-center">
                      <button
                        className={`px-2 py-1 rounded font-bold text-xs shadow focus:outline-none focus:ring-2 transition-colors
                          ${item.published
                            ? 'bg-green-200 hover:bg-green-300 text-green-900 focus:ring-green-300'
                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900 focus:ring-gray-300'}
                        `}
                        title={item.published ? 'Unpublish' : 'Publish'}
                        onClick={async () => {
                          try {
                            const res = await fetch(`/api/admin/gallery/${item.id}/publish`, {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ published: !item.published })
                            });
                            if (!res.ok) throw new Error('Failed to update publish state');
                            setMedia(prev => prev.map(m => m.id === item.id ? { ...m, published: !m.published } : m));
                          } catch (err) {
                            alert('Failed to update publish state');
                          }
                        }}
                      >
                        {item.published ? 'Unpublish' : 'Publish'}
                      </button>
                      <button
                        className={`px-2 py-1 rounded bg-red-500 hover:bg-red-600 text-white font-bold text-xs shadow focus:outline-none focus:ring-2 focus:ring-red-400 ${deleting && deleteId === item.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Delete Media"
                        onClick={async () => {
                          if (deleting) return;
                          setDeleteId(item.id);
                          setDeleting(true);
                          try {
                            const res = await fetch(`/api/admin/gallery/${item.id}`, {
                              method: 'DELETE',
                            });
                            if (!res.ok) throw new Error('Failed to delete media');
                            setMedia(prev => prev.filter(m => m.id !== item.id));
                          } catch (err) {
                            alert('Failed to delete media');
                          } finally {
                            setDeleting(false);
                            setDeleteId(null);
                          }
                        }}
                      >
                        {deleting && deleteId === item.id ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {/* Pagination Controls */}
          {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-900 font-bold border border-gray-400 hover:bg-white disabled:opacity-50"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
                <span className="text-gray-100 font-semibold">Page {currentPage} of {totalPages}</span>
                <button
                  className="px-3 py-1 rounded bg-gray-200 text-gray-900 font-bold border border-gray-400 hover:bg-white disabled:opacity-50"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
              </div>
            )}
          </div>
      </div>
    </div>
  );
}
