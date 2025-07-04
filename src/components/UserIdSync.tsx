import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function UserIdSync() {
  const { data: session } = useSession();
  useEffect(() => {
    if (session?.user?.id) {
      localStorage.setItem('userId', session.user.id);
    }
  }, [session?.user?.id]);
  return null;
}
