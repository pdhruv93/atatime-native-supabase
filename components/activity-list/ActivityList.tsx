import { useActivityList } from "./useActivityList";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Pressable, ScrollView } from "react-native";
import { UserDetail } from "./UserDetail";
import { Box } from "@/components/ui/box";
import { VStack } from "../ui/vstack";
import { UserAvatar } from "./UserAvatar";
import { Text } from "@/components/ui/text";
import moment from "moment";
import { HStack } from "@/components/ui/hstack";
import { EmptyList } from "./EmptyList";

export function ActivityList() {
  const {
    similarActivities,
    selectedActivity,
    openUserDetailsForActivity,
    closeUserDetails,
  } = useActivityList();

  if (!similarActivities.length) {
    return <EmptyList />;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {similarActivities.map((activity) => (
        <Pressable
          key={`activity-${activity.activity_id}`}
          onPress={() => openUserDetailsForActivity(activity)}
        >
          <Card size="lg" variant="filled" className="p-5 rounded-lg m-3">
            <Text className="text-sm font-normal mb-2 text-typography-700">
              {moment(activity.created_at).format("llll")}
            </Text>

            <VStack className="mb-6">
              <Heading size="xl" className="mb-4">
                {activity.activity_name}
              </Heading>

              {activity.activity_description ? (
                <Text size="md">{activity.activity_description}</Text>
              ) : null}
            </VStack>

            <Box className="flex-row">
              <UserAvatar
                userName={activity.user_display_name}
                fileName={activity.profile_picture}
              />

              <VStack className="ml-3">
                <Heading size="sm" className="mb-1">
                  {activity.user_display_name}
                </Heading>

                <HStack>
                  {activity.user_age ? (
                    <Text size="sm">{`${activity.user_age} years`}</Text>
                  ) : null}

                  {activity.location_name ? (
                    <Text size="sm">{`, ${activity.location_name}`}</Text>
                  ) : null}
                </HStack>
              </VStack>
            </Box>
          </Card>
        </Pressable>
      ))}

      <UserDetail
        selectedActivity={selectedActivity}
        onClose={closeUserDetails}
      />
    </ScrollView>
  );
}
