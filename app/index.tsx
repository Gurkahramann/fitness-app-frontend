import React from 'react';
import { useNavigation } from 'expo-router';
import HomeScreen from './screens/HomeScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BodyInfoScreen from './screens/BodyInfoScreen';
import LoginScreen from './screens/LoginScreen';
import PersonalInfo from './screens/PersonalInfoScreen';
import PersonalInfoScreen from './personal-info';
import LifestyleScreen from './screens/LifeStyleScreen';  
import WelcomePage from './screens/WelcomePage';


export default function Index() {
  return (
    <SafeAreaProvider>
      <WelcomePage />
    </SafeAreaProvider>
  );
}
