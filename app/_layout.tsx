import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import React from 'react';
import 'react-native-reanimated';

import { FormProvider } from './context/FormContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from './context/AuthContext';
import { CalorieProvider } from './context/CalorieContext';
import { ToastProvider } from './context/ToastContext';
import { UserProfileProvider } from "./context/UserProfileContext"
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { WorkoutProgramProvider } from "./context/WorkoutProgramContext";
import { ExerciseProvider } from "./context/ExerciseContext";
import { FoodLogProvider } from "./context/FoodLogContext";

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
    <GestureHandlerRootView style={{ flex: 1 }}>
    <AuthProvider>
    <UserProfileProvider>
      <FoodLogProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <FormProvider>
          <ToastProvider>
            <WorkoutProgramProvider>
              <ExerciseProvider>
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
                    <Stack.Screen name="workout-detail" options={{ headerShown: false }} />
                    <Stack.Screen name="create-program" options={{ headerShown: false }} />
                  </Stack>
                  <StatusBar style="auto" />
                </CalorieProvider>
              </ExerciseProvider>
            </WorkoutProgramProvider>
            </ToastProvider>
            </FormProvider>
        </ThemeProvider>
      </FoodLogProvider>
    </UserProfileProvider>
    </AuthProvider>
    </GestureHandlerRootView>
  );
}