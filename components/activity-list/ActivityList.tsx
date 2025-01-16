import { useActivityList } from "./useActivityList";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Pressable } from "react-native";
import { UserDetail } from "./UserDetail";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "../ui/vstack";
import { UserAvatar } from "./UserAvatar";
import { GlobeIcon, Icon } from "@/components/ui/icon";

export function ActivityList() {
  const {
    similarActivities,
    selectedActivity,
    openUserDetailsForActivity,
    closeUserDetails,
  } = useActivityList();

  return (
    <Box>
      {similarActivities.map((activity) => (
        <Pressable
          key={`activity-${activity.activity_id}`}
          onPress={() => openUserDetailsForActivity(activity)}
        >
          <Card size="lg" variant="filled" className="m-3">
            <HStack className="w-full justify-between">
              <VStack>
                <Heading size="2xl" className="mb-1">
                  {activity.activity_name}
                </Heading>

                {activity.activity_description ? (
                  <Heading size="sm">{activity.activity_description}</Heading>
                ) : null}

                {activity.location_name ? (
                  <HStack className="items-center mt-4">
                    <Icon
                      as={GlobeIcon}
                      className="text-typography-500 w-4 h-4 mr-2"
                    />

                    <Heading size="sm">{activity.location_name}</Heading>

                    {activity.distance ? (
                      <Heading size="sm">{activity.distance}</Heading>
                    ) : null}
                  </HStack>
                ) : null}
              </VStack>

              <UserAvatar
                userName={activity.user_display_name}
                fileName={activity.profile_picture}
              />
            </HStack>
          </Card>
        </Pressable>
      ))}

      <UserDetail
        selectedActivity={selectedActivity}
        onClose={closeUserDetails}
      />
    </Box>
  );
}
