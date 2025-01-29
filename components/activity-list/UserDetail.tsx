import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { type ActivityWithUserDetails } from "./types";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { Button, ButtonText } from "@/components/ui/button";
import * as Linking from "expo-linking";
import { UserAvatar } from "./UserAvatar";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { InfoIcon } from "@/components/ui/icon";
import { ScrollView } from "react-native";
import { Text } from "@/components/ui/text";
import { HStack } from "../ui/hstack";

interface UserDetailProps {
  selectedActivity: ActivityWithUserDetails | null;
  onClose: () => void;
}

export function UserDetail({ selectedActivity, onClose }: UserDetailProps) {
  return (
    <Actionsheet isOpen={!!selectedActivity} onClose={onClose}>
      <ActionsheetBackdrop />

      <ActionsheetContent>
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack
            space="lg"
            className="p-4 h-1/2 items-center w-full justify-between"
          >
            <UserAvatar
              userName={selectedActivity?.user_display_name}
              fileName={selectedActivity?.profile_picture}
            />

            <VStack className="items-center">
              <Heading size="2xl">
                {selectedActivity?.user_display_name}
              </Heading>

              {selectedActivity?.user_age ? (
                <Heading size="lg">{`${selectedActivity?.user_age} years`}</Heading>
              ) : null}

              {selectedActivity?.location_name ? (
                <HStack>
                  <Heading size="lg">
                    {selectedActivity?.location_name}
                    {selectedActivity.distance
                      ? `, ${selectedActivity.distance / 1000} km away`
                      : null}
                  </Heading>
                </HStack>
              ) : null}
            </VStack>

            {selectedActivity?.user_bio ? (
              <Text>{selectedActivity?.user_bio}</Text>
            ) : null}

            <Alert action="warning" variant="solid">
              <AlertIcon as={InfoIcon} />
              <AlertText>
                Follow your conscience. Do not share any personal or financial
                details over chat
              </AlertText>
            </Alert>

            {selectedActivity?.user_email ? (
              <Button
                size="xl"
                variant="outline"
                className="w-full"
                onPress={() =>
                  Linking.openURL(`mailto:${selectedActivity.user_email}`)
                }
              >
                <ButtonText>Contact</ButtonText>
              </Button>
            ) : null}
          </VStack>
        </ScrollView>
      </ActionsheetContent>
    </Actionsheet>
  );
}
