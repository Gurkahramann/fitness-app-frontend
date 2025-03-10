// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';
// import React from 'react';

// import { FormProvider } from './context/FormContext';  // FormContext yolunuzu doğrulayın
// import { useColorScheme } from '@/hooks/useColorScheme';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <FormProvider>
//         <Stack>
//           {/* Anasayfa */}
//           <Stack.Screen name="index" options={{ headerShown: false }} />
          
//           {/* Login ekranı */}
//           <Stack.Screen name="login" options={{ headerShown: false }} />
          
//           {/* SignUp ekranı (başlık kapalı) */}
//           <Stack.Screen name="signup" options={{ headerShown: false }} />
//         </Stack>

//         <StatusBar style="auto" />
//       </FormProvider>
//     </ThemeProvider>
//   );
// }
//------------------------------------------------------------------------------------------------

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
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* FormProvider: Tüm ekranların form verilerine erişebilmesi için */}
      <FormProvider>
        <Stack>
          {/* index, login, signup ekranları */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />,
          <Stack.Screen name="personal-info" options={{ headerShown: false }} />
          <Stack.Screen name="life-style" options={{ headerShown: false }} />
          <Stack.Screen name="body-info" options={{ headerShown: false }} />
        </Stack>

        <StatusBar style="auto" />
      </FormProvider>
    </ThemeProvider>
  );
}
