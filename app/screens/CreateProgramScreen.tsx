"use client"

import { useState, useMemo } from "react"
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  TextInput,
  Alert,
  Modal,
  Image,
  FlatList,
  Dimensions,
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { useToast, ToastProvider } from "../context/ToastContext"
import { useExercises, Exercise } from "../context/ExerciseContext"
import { useWorkoutPrograms } from "../context/WorkoutProgramContext"
import { useAuth } from "../context/AuthContext"

import { LinearGradient } from "expo-linear-gradient"
import Toast from "@/components/Toast"
import ExerciseDetailModal from "../../components/ExerciseDetailModal"
import styles from "../styles/CreateProgramScreen.styles";

interface SelectedExercise extends Exercise {
  sets: number
  reps: number
  weight: number
  duration: string
}

export const DAYS = [
  { label: "Pzt", fullName: "Pazartesi", value: 1},
  { label: "Sal", fullName: "Salı", value: 2},
  { label: "Çar", fullName: "Çarşamba", value: 3},
  { label: "Per", fullName: "Perşembe", value: 4},
  { label: "Cum", fullName: "Cuma", value: 5},
  { label: "Cmt", fullName: "Cumartesi", value: 6},
  { label: "Paz", fullName: "Pazar", value: 0},
]

export default function CreateProgramScreen() {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const { showToast } = useToast()
  const { exercises, loading: exercisesLoading } = useExercises()
  const { createCustomWorkoutProgram } = useWorkoutPrograms()
  const { user } = useAuth()

  const [programName, setProgramName] = useState("")
  const [programDescription, setProgramDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([])
  const [showExerciseModal, setShowExerciseModal] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)
  const [weeks, setWeeks] = useState(1)
  const [selectedDaysPerWeek, setSelectedDaysPerWeek] = useState<{ [week: number]: number[] }>({ 1: [] })
  const [exercisesByDay, setExercisesByDay] = useState<{ [week: number]: { [day: number]: SelectedExercise[] } }>({})
  // Dynamically build categories from backend exercises
  const exerciseCategories = useMemo(() => {
    const categoriesMap: { [key: string]: { id: string, name: string, icon: string, color: string, exercises: typeof exercises } } = {}
    const categoryMeta = [
      { id: "chest", name: "Göğüs", icon: "💪", color: "#FF6B6B" },
      { id: "back", name: "Sırt", icon: "🏋️", color: "#4ECDC4" },
      { id: "shoulders", name: "Omuz", icon: "🤸", color: "#45B7D1" },
      { id: "legs", name: "Bacak", icon: "🦵", color: "#96CEB4" },
      { id: "core", name: "Karın", icon: "🎯", color: "#FECA57" },
      { id: "cardio", name: "Kardiyo", icon: "❤️", color: "#FF9FF3" },
      { id: "triceps", name: "Triceps", icon: "💥", color: "#54A0FF" },
      { id: "biceps", name: "Biceps", icon: "💪", color: "#5F27CD" },
      { id: "fullbody", name: "Tüm Vücut", icon: "🔥", color: "#00D2D3" },
    ]
    categoryMeta.forEach(meta => {
      categoriesMap[meta.id] = { ...meta, exercises: [] }
    })
    exercises.forEach(ex => {
      if (ex.muscleGroup === "Chest") categoriesMap["chest"].exercises.push(ex)
      if (["Back", "Upper Back", "Back/Biceps", "Back/Glutes", "Back/Core"].includes(ex.muscleGroup)) categoriesMap["back"].exercises.push(ex)
      if (ex.muscleGroup === "Shoulders") categoriesMap["shoulders"].exercises.push(ex)
      if (["Legs", "Quads", "Hamstrings", "Hamstrings/Glutes", "Glutes", "Calves"].includes(ex.muscleGroup)) categoriesMap["legs"].exercises.push(ex)
      if (ex.muscleGroup === "Core") categoriesMap["core"].exercises.push(ex)
      if (ex.type === "cardio" || ["Cardiovascular", "Cardio"].includes(ex.muscleGroup)) categoriesMap["cardio"].exercises.push(ex)
      if (["Triceps", "Chest/Triceps"].includes(ex.muscleGroup)) categoriesMap["triceps"].exercises.push(ex)
      if (ex.muscleGroup === "Biceps") categoriesMap["biceps"].exercises.push(ex)
      if (ex.muscleGroup === "Full Body") categoriesMap["fullbody"].exercises.push(ex)
    })
    return Object.values(categoriesMap)
  }, [exercises])

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  const handleExercisePress = (exercise: Exercise) => {
    setCurrentExercise(exercise)
    setShowExerciseModal(true)
  }

  const addExerciseToProgram = (
    sets: number,
    reps: number,
    weight: number,
    duration: number,
    selectedSchedule: { [week: number]: number[] },
  ) => {
    if (!currentExercise) return

    const newExercise: SelectedExercise = {
      ...currentExercise,
      sets,
      reps,
      weight,
      duration: duration.toString(),
    }

    setExercisesByDay((prev) => {
      const updated = { ...prev }
      Object.entries(selectedSchedule).forEach(([weekStr, days]) => {
        const week = Number(weekStr)
        if (!updated[week]) updated[week] = {}
        days.forEach((day) => {
          if (!updated[week][day]) updated[week][day] = []
          updated[week][day] = [...updated[week][day], newExercise]
        })
      })
      return updated
    })
    setShowExerciseModal(false)
    setCurrentExercise(null)
  }

  const removeExercise = (week: number, day: number, exerciseIdx: number) => {
    setExercisesByDay((prev) => {
      const updated = { ...prev }
      if (updated[week] && updated[week][day]) {
        updated[week][day] = updated[week][day].filter((_, idx) => idx !== exerciseIdx)
        if (updated[week][day].length === 0) delete updated[week][day]
        if (Object.keys(updated[week]).length === 0) delete updated[week]
      }
      return updated
    })
  }

  const saveProgram = async () => {
    if (!programName.trim()) {
      showToast("Please enter a program name", "error")
      return
    }
    if (Object.keys(exercisesByDay).length === 0) {
      Alert.alert("Error", "Please add at least one exercise")
      return
    }
    if (!user?.id) {
      showToast("Kullanıcı bulunamadı", "error");
      return;
    }
    // CustomWorkoutProgram payload
    const days: any[] = [];
    for (let week = 1; week <= weeks; week++) {
      if (!exercisesByDay[week]) continue;
      for (const dayNum of Object.keys(exercisesByDay[week])) {
        const dayExercises = exercisesByDay[week][Number(dayNum)];
        if (!dayExercises || dayExercises.length === 0) continue;
        days.push({
          dayOfWeek: Number(dayNum),
          exerciseEntries: dayExercises.map((ex, idx) => ({
            orderIndex: idx + 1,
            exerciseId: ex.id,
            sets: ex.sets,
            reps: ex.reps,
            weight: ex.weight,
            duration: ex.duration
          }))
        });
      }
    }
    const payload = {
      userId: user.id,
      title: programName,
      description: programDescription,
      durationWeeks: weeks,
      tags: [], // İstersen tag ekleyebilirsin
      coverImageUrl: "https://storage.googleapis.com/fitness-app-photos/UserCover.jpg", // İstersen ekleyebilirsin
      days
    };
    try {
      const response = await createCustomWorkoutProgram(payload);
      showToast("Program başarıyla kaydedildi!", "success");
      router.back();
    } catch (err: any) {
      console.error("[CreateProgramScreen] Error while saving program:", err);
      showToast(err.message || "Program kaydedilemedi", "error");
    }
  }

  const selectedCategoryData = selectedCategory ? exerciseCategories.find((cat) => cat.id === selectedCategory) : null

  const handleWeekChange = (newWeeks: number) => {
    setWeeks(newWeeks)
    setSelectedDaysPerWeek((prev) => {
      const updated = { ...prev }
      for (let i = 1; i <= newWeeks; i++) {
        if (!updated[i]) updated[i] = []
      }
      Object.keys(updated).forEach((key) => {
        if (Number.parseInt(key) > newWeeks) delete updated[Number.parseInt(key)]
      })
      return updated
    })
  }

  const handleDayToggle = (week: number, day: number) => {
    setSelectedDaysPerWeek((prev) => {
      const weekDays = prev[week] || []
      const isSelected = weekDays.includes(day)
      const updatedWeekDays = isSelected ? weekDays.filter((d) => d !== day) : [...weekDays, day]
      return { ...prev, [week]: updatedWeekDays }
    })
  }

  const handleNoDaySelected = () => {
    setTimeout(() => {
      showToast("Antrenman yapacağınız günleri seçiniz", "error")
    }, 300)
  }

  const CARD_MARGIN = 10;
  const numColumns = 2;
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 80 - CARD_MARGIN * (numColumns + 1)) / numColumns;
  const cardHeight = 110; // Kart yüksekliğini küçülttüm

  if (exercisesLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Egzersizler yükleniyor...</Text>
      </View>
    )
  }

  return (
    <ToastProvider suppressGlobalToast={showExerciseModal}>
      <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#0A0A0A" : "#F8FAFC" }]}>
        {/* Modern Header */}
        <LinearGradient colors={isDark ? ["#1A1A1A", "#2A2A2A"] : ["#FFFFFF", "#F1F5F9"]} style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#F1F5F9" }]}>
              <MaterialCommunityIcons name="arrow-left" size={20} color={isDark ? "#fff" : "#334155"} />
            </View>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Program Oluştur</Text>
          <TouchableOpacity onPress={saveProgram} style={styles.saveButton}>
            <LinearGradient colors={["#3DCC85", "#2ECC71"]} style={styles.saveButtonGradient}>
              <MaterialCommunityIcons name="check" size={16} color="#fff" />
              <Text style={styles.saveButtonText}>Kaydet</Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Program Info Section */}
          <View style={[styles.modernSection, { backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF" }]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: "#3DCC85" }]}>
                <MaterialCommunityIcons name="information" size={20} color="#fff" />
              </View>
              <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Program Bilgileri</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: isDark ? "#94A3B8" : "#64748B" }]}>Program Adı</Text>
              <TextInput
                style={[
                  styles.modernInput,
                  {
                    backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                    color: isDark ? "#fff" : "#1E293B",
                    borderColor: isDark ? "#374151" : "#E2E8F0",
                  },
                ]}
                placeholder="Program adınızı girin"
                placeholderTextColor={isDark ? "#6B7280" : "#94A3B8"}
                value={programName}
                onChangeText={setProgramName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: isDark ? "#94A3B8" : "#64748B" }]}>Açıklama</Text>
              <TextInput
                style={[
                  styles.modernTextArea,
                  {
                    backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                    color: isDark ? "#fff" : "#1E293B",
                    borderColor: isDark ? "#374151" : "#E2E8F0",
                  },
                ]}
                placeholder="Program hedeflerinizi ve yapısını açıklayın"
                placeholderTextColor={isDark ? "#6B7280" : "#94A3B8"}
                value={programDescription}
                onChangeText={setProgramDescription}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Schedule Section */}
          <View style={[styles.modernSection, { backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF" }]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: "#8B5CF6" }]}>
                <MaterialCommunityIcons name="calendar-clock" size={20} color="#fff" />
              </View>
              <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Program Takvimi</Text>
            </View>

            {/* Week Selection */}
            <View style={styles.scheduleContainer}>
              <Text style={[styles.scheduleLabel, { color: isDark ? "#E2E8F0" : "#475569" }]}>Süre</Text>
              <View style={styles.weekSelector}>
              {[1, 2, 3, 4].map((w) => (
                  <TouchableOpacity
                    key={w}
                    style={[
                      styles.weekButton,
                      {
                        backgroundColor: weeks === w ? "#3DCC85" : isDark ? "#2A2A2A" : "#F1F5F9",
                        borderColor: weeks === w ? "#3DCC85" : isDark ? "#374151" : "#E2E8F0",
                      },
                    ]}
                    onPress={() => handleWeekChange(w)}
                  >
                    <Text
                      style={[styles.weekButtonText, { color: weeks === w ? "#fff" : isDark ? "#E2E8F0" : "#64748B" }]}
                    >
                      {w}{'\n'}Hafta
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Day Selection */}
            {[...Array(weeks)].map((_, weekIdx) => (
              <View key={weekIdx} style={styles.weekContainer}>
                <View style={styles.weekHeader}>
                  <Text style={[styles.weekTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Hafta {weekIdx + 1}</Text>
                  <View style={[styles.weekBadge, { backgroundColor: isDark ? "#374151" : "#F1F5F9" }]}>
                    <Text style={[styles.weekBadgeText, { color: isDark ? "#9CA3AF" : "#64748B" }]}>
                      {selectedDaysPerWeek[weekIdx + 1]?.length || 0} gün
                    </Text>
                  </View>
                </View>

                <View style={styles.daysGrid}>
                  {DAYS.map((day) => {
                    const isSelected = selectedDaysPerWeek[weekIdx + 1]?.includes(day.value)
                    return (
                      <TouchableOpacity
                        key={day.value}
                        style={[
                          styles.modernDayButton,
                          {
                            backgroundColor: isSelected ? "#3DCC85" : isDark ? "#2A2A2A" : "#F8FAFC",
                            borderColor: isSelected ? "#3DCC85" : isDark ? "#374151" : "#E2E8F0",
                          },
                        ]}
                        onPress={() => handleDayToggle(weekIdx + 1, day.value)}
                      >
                        <Text style={[styles.dayLabel, { color: isSelected ? "#fff" : isDark ? "#E2E8F0" : "#64748B" }]}>
                          {day.label}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
            ))}
          </View>

          {/* Exercise Categories */}
          <View style={[styles.modernSection, { backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF" }]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.sectionIconContainer, { backgroundColor: "#F59E0B" }]}>
                <MaterialCommunityIcons name="dumbbell" size={20} color="#fff" />
              </View>
              <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Egzersiz Kategorileri</Text>
            </View>
            <FlatList
              data={exerciseCategories}
              keyExtractor={item => item.id}
              numColumns={numColumns}
              scrollEnabled={false}
              contentContainerStyle={{ paddingHorizontal: CARD_MARGIN / 2 }}
              renderItem={({ item: category }) => (
                <TouchableOpacity
                  style={[
                    styles.modernCategoryCard,
                    {
                      width: cardWidth,
                      height: cardHeight,
                      backgroundColor: selectedCategory === category.id ? category.color : isDark ? "#2A2A2A" : "#F8FAFC",
                      borderColor: category.color,
                      margin: CARD_MARGIN / 2,
                      padding: 10,
                    },
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View
                    style={[
                      styles.categoryIconContainer,
                      { backgroundColor: selectedCategory === category.id ? "rgba(255,255,255,0.2)" : category.color, width: 36, height: 36, borderRadius: 18, marginBottom: 8 },
                    ]}
                  >
                    <Text style={[styles.categoryIcon, { fontSize: 18 }]}>{category.icon}</Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryName,
                      { color: selectedCategory === category.id ? "#fff" : isDark ? "#E2E8F0" : "#1E293B", fontSize: 13 },
                    ]}
                  >
                    {category.name}
                  </Text>
                  <Text
                    style={[
                      styles.categoryCount,
                      {
                        color:
                          selectedCategory === category.id ? "rgba(255,255,255,0.8)" : isDark ? "#9CA3AF" : "#64748B",
                        fontSize: 11,
                      },
                    ]}
                  >
                    {category.exercises.length} egzersiz
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Exercises List */}
          {selectedCategoryData && (
            <View style={[styles.modernSection, { backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF" }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconContainer, { backgroundColor: selectedCategoryData.color }]}>
                  <Text style={{ fontSize: 16 }}>{selectedCategoryData.icon}</Text>
                </View>
                <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>
                  {selectedCategoryData.name} Egzersizleri
                </Text>
              </View>

              {selectedCategoryData.exercises.map((exercise) => (
                <TouchableOpacity
                  key={exercise.id}
                  style={[styles.modernExerciseItem, { backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC" }]}
                  onPress={() => handleExercisePress(exercise)}
                >
                  <View style={styles.exerciseContent}>
                    <View style={styles.exerciseInfo}>
                      <Text style={[styles.exerciseName, { color: isDark ? "#fff" : "#1E293B" }]}>{exercise.name}</Text>
                      <Text style={[styles.exerciseDetails, { color: isDark ? "#9CA3AF" : "#64748B" }]}>
                        {exercise.type} • {exercise.duration} • {exercise.calories}
                      </Text>
                    </View>
                    <View style={[styles.addButton, { backgroundColor: "#3DCC85" }]}>
                      <MaterialCommunityIcons name="plus" size={20} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Program Overview */}
          {Object.keys(exercisesByDay).length > 0 && (
            <View style={[styles.modernSection, { backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF" }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconContainer, { backgroundColor: "#EF4444" }]}>
                  <MaterialCommunityIcons name="format-list-bulleted" size={20} color="#fff" />
                </View>
                <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>
                  Programınız (
                  {Object.values(exercisesByDay).reduce(
                    (acc, week) => acc + Object.values(week).reduce((a, d) => a + d.length, 0),
                    0,
                  )} egzersiz)
                </Text>
              </View>

              {[...Array(weeks)].map(
                (_, weekIdx) =>
                  exercisesByDay[weekIdx + 1] && (
                    <View key={weekIdx} style={styles.programWeekContainer}>
                      <View style={styles.programWeekHeader}>
                        <Text style={[styles.programWeekTitle, { color: isDark ? "#fff" : "#1E293B" }]}>
                          {weekIdx + 1}. Hafta
                        </Text>
                      </View>

                      {DAYS.filter((day) => selectedDaysPerWeek[weekIdx + 1]?.includes(day.value)).map(
                        (day) =>
                          exercisesByDay[weekIdx + 1][day.value] && (
                            <View key={day.value} style={styles.programDayContainer}>
                              <View style={styles.programDayHeader}>
                                <Text style={[styles.programDayTitle, { color: "#3DCC85" }]}>{day.fullName}</Text>
                                <View style={[styles.exerciseCountBadge, { backgroundColor: "#3DCC85" }]}>
                                  <Text style={styles.exerciseCountText}>
                                    {exercisesByDay[weekIdx + 1][day.value].length}
                                  </Text>
                                </View>
                              </View>

                              {exercisesByDay[weekIdx + 1][day.value].map((exercise, idx) => (
                                <View
                                  key={`${exercise.id}-${idx}`}
                                  style={[
                                    styles.programExerciseItem,
                                    { backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC" },
                                  ]}
                                >
                                  <View style={styles.exerciseInfo}>
                                    <Text style={[styles.exerciseName, { color: isDark ? "#fff" : "#1E293B" }]}>
                                      {exercise.name}
                                    </Text>
                                    <Text style={[styles.exerciseDetails, { color: isDark ? "#9CA3AF" : "#64748B" }]}>
                                      {exercise.sets} set × {exercise.reps > 0 ? `${exercise.reps} tekrar` : `${exercise.duration}s`}
                                      {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                                    </Text>
                                  </View>
                                  <TouchableOpacity
                                    onPress={() => removeExercise(weekIdx + 1, day.value, idx)}
                                    style={[styles.removeButton, { backgroundColor: "#EF4444" }]}
                                  >
                                    <MaterialCommunityIcons name="close" size={16} color="#fff" />
                                  </TouchableOpacity>
                                </View>
                              ))}
                            </View>
                          ),
                      )}
                    </View>
                  ),
              )}
            </View>
          )}
        </ScrollView>

        {/* Exercise Configuration Modal */}
        <ExerciseDetailModal
          visible={showExerciseModal}
          exercise={currentExercise}
          onClose={() => setShowExerciseModal(false)}
          isDark={isDark}
          showConfig={true}
          onAddToWorkout={({ sets, reps, weight, duration, selectedSchedule, error }) => {
            if (error) {
              showToast(error, "error")
              return
            }
            addExerciseToProgram(
              Number(sets) || 3,
              Number(reps) || 0,
              Number(weight) || 0,
              Number(duration) || 0,
              selectedSchedule || {}
            )
          }}
          selectedDaysPerWeek={selectedDaysPerWeek}
          weeks={weeks}
          onNoDaySelected={handleNoDaySelected}
        />
      </SafeAreaView>
    </ToastProvider>
  )
}
