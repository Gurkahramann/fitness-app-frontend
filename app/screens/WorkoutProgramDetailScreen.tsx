import React, { useState, useEffect, useMemo } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Platform,
  Image,
  FlatList,
  Modal,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"
import ExerciseDetailModal from "../../components/ExerciseDetailModal"
import WorkoutProgramEditModal from "../../components/WorkoutProgramEditModal"
import { useWorkoutPrograms } from "../context/WorkoutProgramContext"
import { Exercise, useExercises } from "../context/ExerciseContext"
import { useAuth } from "../context/AuthContext"
import styles from "../styles/WorkoutProgramDetailScreen.styles";

// Types matching your backend models

  
  // Helper function to format difficulty
  export const formatDifficulty = (difficulty: string): string => {
    switch (difficulty) {
      case "BEGINNER":
        return "Beginner"
      case "INTERMEDIATE":
        return "Intermediate"
      case "ADVANCED":
        return "Advanced"
      default:
        return difficulty
    }
  }
  
  // Helper function to get difficulty color
  export const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty) {
      case "BEGINNER":
        return "#4CAF50"
      case "INTERMEDIATE":
        return "#FF9800"
      case "ADVANCED":
        return "#F44336"
      default:
        return "#757575"
    }
  }
  
  // Add a default export for a placeholder or main component
  const WorkoutProgramDetailScreen = () => {
    
    const isDark = useColorScheme() === "dark"
    const { workoutPrograms, loading: programsLoading, fetchUserCustomWorkoutPrograms, userCustomWorkoutPrograms } = useWorkoutPrograms();
    const { exercises, loading: exercisesLoading } = useExercises();
    const { user } = useAuth();
    const router = useRouter()
    const { id , type } = useLocalSearchParams()
    const [selectedExercise, setSelectedExercise] = useState<any>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [editModalVisible, setEditModalVisible] = useState(false)
    const [customProgram, setCustomProgram] = useState<any>(null);
    const [customLoading, setCustomLoading] = useState(false);
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [daysState, setDaysState] = useState<any[]>([]);

    // Programı bul
    const workoutData = useMemo(() => {
      if (type === "custom") {
        return userCustomWorkoutPrograms.find(p => p.id?.toString() === id);
      } else {
        return workoutPrograms.find(p => p.id.toString() === id);
      }
    }, [workoutPrograms, userCustomWorkoutPrograms, id, type]);

    // Programdaki egzersizleri bul
    const programExercises = useMemo(() => {
      if (!workoutData) return [];
      if (type === "custom") {
        // Custom programda günlerdeki exerciseId'leri topla
        const exerciseIds = (workoutData.days || [])
          .flatMap((day: any) => (day.exerciseEntries || []).map((entry: any) => entry.exerciseId));
        // Tekrarları kaldır
        const uniqueIds = Array.from(new Set(exerciseIds));
        return uniqueIds
          .map((eid: any) => exercises.find(e => String(e.id) === String(eid)))
          .filter((e: Exercise | undefined): e is Exercise => !!e && e.id !== undefined);
      } else {
        // Sadece hazır programlarda exercises alanı var
        const readyProgram = workoutData as any;
        if (Array.isArray(readyProgram.exercises) && typeof readyProgram.exercises[0] === "number") {
          return readyProgram.exercises
            .map((eid: any) => exercises.find(e => String(e.id) === String(eid)))
            .filter((e: Exercise | undefined): e is Exercise => !!e && e.id !== undefined);
        }
        return (readyProgram.exercises || []).filter((e: Exercise | undefined) => e && e.id !== undefined);
      }
    }, [workoutData, exercises, type]);

    React.useEffect(() => {
      
    }, [programExercises, workoutData, exercises]);

    React.useEffect(() => {
      if (type === "custom") {
        setCustomLoading(true);
        fetchUserCustomWorkoutPrograms(user?.id || "");
      }
    }, [type, id]);

    React.useEffect(() => {
      if (workoutData) {
        setDaysState(workoutData.days || []);
        setSelectedDay((workoutData.days && workoutData.days[0]) || null);
      }
    }, [workoutData]);

    const handleExercisePress = (exercise: any) => {
      setSelectedExercise(exercise);
      setIsModalVisible(true);
    }

    const handleCloseModal = () => {
      setIsModalVisible(false)
      setSelectedExercise(null)
    }


    const renderExerciseItem = ({ item }: { item: any }) => (
      <TouchableOpacity
        style={[styles.exerciseItem, { backgroundColor: isDark ? "#222" : "#fff" }]}
        onPress={() => handleExercisePress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.exerciseContent}>
          <View style={styles.exerciseInfo}>
            <Text style={[styles.exerciseName, { color: isDark ? "#fff" : "#000" }]}>{item.name}</Text>
          </View>
          <View style={styles.exerciseImageContainer}>
            <Image source={{ uri: item.imageUrl || item.image }} style={styles.exerciseImage} />
            <View style={styles.playIconOverlay}>
              <MaterialCommunityIcons name="play" size={20} color="#fff" />
            </View>
          </View>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? "#aaa" : "#666"} />
      </TouchableOpacity>
    )

    if (programsLoading || exercisesLoading || !workoutData) {
      return (
        <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
          <Text style={{ textAlign: "center", marginTop: 32 }}>Yükleniyor...</Text>
        </SafeAreaView>
      )
    }

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}> 
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>{workoutData?.title}</Text>
        </View>
        {/* Workout Info Card */}
        <View style={[styles.workoutInfoCard, { backgroundColor: isDark ? "#222" : "#fff" }]}> 
          <Text style={[styles.workoutDescription, { color: isDark ? "#aaa" : "#666" }]}>{workoutData?.description}</Text>
        </View>
        {/* Exercises List */}
        <View style={styles.exercisesSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Exercises</Text>
          <FlatList
            data={programExercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item, index) => item && item.id !== undefined ? String(item.id) : String(index)}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.exercisesList}
          />
        </View>
        
        {/* Exercise Detail Modal */}
        <ExerciseDetailModal
          visible={isModalVisible}
          exercise={selectedExercise}
          onClose={handleCloseModal}
          isDark={isDark}
          showActions={false}
        />

        {/* Takvime Ekle Butonu */}
        <TouchableOpacity
          style={{
            margin: 16,
            backgroundColor: "#3DCC85",
            borderRadius: 12,
            padding: 16,
            alignItems: "center"
          }}
          onPress={() => setEditModalVisible(true)}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>Takvime Ekle</Text>
        </TouchableOpacity>

        {/* Workout Program Edit Modal */}
        <WorkoutProgramEditModal
          visible={editModalVisible}
          onClose={() => setEditModalVisible(false)}
          durationWeeks={workoutData.durationWeeks || 1}
          days={workoutData.days || []}
          exercises={programExercises as any}
          userId={user?.id || "user123"}
          programId={Number(workoutData.id) || 0}
          programType={type === "custom" ? "custom" : "default"}
        />
      </SafeAreaView>
    )
  }
  
  export default WorkoutProgramDetailScreen;
  