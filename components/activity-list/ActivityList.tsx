import { useActivityList } from "./useActivityList";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";

export function ActivityList() {
  const { activities } = useActivityList();

  return (
    <Box>
      {activities.map((activity, index) => (
        <Card size="lg" variant="filled" className="m-3">
          <Heading size="md" className="mb-1">
            {activity.name}
          </Heading>

          <Text size="sm">Start building your next project in minutes</Text>
        </Card>
      ))}
    </Box>
  );
}
