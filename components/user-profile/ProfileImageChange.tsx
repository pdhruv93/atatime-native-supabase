import { Button, ButtonText } from "@/components/ui/button";
import { useChangeProfileImage } from "./useChangeProfileImage";

export function ProfileImageChange() {
  const { pickImage } = useChangeProfileImage();

  return (
    <Button size="xl" variant="outline" onPress={pickImage}>
      <ButtonText>Change Profile Image</ButtonText>
    </Button>
  );
}
