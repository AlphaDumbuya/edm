import { useState } from 'react';

export default function PrayerSearchFilter({ onSearch }: { onSearch: (q: string) => void }) {
  const [query, setQuery] = useState('');

  return (
    <div className="flex flex-col md:flex-row gap-2 mb-6 items-center">
      <input
        type="text"
        placeholder="Search by name or keyword..."
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          onSearch(e.target.value);
        }}
        className="border rounded px-3 py-2 w-full md:w-64"
      />
    </div>
  );
}
