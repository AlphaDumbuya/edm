"use client";
import { useState } from 'react';
import { UploadButton } from '@/components/shared/UploadButton';
import { useRouter } from 'next/navigation';

const CATEGORY_OPTIONS = [
  'School Project',
  'Evangelism',
  'Worship',
  'Baptism',
  'Fellowship',
  'Outreach',
];
const EVENT_OPTIONS = [
  'Rosortta School Project',
  'Youth Evangelism Camp 2024',
  // Add more as needed
];

export default function GalleryAdminForm() {
  const router = useRouter();
  const [type, setType] = useState<'photo' | 'video'>('photo');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [altText, setAltText] = useState('');
  const [location, setLocation] = useState('');
  const [photographer, setPhotographer] = useState('');
  const [eventName, setEventName] = useState('');
  const [customEventName, setCustomEventName] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoSource, setVideoSource] = useState('youtube'); // 'upload' or 'youtube'
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoLocation, setVideoLocation] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [showVideoForm, setShowVideoForm] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          description,
          category,
          imageUrl: type === 'photo' ? imageUrl : undefined,
          altText,
          location,
          photographer,
          eventName: eventName === 'other' ? customEventName : eventName,
          videoUrl: type === 'video' ? videoUrl : undefined,
          published,
        }),
      });
      if (!res.ok) throw new Error('Failed to upload media');
      setSuccess('Media uploaded!');
      setTitle('');
      setDescription('');
      setCategory('');
      setImageUrl(null);
      setAltText('');
      setLocation('');
      setPhotographer('');
      setEventName('');
      setCustomEventName('');
      setVideoUrl('');
      setPublished(true);
      setShowPhotoForm(false);
      setShowVideoForm(false);
      // Optionally, trigger a refresh (if using SWR or router.refresh)
      if (typeof window !== 'undefined') window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        type="button"
        className="mb-4 px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white font-medium mr-2"
        onClick={() => { setType('photo'); setShowPhotoForm(true); setShowVideoForm(false); }}
      >
        + Create Photo
      </button>
      <button
        type="button"
        className="mb-4 px-4 py-2 rounded bg-purple-600 hover:bg-purple-700 text-white font-medium"
        onClick={() => { setType('video'); setShowVideoForm(true); setShowPhotoForm(false); }}
      >
        + Create Video
      </button>
      {(showPhotoForm || showVideoForm) && (
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {type === 'photo' && showPhotoForm && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input type="text" className="input w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Description</label>
                <textarea className="input w-full border rounded px-3 py-2" value={description} onChange={e => setDescription(e.target.value)} rows={2} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category</label>
                <select className="input w-full border rounded px-3 py-2" value={category} onChange={e => setCategory(e.target.value)} required>
                  <option value="">Select category</option>
                  {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Upload Image</label>
                <UploadButton imageUrl={imageUrl} setImageUrl={setImageUrl} />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Alt Text</label>
                <input type="text" className="input w-full border rounded px-3 py-2" value={altText} onChange={e => setAltText(e.target.value)} required placeholder="e.g., EDM volunteers laying bricks" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Taken At (Location)</label>
                <input type="text" className="input w-full border rounded px-3 py-2" value={location} onChange={e => setLocation(e.target.value)} required placeholder="e.g., Mariffa Village" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Photographer / Source <span className="text-xs text-gray-400">(optional)</span></label>
                <input type="text" className="input w-full border rounded px-3 py-2" value={photographer} onChange={e => setPhotographer(e.target.value)} placeholder="e.g., Pastor John" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Event / Project Name</label>
                <select className="input w-full border rounded px-3 py-2" value={eventName} onChange={e => setEventName(e.target.value)} required>
                  <option value="">Select event/project</option>
                  {EVENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  <option value="other">Other</option>
                </select>
                {eventName === 'other' && (
                  <input type="text" className="input w-full border rounded px-3 py-2 mt-2" value={customEventName} onChange={e => setCustomEventName(e.target.value)} placeholder="Enter the name of the event here......" required />
                )}
              </div>
              <div>
                <span className="block text-sm font-semibold mb-1">Visibility</span>
                <div className="flex gap-6 items-center mt-1">
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      name="published"
                      value="true"
                      checked={published === true}
                      onChange={() => setPublished(true)}
                      className="accent-green-600"
                    />
                    <span className="text-green-700">Visible</span>
                  </label>
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      name="published"
                      value="false"
                      checked={published === false}
                      onChange={() => setPublished(false)}
                      className="accent-gray-400"
                    />
                    <span className="text-gray-500">Hidden</span>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-4 py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Photo'}
                </button>
              </div>
            </>
          )}
          {type === 'video' && showVideoForm && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input type="text" className="input w-full border rounded px-3 py-2" value={title} onChange={e => setTitle(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Video Source</label>
                <select className="input w-full border rounded px-3 py-2" value={videoSource} onChange={e => setVideoSource(e.target.value)} required>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="vimeo">Vimeo</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Video URL</label>
                <input type="url" className="input w-full border rounded px-3 py-2" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} required placeholder="Paste the video URL here (YouTube, TikTok, Vimeo, etc.)" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Filmed At (Location)</label>
                <input type="text" className="input w-full border rounded px-3 py-2" value={videoLocation} onChange={e => setVideoLocation(e.target.value)} required placeholder="e.g., Rosortta Village" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Event / Project Name</label>
                <select className="input w-full border rounded px-3 py-2" value={eventName} onChange={e => setEventName(e.target.value)} required>
                  <option value="">Select event/project</option>
                  {EVENT_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  <option value="other">Other</option>
                </select>
                {eventName === 'other' && (
                  <input type="text" className="input w-full border rounded px-3 py-2 mt-2" value={customEventName} onChange={e => setCustomEventName(e.target.value)} placeholder="Enter the name of the event here......" required />
                )}
              </div>
              <div>
                <span className="block text-sm font-semibold mb-1">Visibility</span>
                <div className="flex gap-6 items-center mt-1">
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      name="published"
                      value="true"
                      checked={published === true}
                      onChange={() => setPublished(true)}
                      className="accent-green-600"
                    />
                    <span className="text-green-700">Visible</span>
                  </label>
                  <label className="flex items-center gap-2 font-medium">
                    <input
                      type="radio"
                      name="published"
                      value="false"
                      checked={published === false}
                      onChange={() => setPublished(false)}
                      className="accent-gray-400"
                    />
                    <span className="text-gray-500">Hidden</span>
                  </label>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-4 py-2 px-4 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold shadow"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Video'}
                </button>
              </div>
            </>
          )}
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
        </form>
      )}
    </>
  );
}
