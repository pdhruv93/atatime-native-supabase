import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

//If you are the admin and should have access to all data, to initialize the supabase javascript client,
// you can use the service key instead of the anon key, which will give you all permissions

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL as string;
const supaBaseServiceKey = process.env
  .EXPO_PUBLIC_SUPABASE_SERVICE_KEY as string;

export const supabase = createClient(supabaseUrl, supaBaseServiceKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
