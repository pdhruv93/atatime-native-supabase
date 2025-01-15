import { useState } from "react";
import { Activity } from "./types";

export function useActivityList() {
  const [activities, setActivities] = useState<Activity[]>([]);

  return { activities };
}
