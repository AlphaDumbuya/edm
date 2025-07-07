const verses = [
  {
    ref: 'Philippians 4:6',
    text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'
  },
  {
    ref: '1 John 5:14',
    text: 'This is the confidence we have in approaching God: that if we ask anything according to his will, he hears us.'
  },
  {
    ref: 'Jeremiah 29:12',
    text: 'Then you will call on me and come and pray to me, and I will listen to you.'
  },
  // Add more verses as desired
];

const getWeeklyVerse = () => {
  const week = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  return verses[week % verses.length];
};

export default function ScriptureOfTheWeek() {
  const verse = getWeeklyVerse();
  return (
    <div className="my-6 p-4 bg-blue-50 border-l-4 border-blue-400">
      <div className="text-blue-900 font-semibold mb-1">Scripture of the Week</div>
      <div className="italic text-blue-800">“{verse.text}”</div>
      <div className="text-xs text-blue-700 mt-1">— {verse.ref}</div>
    </div>
  );
}
