import { Center } from "@/components/ui/center";
import { SignupForm } from "@/components/SignupForm";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";

export default function SignUp() {
  return (
    <Center className="dark:bg-black h-full">
      <VStack space="4xl" className="w-full justify-center">
        <VStack>
          <Heading size="4xl">@@time</Heading>
          <Heading size="md">Simple passwordless login</Heading>
        </VStack>

        <SignupForm />
      </VStack>
    </Center>
  );
}
