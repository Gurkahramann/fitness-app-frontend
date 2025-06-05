"use client"

import { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, Text, BackHandler, Alert } from "react-native"
import type { DateData } from "react-native-calendars"
import { useRouter } from "expo-router"
import { useNavigationState } from '@react-navigation/native';
// Import components
import Header from "../../components/Header"
import WorkoutProgramsCard from "../../components/WorkoutProgramsCard"
import CalendarCard from "../../components/CalendarCard"
import CaloriesCard from "../../components/CaloriesCard"

// Import data
import { WORKOUT_PROGRAMS, WorkoutProgram, RECOMMENDATION_MATRIX } from "../../constants/workoutData"

// Import auth context
import { useAuth } from "@/hooks/useAuth"
import { useCalorie } from "../context/CalorieContext"
import React from "react"
import { useUserProfile } from "../context/UserProfileContext"

export default function HomeScreen() {
  const isDark = useColorScheme() === "dark"
  const [selectedDate, setSelectedDate] = useState("")
  const { calorieGoal, loading } = useCalorie();
  const { user, logout } = useAuth();
  const router = useRouter();
  const navState = useNavigationState(state => state);
  const { userProfile } = useUserProfile();

  // Event handlers
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString)
    console.log("Selected day:", day.dateString)
  }

  const handleProgramPress = (programId: string) => {
    console.log("Program selected:", programId)
  }

  const handleViewAllPress = () => {
    console.log("View all programs pressed")
  }

  // Kullanıcıya göre önerilen programları bul
  let recommendedPrograms: WorkoutProgram[] = [];
  if (userProfile) {
    const activity = userProfile.activityLevel || "*";
    const goal = userProfile.goal || "*";
    // Matrix'te eşleşen satırı bul
    const match = RECOMMENDATION_MATRIX.find(row => (row.activity === activity || row.activity === "*") && (row.goal === goal || row.goal === "*"));
    if (match) {
      // Sıralı öneri: her slug için programı bul ve sırayla ekle (aynı program birden fazla öneride varsa tekrar etmesin)
      const seen = new Set();
      recommendedPrograms = match.recommend
        .map(slug => WORKOUT_PROGRAMS.find(p => p.slug.toUpperCase().replace(/-/g, '_') === slug))
        .filter((p): p is WorkoutProgram => {
          if (!p) return false;
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
    }
    // Eğer hiç eşleşme yoksa fallback olarak tüm programları göster
    if (recommendedPrograms.length === 0) {
      recommendedPrograms = WORKOUT_PROGRAMS;
    }
  } else {
    // Kullanıcı profili yüklenmediyse tüm programları göster
    recommendedPrograms = WORKOUT_PROGRAMS;
  }

  useEffect(() => {
    const onBackPress = () => {
      // Sadece stack'te tek ekran varsa (yani HomeScreen root ise) uyarı göster
      if (navState?.routes?.length === 1) {
        Alert.alert(
          "Çıkış Yap",
          "Çıkış yapmak ister misiniz?",
          [
            { text: "Hayır", style: "cancel" },
            {
              text: "Evet",
              onPress: async () => {
                await logout();
                router.replace("/login");
              },
            },
          ]
        );
        return true;
      }
      // Aksi halde default davranış (geri git)
      return false;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [navState]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}>
      {/* Kullanıcı varsa adını gönderiyoruz, yoksa fallback */}
      {user ? (
        <Header userName={user.name} />
      ) : (
        <Text style={{ padding: 16, fontSize: 18, color: isDark ? "#fff" : "#000" }}>
          Yükleniyor...
        </Text>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
      <WorkoutProgramsCard
        programs={recommendedPrograms.map(p => ({
          id: p.id.toString(),
          title: p.title,
          image: p.coverImageUrl // veya thumbnailUrl
        }))}
        onViewAllPress={handleViewAllPress}
      />

        <CalendarCard selectedDate={selectedDate} onDayPress={handleDayPress} />

        {!loading && calorieGoal ? (
        <CaloriesCard remaining={calorieGoal} goal={calorieGoal} consumed={0} />
      ) : (
        <Text style={{ textAlign: "center", marginTop: 16 }}>Kalori hesaplaniyor...</Text>
      )}      
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
})
