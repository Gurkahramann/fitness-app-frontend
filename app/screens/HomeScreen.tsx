"use client"

import { useState, useEffect, useMemo } from "react"
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, Text, BackHandler, Alert } from "react-native"
import type { DateData } from "react-native-calendars"
import { useRouter } from "expo-router"
import { useNavigationState } from '@react-navigation/native';
// Import components
import Header from "../../components/Header"
import WorkoutProgramsCard from "../../components/WorkoutProgramsCard"
import CalendarCard from "../../components/CalendarCard"
import CaloriesCard from "../../components/CaloriesCard"
import UserWorkoutDayCard from '../../components/UserWorkoutDayCard'; 
import ActiveWorkoutProgramsCard from "../../components/ActiveWorkoutProgramsCard"

// Import data
import { RECOMMENDATION_MATRIX } from "../../constants/workoutData"
import { useWorkoutPrograms } from "../context/WorkoutProgramContext"

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
  const { workoutPrograms, loading: programsLoading, userWorkoutPrograms, fetchUserWorkoutPrograms } = useWorkoutPrograms();
  const [markedDates, setMarkedDates] = useState<{ [date: string]: { marked: boolean; dotColor: string } }>({});

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

  // Kullanıcı programlarını yükle
  useEffect(() => {
    if (user?.id) {
      fetchUserWorkoutPrograms(user.id);
    }
  }, [user?.id]);

  // Tarihleri işaretle
  useEffect(() => {
    if (userWorkoutPrograms.length > 0) {
      const newMarkedDates: { [date: string]: { marked: boolean; dotColor: string } } = {};

      userWorkoutPrograms.forEach(program => {
        const startDate = new Date(program.startDate);
        program.savedDays.forEach((day, idx) => {
          // Kaçıncı tekrar olduğunu bul: aynı dayNumber kaç kez geçmiş?
          const sameDayIndex = program.savedDays
            .slice(0, idx + 1)
            .filter(d => d.dayNumber === day.dayNumber).length - 1;
          // Hafta numarası = kaçıncı tekrar
          const weekNumber = sameDayIndex;
          // Tarihi hesapla
          const workoutDate = new Date(startDate);
          workoutDate.setDate(startDate.getDate() + (day.dayNumber - 1) + (weekNumber * 7));
          const dateString = workoutDate.toISOString().split('T')[0];
          newMarkedDates[dateString] = {
            marked: true,
            dotColor: '#3DCC85'
          };
        });
      });

      setMarkedDates(newMarkedDates);
    }
  }, [userWorkoutPrograms]);

  // Kullanıcıya göre önerilen programları bul (backend'den gelen programlar üzerinden)
  const recommendedPrograms = useMemo(() => {
    if (!userProfile || !workoutPrograms.length) return workoutPrograms;
    const activity = userProfile.activityLevel || "*";
    const goal = userProfile.goal || "*";
    const match = RECOMMENDATION_MATRIX.find(row => (row.activity === activity || row.activity === "*") && (row.goal === goal || row.goal === "*"));

    if (match) {
      const seen = new Set();
      const recs = match.recommend
        .map(slug => workoutPrograms.find(p => p.slug.toUpperCase().replace(/-/g, '_') === slug))
        .filter((p): p is typeof workoutPrograms[0] => {
          if (!p) return false;
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
      if (recs.length > 0) return recs;
    }

    return workoutPrograms;
  }, [userProfile, workoutPrograms]);

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

  if (programsLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}> 
        <Text style={{ textAlign: "center", marginTop: 32 }}>Programlar yükleniyor...</Text>
      </SafeAreaView>
    )
  }
  const selectedWorkoutDay = React.useMemo(() => {
    if (!selectedDate || userWorkoutPrograms.length === 0) return null;
  
    // Tüm programlarda, seçili tarihe denk gelen workoutDay'i bul
    for (const program of userWorkoutPrograms) {
      const startDate = new Date(program.startDate);
      for (let i = 0; i < program.savedDays.length; i++) {
        const day = program.savedDays[i];
        // Kaçıncı tekrar olduğunu bul
        const sameDayIndex = program.savedDays
          .slice(0, i + 1)
          .filter(d => d.dayNumber === day.dayNumber).length - 1;
        const weekNumber = sameDayIndex;
        const workoutDate = new Date(startDate);
        workoutDate.setDate(startDate.getDate() + (day.dayNumber - 1) + (weekNumber * 7));
        const dateString = workoutDate.toISOString().split('T')[0];
        if (dateString === selectedDate) {
          return day;
        }
      }
    }
    return null;
  }, [selectedDate, userWorkoutPrograms]);
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
        title="Workout Programs"
        programs={recommendedPrograms
          .filter(p => p && p.id !== undefined && p.title)
          .map(p => ({
            id: p.id.toString(),
            title: p.title,
            image: p.coverImageUrl || ""
          }))
        }
        showCreate={true}
        onViewAllPress={handleViewAllPress}
      />

      {/* Aktif Antrenman Programlarım Card'ı */}
      <WorkoutProgramsCard
        title="Aktif Antrenman Programlarım"
        programs={userWorkoutPrograms.map(up => {
          const program = workoutPrograms.find(wp => wp.id === up.workoutProgramId);
          return {
            id: up.workoutProgramId.toString(),
            title: program ? program.title : `Program #${up.workoutProgramId}`,
            image: program?.coverImageUrl || ""
          };
        })}
        showCreate={false}
      />

        <CalendarCard 
          selectedDate={selectedDate} 
          onDayPress={handleDayPress}
          markedDates={markedDates}
        />
        <UserWorkoutDayCard
        date={selectedDate}
        workoutDay={selectedWorkoutDay}
        onStartWorkout={() => {
          // Burada antrenman başlatma logic'i ekleyebilirsin
          alert('Antrenman başlatılıyor!');
        }}
/>
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
