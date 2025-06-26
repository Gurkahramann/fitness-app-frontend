"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, Text, BackHandler, Alert, View } from "react-native"
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { DateData } from "react-native-calendars"
import { useRouter } from "expo-router"
import { useNavigationState, useFocusEffect } from '@react-navigation/native';
// Import components
import Header from "../../components/Header"
import WorkoutProgramsCard from "../../components/WorkoutProgramsCard"
import CalendarCard from "../../components/CalendarCard"
import CaloriesCard from "../../components/CaloriesCard"
import UserWorkoutDayCard from '../../components/UserWorkoutDayCard'; 
import ActiveWorkoutProgramsCard from "../../components/ActiveWorkoutProgramsCard"
import type { WorkoutProgram as CardWorkoutProgram } from '../../components/WorkoutProgramsCard';
import CustomAlert from "../../components/CustomAlert";
import { useCustomAlert } from "../../hooks/useCustomAlert";

// Import data
import { RECOMMENDATION_MATRIX } from "../../constants/workoutData"
import { useWorkoutPrograms } from "../context/WorkoutProgramContext"

// Import auth context
import { useAuth } from "@/hooks/useAuth"
import { useCalorie } from "../context/CalorieContext"
import React from "react"
import { useUserProfile } from "../context/UserProfileContext"
import { useExercises } from "../context/ExerciseContext"

