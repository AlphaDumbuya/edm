import { Card } from '@/components/ui/card';
import { useState, useEffect } from 'react';

interface Testimonial {
  name: string;
  message: string;
  date?: string;
  createdAt?: string;
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

// Add onCreateTestimony prop
type TestimonialsSectionProps = {
  testimonials: Testimonial[];
  onCreateTestimony?: () => void;
};

export default function TestimonialsSection({ testimonials, onCreateTestimony }: TestimonialsSectionProps) {
  // Hydration-safe date formatting
  const [formattedDates, setFormattedDates] = useState<string[]>(() => testimonials.map(t => t.createdAt || t.date || ""));
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
    setFormattedDates(testimonials.map(t => {
      const dateStr = t.createdAt || t.date || "";
      const d = new Date(dateStr);
      try {
        return d.toLocaleDateString();
      } catch {
        return dateStr;
      }
    }));
  }, [testimonials]);

  return (
    <section className="my-12">
      <div className="w-full max-w-none bg-white rounded-lg shadow border border-green-100 p-4 sm:p-6 xl:flex xl:items-start xl:gap-8">
        <div className="flex-1 min-w-0">
          <div className="mb-4 flex flex-col items-center">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-green-900 mb-1 text-center">Stories of Answered Prayer</h2>
            <p className="text-green-800 text-xs sm:text-sm md:text-base mb-3 text-center">Read how God is moving in our community. Share your own testimony to encourage others!</p>
            <div className="w-full flex justify-center mt-2">
              <button
                className="bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition text-xs sm:text-sm md:text-base font-semibold shadow w-full sm:w-auto"
                onClick={onCreateTestimony}
                type="button"
              >
                Share Your Answered Prayer
              </button>
            </div>
          </div>
          {testimonials.length === 0 ? (
            <div className="text-gray-500">No testimonials yet. Be the first to share your answered prayer!</div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
              {testimonials.map((t, i) => (
                <Card
                  key={i}
                  className="p-6 bg-green-50 border-green-200 flex flex-col gap-3 min-h-[260px] h-full max-w-2xl mx-auto shadow-lg"
                  style={{ wordBreak: 'break-word', maxHeight: '480px', overflowY: 'auto' }}
                >
                  <div className="flex flex-row items-center gap-2 mb-2">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-base sm:text-xl shrink-0">
                      {getInitials(t.name)}
                    </div>
                    <div className="font-semibold text-green-900 text-base sm:text-lg truncate max-w-[120px] sm:max-w-none">{t.name}</div>
                  </div>
                  <div className="italic text-green-800 mb-2 break-words whitespace-pre-line text-sm sm:text-base leading-relaxed">
                    {t.message}
                  </div>
                  <div className="text-xs text-green-700 mt-auto text-right">
                    {hydrated ? formattedDates[i] : t.createdAt || t.date || ""}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
