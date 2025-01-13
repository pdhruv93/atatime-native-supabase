import { Button, ButtonText } from "@/components/ui/button";
import { useProfileImage } from "./useProfileImage";

export function ProfileImage() {
  const { pickImage } = useProfileImage();

  return (
    <Button size="xl" variant="outline" onPress={pickImage}>
      <ButtonText>Change Profile Image</ButtonText>
    </Button>
  );
}
