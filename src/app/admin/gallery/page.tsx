"use client";
import { useEffect, useState } from 'react';
import GalleryAdminForm from './upload-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  // Filter state
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [eventFilter, setEventFilter] = useState('all');
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  useEffect(() => {
    async function fetchMedia() {
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
    }
    fetchMedia();
  }, []);

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

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Gallery Management</h1>
      <div className="bg-card p-6 rounded-lg shadow-md mb-8">
        <GalleryAdminForm />
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Current Gallery Media</h2>
        {/* Filter Controls */}
        <div className="flex flex-wrap gap-4 mb-6">
          <select className="border rounded px-3 py-2" value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
            <option value="all">All Types</option>
            <option value="photo">Photo</option>
            <option value="video">Video</option>
          </select>
          <select className="border rounded px-3 py-2" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            <option value="all">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select className="border rounded px-3 py-2" value={eventFilter} onChange={e => setEventFilter(e.target.value)}>
            <option value="all">All Events</option>
            {events.map(ev => <option key={ev} value={ev}>{ev}</option>)}
          </select>
          <select className="border rounded px-3 py-2" value={visibilityFilter} onChange={e => setVisibilityFilter(e.target.value)}>
            <option value="all">All Visibility</option>
            <option value="visible">Visible</option>
            <option value="hidden">Hidden</option>
          </select>
        </div>
        {loading ? (
          <div className="text-center text-muted-foreground">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMedia.length === 0 && <p className="col-span-full text-muted-foreground text-center">No media found for selected filters.</p>}
            {filteredMedia.map(item => (
              <div key={item.id} className="rounded-lg bg-white dark:bg-gray-900 shadow-lg border hover:shadow-xl transition-shadow flex flex-col overflow-hidden">
                {item.type === 'photo' && item.imageUrl && (
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                )}
                {item.type === 'video' && item.videoUrl && (
                  <div className="w-full h-48 bg-black flex items-center justify-center">
                    {/* Show YouTube thumbnail if possible */}
                    {item.videoUrl.includes('youtube') ? (
                      <img
                        src={`https://img.youtube.com/vi/${item.videoUrl.split('v=')[1]?.split('&')[0]}/hqdefault.jpg`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe src={item.videoUrl} title={item.title} className="w-full h-full" allowFullScreen />
                    )}
                  </div>
                )}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-base mb-1 truncate" title={item.title}>
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {item.date ? new Date(item.date).toLocaleDateString() : ''}
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className={`px-3 py-1 rounded text-xs font-semibold ${item.published ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                      onClick={async () => {
                        await fetch('/api/admin/gallery', {
                          method: 'PATCH',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ id: item.id, published: !item.published }),
                        });
                        setMedia(m => m.map(med => med.id === item.id ? { ...med, published: !med.published } : med));
                      }}
                    >
                      {item.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm" onClick={() => setDeleteId(item.id)}>
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Media</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete <span className="font-semibold">{item.title}</span>? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-2 mt-6">
                          <DialogClose asChild>
                            <Button variant="outline" size="sm">Cancel</Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            size="sm"
                            disabled={deleting}
                            onClick={async () => {
                              setDeleting(true);
                              await fetch('/api/admin/gallery', {
                                method: 'DELETE',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ id: item.id }),
                              });
                              setMedia(m => m.filter(med => med.id !== item.id));
                              setDeleting(false);
                              setDeleteId(null);
                            }}
                          >
                            {deleting && deleteId === item.id ? 'Deleting...' : 'Delete'}
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
