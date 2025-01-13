import { Button, ButtonText } from "@/components/ui/button";
import { useChnageProfileImage } from "./useChnageProfileImage";

export function ProfileImageChange() {
  const { pickImage } = useChnageProfileImage();

  return (
    <Button size="xl" variant="outline" onPress={pickImage}>
      <ButtonText>Change Profile Image</ButtonText>
    </Button>
  );
}
