import { type Tables } from "@/database.types";

export type Activity = Tables<"activities">;

export type ActivityWithUserDetails = {
  activity_id: number;
  created_at: string;
  created_by: string;
  activity_name: string;
  activity_description: string;
  user_display_name: string;
  user_bio: string;
  user_age: number;
  user_email: string;
  user_location: unknown;
  location_name: string;
  profile_picture: string;
  is_complete: boolean;
  distance: number;
};
