import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import React from 'react';
import 'react-native-reanimated';

import { FormProvider } from './context/FormContext'; // FormContext konumuna dikkat edin
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from './context/AuthContext';
import { CalorieProvider } from './context/CalorieContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { UserProfileProvider } from "./context/UserProfileContext"

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // SplashScreen kontrolü
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
    <UserProfileProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <FormProvider>
          <ToastProvider>
            <CalorieProvider>
            <Stack>
              {/* index, login, signup ekranları */}
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="signup" options={{ headerShown: false }} />
              <Stack.Screen name="home-page" options={{ headerShown: false }} />
              <Stack.Screen name="personal-info" options={{ headerShown: false }} />
              <Stack.Screen name="life-style" options={{ headerShown: false }} />
              <Stack.Screen name="body-info" options={{ headerShown: false }} />
              <Stack.Screen name="profile-page" options={{ headerShown: false }} />
              <Stack.Screen name="profile-edit" options={{ headerShown: false }} />
            </Stack>
            <StatusBar style="auto" />
            </CalorieProvider>
          </ToastProvider>
          </FormProvider>
      </ThemeProvider>
    </UserProfileProvider>
    </AuthProvider>
  );
}