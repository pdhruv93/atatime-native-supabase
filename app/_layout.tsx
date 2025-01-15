import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/Montserrat-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <GluestackUIProvider mode="light">
      <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
        <LoadingSpinner />
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>

      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
