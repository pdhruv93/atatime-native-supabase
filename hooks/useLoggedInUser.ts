import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export function useLoggedInUser() {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then((data) => {
        if (data.data.session) {
          setSession(data.data.session);
        }
      })
      .catch(() => {
        setSession(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    isLoading,
    loggedInUser: session?.user,
    signOut: () => supabase.auth.signOut(),
  };
}
