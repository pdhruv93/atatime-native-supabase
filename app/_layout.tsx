import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContextProvider } from "@/context/AuthContext";

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
      <AuthContextProvider>
        <SafeAreaView style={{ flex: 1, paddingHorizontal: 20 }}>
          <Stack screenOptions={{ headerShown: false }} />
        </SafeAreaView>
      </AuthContextProvider>

      <StatusBar style="auto" />
    </GluestackUIProvider>
  );
}
