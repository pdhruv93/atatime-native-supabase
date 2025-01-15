import * as Location from "expo-location";
import { Button, ButtonIcon } from "@/components/ui/button";
import { useShowToast } from "@/hooks/useShowToast";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { RepeatIcon } from "@/components/ui/icon";
import { useUpdateUserProfile } from "@/hooks/useUpdateUserProfile";
import { useAuthStore } from "@/store/AuthStore";
import { useShallow } from "zustand/react/shallow";

export function UserLocation() {
  const { updateProfileToSupabase } = useUpdateUserProfile();
  const { generateToast } = useShowToast();
  const [user] = useAuthStore(useShallow((s) => [s.loggedInUser]));

  const getCurrentLocation = async () => {
    //used for the pop up box where we give permission to use location
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      generateToast("location", "error", "Location access not granted");
      return;
    }

    //get current position lat and long
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();

    if (latitude && longitude) {
      //provide lat and long to get the the actual address
      let response = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      //loop on the response to get the actual result
      for (let item of response) {
        const locationName = item.city;
        updateProfileToSupabase({
          location_name: locationName,
          location: `POINT(${longitude} ${latitude})`,
        });
      }
    }
  };

  return (
    <HStack className="items-center">
      <Heading size="sm">{user?.location_name || "No location"}</Heading>

      <Button
        size="xs"
        className="rounded-full p-2 self-start ml-2"
        variant="outline"
        onPress={getCurrentLocation}
      >
        <ButtonIcon as={RepeatIcon} />
      </Button>
    </HStack>
  );
}
