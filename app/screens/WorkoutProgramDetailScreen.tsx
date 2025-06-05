import React, { useState } from "react"
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
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter, useLocalSearchParams } from "expo-router"
import ExerciseDetailModal from "../../components/ExerciseDetailModal"
import { WORKOUT_PROGRAMS, EXERCISES } from "../../constants/workoutData"
// Types matching your backend models
export interface Exercise {
    id: number
    name: string
    type: "cardio" | "strength"
    muscleGroup: string
    videoUrl: string
  }
  
  export interface ExerciseSet {
    id: number
    setNo: number
    reps?: number
    weight?: number
    rpe?: number
    durationSec?: number
  }
  
  export interface ExerciseEntry {
    id: number
    exercise: Exercise
    orderIndex: number
    exerciseSets: ExerciseSet[]
  }
  
  export interface WorkoutDay {
    id: number
    userId: string
    date: string // YYYY-MM-DD
    exerciseEntries: ExerciseEntry[]
  }
  
  export interface WorkoutProgram {
    id: number
    title: string
    slug: string
    description: string
    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED"
    durationWeeks: number
    coverImageUrl: string
    thumbnailUrl: string
    tags: string[]
    days: WorkoutDay[]
    createdBy: string
    likes: string[]
    isPublic: boolean
    exercises: Exercise[]
    createdAt: string
    updatedAt: string
  }
  
  // Mock exercises database
 
  
  // Helper function to get program by ID
  export const getProgramById = (id: string): WorkoutProgram | undefined => {
    return WORKOUT_PROGRAMS.find((program) => program.id.toString() === id)
  }
  
  // Helper function to get exercise by ID
  export const getExerciseById = (id: number): Exercise | undefined => {
    return EXERCISES.find((exercise) => exercise.id === id)
  }
  
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
    const router = useRouter()
    const { id } = useLocalSearchParams()
    const [selectedExercise, setSelectedExercise] = useState<any>(null)
    const [isModalVisible, setIsModalVisible] = useState(false)

    // Yeni veri kaynağından programı bul
    const workoutData = WORKOUT_PROGRAMS.find(p => p.id.toString() === id) || WORKOUT_PROGRAMS[0]

    // İlk günün egzersizlerini gösteriyoruz (örnek)
    const exercises = Array.from(
      new Map(
        workoutData.days
          .flatMap(day => day.exerciseEntries.map(e => e.exercise))
          .map(ex => [ex.id, ex])
      ).values()
    );
        const handleExercisePress = (exercise: any) => {
            // id ile tam mock veriyi bul
            const fullExercise = EXERCISES.find(e => e.id === exercise.id) || exercise;
            setSelectedExercise(fullExercise);
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
            <Image source={{ uri: item.videoUrl }} style={styles.exerciseImage} />
            <View style={styles.playIconOverlay}>
              <MaterialCommunityIcons name="play" size={20} color="#fff" />
            </View>
          </View>
        </View>
        <MaterialCommunityIcons name="chevron-right" size={20} color={isDark ? "#aaa" : "#666"} />
      </TouchableOpacity>
    )

    return (
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}> 
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>{workoutData.title}</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <MaterialCommunityIcons name="heart-outline" size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>
        {/* Workout Info Card */}
        <View style={[styles.workoutInfoCard, { backgroundColor: isDark ? "#222" : "#fff" }]}> 
          <Text style={[styles.workoutDescription, { color: isDark ? "#aaa" : "#666" }]}>{workoutData.description}</Text>
        </View>
        {/* Exercises List */}
        <View style={styles.exercisesSection}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Exercises</Text>
          <FlatList
            data={exercises}
            renderItem={renderExerciseItem}
            keyExtractor={(item) => item.id.toString()}
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
        />
      </SafeAreaView>
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingTop: Platform.OS === "android" ? 32 : 24,
      height: 80,
    },
    backButton: {
      padding: 8,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "600",
      flex: 1,
      textAlign: "center",
    },
    favoriteButton: {
      padding: 8,
    },
    workoutInfoCard: {
      marginHorizontal: 16,
      marginVertical: 16,
      borderRadius: 16,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    workoutDescription: {
      fontSize: 16,
      marginBottom: 16,
      lineHeight: 22,
    },
    exercisesSection: {
      flex: 1,
      paddingHorizontal: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 16,
    },
    exercisesList: {
      paddingBottom: 20,
    },
    exerciseItem: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      marginBottom: 12,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    exerciseContent: {
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    },
    exerciseInfo: {
      flex: 1,
    },
    exerciseName: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
    },
    exerciseImageContainer: {
      position: "relative",
      marginLeft: 16,
    },
    exerciseImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
    },
    playIconOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.3)",
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
  })
  
  export default WorkoutProgramDetailScreen;
  