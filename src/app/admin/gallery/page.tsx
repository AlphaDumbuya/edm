"use client";
import { useEffect, useState } from 'react';
import GalleryAdminForm from './upload-form';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

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

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchMedia();
    setIsRefreshing(false);
  };

  useEffect(() => {
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
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Current Gallery Media</h2>
          <Button
            onClick={handleRefresh}
            disabled={isRefreshing}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>
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
                  <div className="w-full h-48 bg-black flex items-center justify-center relative group">
                    {/* Show YouTube thumbnail if possible */}
                    {(() => {
                      let youtubeId = '';
                      if (item.videoUrl.includes('youtube.com/embed/')) {
                        youtubeId = item.videoUrl.split('embed/')[1]?.split('?')[0];
                      } else if (item.videoUrl.includes('youtu.be/')) {
                        youtubeId = item.videoUrl.split('youtu.be/')[1]?.split('?')[0];
                      } else if (item.videoUrl.includes('youtube.com')) {
                        youtubeId = item.videoUrl.split('v=')[1]?.split('&')[0];
                      }

                      return youtubeId ? (
                        <>
                          <img
                            src={`https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`}
                            alt={item.title}
                            className="w-full h-full object-cover transition-opacity duration-200"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                              <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                            </svg>
                          </div>
                        </>
                      ) : (
                        <iframe src={item.videoUrl} title={item.title} className="w-full h-full" allowFullScreen />
                      );
                    })()}
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
