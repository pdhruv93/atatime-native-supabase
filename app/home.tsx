import { useLoggedInUser } from "@/hooks/useLoggedInUser";
import { Text } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

export default function Home() {
  const { loggedInUser, signOut } = useLoggedInUser();

  console.log(loggedInUser);
  return (
    <>
      <Text>This is Home Screen</Text>
      <Button size="xl" variant="solid" action="primary" onPress={signOut}>
        <ButtonText>Signout</ButtonText>
      </Button>
    </>
  );
}
