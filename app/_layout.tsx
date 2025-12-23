import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { useFonts } from 'expo-font';
import { Outfit_400Regular, Outfit_500Medium, Outfit_600SemiBold, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { View, StyleSheet } from 'react-native';

import { useColorScheme } from "@/hooks/use-color-scheme";
import { ThemeProvider } from "@/hooks/use-theme";
import { NotificationProvider } from "@/lib/notifications";
import { NotificationContainer } from "@/components/notifications";

SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <NotificationProvider>
        <NavThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <View style={styles.container}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: "modal", title: "Modal" }}
              />
            </Stack>
            <NotificationContainer />
          </View>
          <StatusBar style="auto" />
        </NavThemeProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