export default function HomeScreen() {
  const isDark = useColorScheme() === "dark"
  const [selectedDate, setSelectedDate] = useState("")
  const { calorieGoal, loading } = useCalorie();
  const { user, logout } = useAuth();
  const router = useRouter();
  const navState = useNavigationState(state => state);
  const { userProfile } = useUserProfile();
  const { workoutPrograms, loading: programsLoading, userWorkoutPrograms, fetchUserWorkoutPrograms, deleteUserWorkoutProgram, fetchUserCustomWorkoutPrograms, userCustomWorkoutPrograms, deleteCustomWorkoutProgram, refetch: fetchWorkoutPrograms } = useWorkoutPrograms();
  const [markedDates, setMarkedDates] = useState<{ [date: string]: { marked: boolean; dotColor: string } }>({});
  const [isAnyExerciseActive, setIsAnyExerciseActive] = useState(false);
  const { exercises } = useExercises();
  const insets = useSafeAreaInsets();
  const { alert, alertConfig, visible, hideAlert } = useCustomAlert();

  // Event handlers
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString)
    console.log("Selected day:", day.dateString)
  }

  const handleProgramPress = (program: CardWorkoutProgram) => {
    console.log("Program selected:", program)
    router.push({
      pathname: "/workout-detail",
      params: { id: program.id, type: program.type }
    });
  };

  // Kullanıcı programlarını yükle
  useEffect(() => {
    if (user?.id) {
      fetchUserWorkoutPrograms(user.id);
      fetchUserCustomWorkoutPrograms(user.id);
      fetchWorkoutPrograms();
    }
  }, [user?.id]);

  // Ana sayfa her odaklandığında özel programları tekrar çek
  useFocusEffect(
    React.useCallback(() => {
      if (user?.id) {
        fetchUserCustomWorkoutPrograms(user.id);
      }
    }, [user?.id])
  );

  useEffect(() => {
    console.log("userCustomWorkoutPrograms state:", userCustomWorkoutPrograms);
  }, [userCustomWorkoutPrograms]);
  // Tarihleri işaretle
  useEffect(() => {
    setMarkedDates({}); // Önce işaretli günleri sıfırla
    if (userWorkoutPrograms.length > 0) {
      const newMarkedDates: { [date: string]: { marked: boolean; dotColor: string } } = {};

      userWorkoutPrograms.forEach(program => {
        const startDate = new Date(program.startDate);
        const isCustom = program.workoutProgramId === null || program.workoutProgramId === undefined;
        let programDetails;
        if (isCustom) {
            programDetails = userCustomWorkoutPrograms.find(p => String(p.id) === String(program.customWorkoutProgramId));
        } else {
            programDetails = workoutPrograms.find(wp => String(wp.id) === String(program.workoutProgramId));
        }
        if (!programDetails) {
          console.warn("Program details not found for:", program);
          return;
        }

        const durationWeeks = programDetails.durationWeeks || 4;
        // savedDays boşsa, custom programlarda programDetails.days'i kullan
        const daysToMark = (program.savedDays && program.savedDays.length > 0)
          ? program.savedDays
          : (programDetails.days || []);

        daysToMark.forEach((day) => {
          // day.dayNumber custom programlarda olabilir, yoksa dayOfWeek kullan
          const dayNumber = day.dayNumber || day.dayOfWeek;
          for (let week = 0; week < durationWeeks; week++) {
            const workoutDate = new Date(startDate);
            workoutDate.setUTCDate(startDate.getUTCDate() + (dayNumber - 1) + (week * 7));
            const dateString = workoutDate.toISOString().split('T')[0];
            newMarkedDates[dateString] = {
              marked: true,
              dotColor: '#3DCC85'
            };
          }
        });
      });

      setMarkedDates(newMarkedDates);
    }
  }, [userWorkoutPrograms, workoutPrograms, userCustomWorkoutPrograms]);

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

  
  const defaultPrograms = recommendedPrograms
    .filter(p => p && p.id !== undefined && p.title)
    .map(p => ({
      id: p.id.toString(),
      title: p.title,
      image: p.coverImageUrl || "",
      type: "default"
    }));
  useEffect(() => {
    const onBackPress = () => {
      console.log("[HomeScreen] navState:", navState);
      console.log("[HomeScreen] navState.routes:", navState?.routes);
      // Sadece stack'te tek ekran varsa (yani HomeScreen root ise) uyarı göster
      if (navState?.routes?.length === 1) {
        alert(
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
              style: "destructive"
            },
          ],
          {
            icon: "exit-to-app",
            iconColor: "#FF3B30",
          }
        );
        return true;
      }
      // Aksi halde default davranış (geri git)
      return false;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [navState, alert, logout, router]);
  
  

  const selectedWorkoutDay = React.useMemo(() => {
    if (!selectedDate || userWorkoutPrograms.length === 0) return null;

    for (const program of userWorkoutPrograms) {
      const startDate = new Date(program.startDate);
      const isCustom = program.workoutProgramId === null || program.workoutProgramId === undefined;
      let programDetails;
      if (isCustom) {
        programDetails = userCustomWorkoutPrograms.find(p => String(p.id) === String(program.customWorkoutProgramId));
      } else {
        programDetails = workoutPrograms.find(wp => String(wp.id) === String(program.workoutProgramId));
      }
      const durationWeeks = programDetails?.durationWeeks || 4;
      // savedDays boşsa, custom programlarda programDetails.days'i kullan
      const daysToCheck = (program.savedDays && program.savedDays.length > 0)
        ? program.savedDays
        : (programDetails?.days || []);

      for (let i = 0; i < daysToCheck.length; i++) {
        const day = daysToCheck[i];
        const dayNumber = day.dayNumber || day.dayOfWeek;
        for (let week = 0; week < durationWeeks; week++) {
          const workoutDate = new Date(startDate);
          workoutDate.setUTCDate(startDate.getUTCDate() + (dayNumber - 1) + (week * 7));
          const dateString = workoutDate.toISOString().split('T')[0];
          if (dateString === selectedDate) {
            // Eğer custom ise, programDetails.days içindeki ilgili günü döndür
            if (isCustom && programDetails?.days) {
              let foundDay = programDetails.days.find(d => (d.dayOfWeek || d.dayNumber) === dayNumber);
              if (foundDay && foundDay.exerciseEntries) {
                foundDay = {
                  ...foundDay,
                  exerciseEntries: foundDay.exerciseEntries
                    .map((entry: any) => {
                      const exercise = exercises.find((ex: any) => String(ex.id) === String(entry.exerciseId));
                      return exercise ? { ...entry, exercise } : null;
                    })
                    .filter(Boolean)
                };
              }
              return foundDay;
            }
            // Hazır programda zaten day objesi yeterli
            return day;
          }
        }
      }
    }
    return null;
  }, [selectedDate, userWorkoutPrograms, workoutPrograms, userCustomWorkoutPrograms]);

  const handleDeleteProgram = async (programId: string) => {
    try {
      await deleteUserWorkoutProgram(user?.id || '', programId);
      // Takvim güncellemesi kaldırıldı, sadece fetch işlemi yapılacak
    } catch (error) {
      alert(
        "Hata",
        "Program silinirken bir hata oluştu",
        [
          { text: "Tamam", style: "default" }
        ],
        { icon: "alert-circle", iconColor: "#FF3B30" }
      );
    }
  };
  const handleDeleteCustomProgram = async (programId: string) => {
    try {
      await deleteCustomWorkoutProgram(user?.id || '', programId);
    } catch (error) {
      alert(
        "Hata",
        "Custom program silinirken bir hata oluştu",
        [
          { text: "Tamam", style: "default" }
        ],
        { icon: "alert-circle", iconColor: "#FF3B30" }
      );
    }
  };
  const customPrograms = userCustomWorkoutPrograms.map(p => ({
    id: p.id?.toString() ?? "",
    title: p.title,
    image: p.coverImageUrl || "https://via.placeholder.com/400x300/3DCC85/FFFFFF?text=Custom+Program",
    type: "custom",
    onDelete: () => {
      alert(
        "Programı Kaldır",
        "Bu programı kaldırmak istediğinizden emin misiniz?",
        [
          { text: "İptal", style: "cancel" },
          {
            text: "Kaldır",
            style: "destructive",
            onPress: () => {
              handleDeleteCustomProgram(p.id?.toString() ?? "");
            }
          }
        ],
        {
          icon: "delete-forever",
          iconColor: "#FF3B30",
        }
      );
    }
  }));

  const handleAnyExerciseActive = useCallback((active: boolean) => {
    setIsAnyExerciseActive(active);
  }, []);

  useEffect(() => {
  }, [workoutPrograms]);

  if (programsLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}> 
        <Text style={{ textAlign: "center", marginTop: 32 }}>Programlar yükleniyor...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}> 
      {/* Kullanıcı varsa adını gönderiyoruz, yoksa fallback */}
      <View style={[styles.header, { paddingTop: insets.top }]}> 
        {user ? (
          <Header userName={user.name} />
        ) : (
          <Text style={{ padding: 16, fontSize: 18, color: isDark ? "#fff" : "#000" }}>
            Yükleniyor...
          </Text>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
          <WorkoutProgramsCard
        title="Antrenman Programları"
        programs={defaultPrograms}
        showCreate={true}
        onProgramPress={handleProgramPress}
      />

      {customPrograms.length > 0 && (
        <WorkoutProgramsCard
          title="Özel Programlarım"
          programs={customPrograms}
          showCreate={true}
          onProgramPress={handleProgramPress}
        />
      )}

      {/* Aktif Antrenman Programları */}
      {userWorkoutPrograms.length > 0 && (
        <WorkoutProgramsCard
          title="Aktif Antrenman Programlarım"
          programs={userWorkoutPrograms.map(up => {
            const isCustom = up.workoutProgramId === null || up.workoutProgramId === undefined;
            let programDetails;

            if (isCustom) {
              // Custom programlarda doğru eşleştirme
              programDetails = userCustomWorkoutPrograms.find(cp => String(cp.id) === String(up.customWorkoutProgramId));
            } else {
              programDetails = workoutPrograms.find(wp => wp.id === up.workoutProgramId);
            }
            return {
              id: up.id, // Silme için UserWorkoutProgram'ın ID'si
              title: programDetails ? programDetails.title : (isCustom ? "Özel Program" : "Program"),
              image: programDetails?.coverImageUrl || "https://via.placeholder.com/400x300/3DCC85/FFFFFF?text=Program",
              type: isCustom ? "custom" : "default",
              onDelete: () => {
                alert(
                  "Programı Kaldır",
                  `"${programDetails?.title || 'Bu'}" programını kaldırmak istediğinizden emin misiniz?`,
                  [
                    { text: "İptal", style: "cancel" },
                    { 
                      text: "Kaldır", 
                      style: "destructive",
                      onPress: () => handleDeleteProgram(up.id.toString())
                    }
                  ],
                  {
                    icon: "delete-forever",
                    iconColor: "#FF3B30",
                  }
                );
              }
            };
          })}
          showCreate={false}
        />
      )}

      <CalendarCard 
        selectedDate={selectedDate} 
        onDayPress={isAnyExerciseActive ? () => {} : handleDayPress}
        markedDates={markedDates}
      />
      <UserWorkoutDayCard
        date={selectedDate}
        workoutDay={selectedWorkoutDay}
        onStartWorkout={() => {
          alert('Antrenman başlatılıyor!');
        }}
        isAnyExerciseActive={isAnyExerciseActive}
        onAnyExerciseActive={handleAnyExerciseActive}
      />
      {!loading && calorieGoal ? (
      <CaloriesCard remaining={calorieGoal} goal={calorieGoal} consumed={0} />
    ) : (
      <Text style={{ textAlign: "center", marginTop: 16 }}>Kalori hesaplanıyor...</Text>
    )}      
      </ScrollView>

      {/* CustomAlert Bileşeni */}
      {alertConfig && (
        <CustomAlert
          visible={visible}
          title={alertConfig.title}
          message={alertConfig.message}
          buttons={alertConfig.buttons}
          onClose={hideAlert}
          icon={alertConfig.icon}
          iconColor={alertConfig.iconColor}
        />
      )}
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
  header: {
    paddingHorizontal: 16,
  },
})
