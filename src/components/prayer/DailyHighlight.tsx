import { Card } from '@/components/ui/card';
import type { PrayerRequestData } from '@/types/prayerRequest';

export default function DailyHighlight({ request }: { request: PrayerRequestData | null }) {
  if (!request) return null;
  return (
    <Card className="mb-8 bg-yellow-50 border-yellow-300">
      <div className="p-4">
        <h2 className="text-xl font-bold text-yellow-900 mb-2">Today's Highlighted Prayer Request</h2>
        <div className="text-gray-800 mb-1"><b>{request.name}</b> asks for prayer:</div>
        <div className="text-lg italic text-yellow-800 mb-2">“{request.request}”</div>
        <div className="text-xs text-yellow-700">Posted: {request.createdAt instanceof Date ? request.createdAt.toLocaleDateString() : request.createdAt}</div>
      </div>
    </Card>
  );
}
