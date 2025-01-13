import { useAuthContext } from "@/context/AuthContext";
import { useShowToast } from "@/hooks/useShowToast";
import { useEffect } from "react";

export default function App() {
  const { isProfileComplete } = useAuthContext();
  const { generateToast } = useShowToast();

  useEffect(() => {
    if (!isProfileComplete) {
      generateToast(
        "incomplete-profile",
        "warning",
        "Your profile is incomplete. Your name, location and atleast 1 social profile is needed",
        6000
      );
    }
  }, []);

  return null;
}
