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
} from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { useToast, ToastProvider } from "../context/ToastContext"
import { useExercises, Exercise } from "../context/ExerciseContext"

import { LinearGradient } from "expo-linear-gradient"
import Toast from "@/components/Toast"
import ExerciseDetailModal from "../../components/ExerciseDetailModal"

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
      { id: "chest", name: "Chest", icon: "💪", color: "#FF6B6B" },
      { id: "back", name: "Back", icon: "🏋️", color: "#4ECDC4" },
      { id: "shoulders", name: "Shoulders", icon: "🤸", color: "#45B7D1" },
      { id: "legs", name: "Legs", icon: "🦵", color: "#96CEB4" },
      { id: "core", name: "Core", icon: "🎯", color: "#FECA57" },
      { id: "cardio", name: "Cardio", icon: "❤️", color: "#FF9FF3" },
      { id: "triceps", name: "Triceps", icon: "💥", color: "#54A0FF" },
      { id: "biceps", name: "Biceps", icon: "💪", color: "#5F27CD" },
      { id: "fullbody", name: "Full Body", icon: "🔥", color: "#00D2D3" },
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

  const saveProgram = () => {
    if (!programName.trim()) {
      showToast("Please enter a program name", "error")
      return
    }

    if (Object.keys(exercisesByDay).length === 0) {
      Alert.alert("Error", "Please add at least one exercise")
      return
    }

    Alert.alert("Success", "Your custom program has been created!", [{ text: "OK", onPress: () => router.back() }])
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

  if (exercisesLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading exercises...</Text>
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
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Create Program</Text>
          <TouchableOpacity onPress={saveProgram} style={styles.saveButton}>
            <LinearGradient colors={["#3DCC85", "#2ECC71"]} style={styles.saveButtonGradient}>
              <MaterialCommunityIcons name="check" size={16} color="#fff" />
              <Text style={styles.saveButtonText}>Save</Text>
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
              <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Program Information</Text>
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: isDark ? "#94A3B8" : "#64748B" }]}>Program Name</Text>
              <TextInput
                style={[
                  styles.modernInput,
                  {
                    backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                    color: isDark ? "#fff" : "#1E293B",
                    borderColor: isDark ? "#374151" : "#E2E8F0",
                  },
                ]}
                placeholder="Enter your program name"
                placeholderTextColor={isDark ? "#6B7280" : "#94A3B8"}
                value={programName}
                onChangeText={setProgramName}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={[styles.inputLabel, { color: isDark ? "#94A3B8" : "#64748B" }]}>Description</Text>
              <TextInput
                style={[
                  styles.modernTextArea,
                  {
                    backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                    color: isDark ? "#fff" : "#1E293B",
                    borderColor: isDark ? "#374151" : "#E2E8F0",
                  },
                ]}
                placeholder="Describe your program goals and structure"
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
              <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Program Schedule</Text>
            </View>

            {/* Week Selection */}
            <View style={styles.scheduleContainer}>
              <Text style={[styles.scheduleLabel, { color: isDark ? "#E2E8F0" : "#475569" }]}>Duration</Text>
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
                      {w} Week{w > 1 ? "s" : ""}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Day Selection */}
            {[...Array(weeks)].map((_, weekIdx) => (
              <View key={weekIdx} style={styles.weekContainer}>
                <View style={styles.weekHeader}>
                  <Text style={[styles.weekTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Week {weekIdx + 1}</Text>
                  <View style={[styles.weekBadge, { backgroundColor: isDark ? "#374151" : "#F1F5F9" }]}>
                    <Text style={[styles.weekBadgeText, { color: isDark ? "#9CA3AF" : "#64748B" }]}>
                      {selectedDaysPerWeek[weekIdx + 1]?.length || 0} days
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
              <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>Exercise Categories</Text>
            </View>

            <View style={styles.categoriesGrid}>
              {exerciseCategories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.modernCategoryCard,
                    {
                      backgroundColor: selectedCategory === category.id ? category.color : isDark ? "#2A2A2A" : "#F8FAFC",
                      borderColor: category.color,
                    },
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                >
                  <View
                    style={[
                      styles.categoryIconContainer,
                      { backgroundColor: selectedCategory === category.id ? "rgba(255,255,255,0.2)" : category.color },
                    ]}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                  </View>
                  <Text
                    style={[
                      styles.categoryName,
                      { color: selectedCategory === category.id ? "#fff" : isDark ? "#E2E8F0" : "#1E293B" },
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
                      },
                    ]}
                  >
                    {category.exercises.length} exercises
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Exercises List */}
          {selectedCategoryData && (
            <View style={[styles.modernSection, { backgroundColor: isDark ? "#1A1A1A" : "#FFFFFF" }]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.sectionIconContainer, { backgroundColor: selectedCategoryData.color }]}>
                  <Text style={{ fontSize: 16 }}>{selectedCategoryData.icon}</Text>
                </View>
                <Text style={[styles.modernSectionTitle, { color: isDark ? "#fff" : "#1E293B" }]}>
                  {selectedCategoryData.name} Exercises
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
                  Your Program (
                  {Object.values(exercisesByDay).reduce(
                    (acc, week) => acc + Object.values(week).reduce((a, d) => a + d.length, 0),
                    0,
                  )}{" "}
                  exercises)
                </Text>
              </View>

              {[...Array(weeks)].map(
                (_, weekIdx) =>
                  exercisesByDay[weekIdx + 1] && (
                    <View key={weekIdx} style={styles.programWeekContainer}>
                      <View style={styles.programWeekHeader}>
                        <Text style={[styles.programWeekTitle, { color: isDark ? "#fff" : "#1E293B" }]}>
                          Week {weekIdx + 1}
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
                                      {exercise.sets} sets ×{" "}
                                      {exercise.reps > 0 ? `${exercise.reps} reps` : `${exercise.duration}s`}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backButton: {
    padding: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  modernSection: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  modernSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  modernInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  modernTextArea: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 80,
    borderWidth: 1,
  },
  scheduleContainer: {
    marginBottom: 24,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  weekSelector: {
    flexDirection: "row",
    gap: 8,
  },
  weekButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  weekContainer: {
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  weekBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  weekBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modernDayButton: {
    width: "13%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 4,
  },
  dayEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  modernCategoryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 12,
    textAlign: "center",
  },
  modernExerciseItem: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  programWeekContainer: {
    marginBottom: 20,
  },
  programWeekHeader: {
    marginBottom: 12,
  },
  programWeekTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  programDayContainer: {
    marginBottom: 16,
  },
  programDayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  programDayTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  exerciseCountBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  programExerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modernModalContent: {
    width: "100%",
    maxHeight: "90%",
    borderRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  exerciseImageContainer: {
    alignItems: "center",
    padding: 20,
  },
  exerciseImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  instructionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  instructionStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  tipsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  configSection: {
    padding: 20,
    paddingTop: 0,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  configGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  configItem: {
    flex: 1,
    minWidth: "45%",
  },
  configLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  configInput: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    textAlign: "center",
  },
  scheduleSection: {
    padding: 20,
    paddingTop: 0,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  modalWeekContainer: {
    marginBottom: 16,
  },
  modalWeekTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalDaysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modalDayButton: {
    width: "13%",
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 4,
  },
  modalDayEmoji: {
    fontSize: 12,
    marginBottom: 2,
  },
  modalDayLabel: {
    fontSize: 9,
    fontWeight: "600",
  },
  modalActions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#6B7280",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  addExerciseButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  addExerciseButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  addExerciseButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
})
