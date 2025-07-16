import { useEffect, useState } from "react";

export default function LocalizedDate({ dateString }: { dateString: string }) {
  const [local, setLocal] = useState(dateString);
  useEffect(() => {
    setLocal(new Date(dateString).toLocaleDateString());
  }, [dateString]);
  return <span>{local}</span>;
}
