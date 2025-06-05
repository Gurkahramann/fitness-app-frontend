"use client"

import { useState } from "react"
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

import { EXERCISE_CATEGORIES } from "../../constants/exerciseCategories"
import type { Exercise } from "../../constants/workoutData"
import React from "react"

interface SelectedExercise extends Exercise {
  sets: number
  reps: number
  weight: number
  duration: string
}

export default function CreateProgramScreen() {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()

  const [programName, setProgramName] = useState("")
  const [programDescription, setProgramDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>([])
  const [showExerciseModal, setShowExerciseModal] = useState(false)
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null)

  const handleCategoryPress = (categoryId: string) => {
    setSelectedCategory(selectedCategory === categoryId ? null : categoryId)
  }

  const handleExercisePress = (exercise: Exercise) => {
    setCurrentExercise(exercise)
    setShowExerciseModal(true)
  }

  const addExerciseToProgram = (sets: number, reps: number, weight: number, duration: number) => {
    if (!currentExercise) return

    const newExercise: SelectedExercise = {
      ...currentExercise,
      sets,
      reps,
      weight,
      duration: duration.toString(),
    }

    setSelectedExercises((prev) => [...prev, newExercise])
    setShowExerciseModal(false)
    setCurrentExercise(null)
  }

  const removeExercise = (exerciseId: number) => {
    setSelectedExercises((prev) => prev.filter((ex) => ex.id !== exerciseId))
  }

  const saveProgram = () => {
    if (!programName.trim()) {
      Alert.alert("Error", "Please enter a program name")
      return
    }

    if (selectedExercises.length === 0) {
      Alert.alert("Error", "Please add at least one exercise")
      return
    }

    // Here you would save the program to your backend/storage
    Alert.alert("Success", "Your custom program has been created!", [{ text: "OK", onPress: () => router.back() }])
  }

  const selectedCategoryData = selectedCategory ? EXERCISE_CATEGORIES.find((cat) => cat.id === selectedCategory) : null

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: isDark ? "#222" : "#fff" }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={isDark ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>Create Your Program</Text>
        <TouchableOpacity onPress={saveProgram} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Program Info */}
        <View style={[styles.section, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Program Information</Text>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: isDark ? "#333" : "#f8f8f8",
                color: isDark ? "#fff" : "#000",
              },
            ]}
            placeholder="Program Name"
            placeholderTextColor={isDark ? "#888" : "#666"}
            value={programName}
            onChangeText={setProgramName}
          />

          <TextInput
            style={[
              styles.textArea,
              {
                backgroundColor: isDark ? "#333" : "#f8f8f8",
                color: isDark ? "#fff" : "#000",
              },
            ]}
            placeholder="Program Description"
            placeholderTextColor={isDark ? "#888" : "#666"}
            value={programDescription}
            onChangeText={setProgramDescription}
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Exercise Categories */}
        <View style={[styles.section, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Exercise Categories</Text>

          <View style={styles.categoriesGrid}>
            {EXERCISE_CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  {
                    backgroundColor: selectedCategory === category.id ? category.color : isDark ? "#333" : "#f8f8f8",
                    borderColor: category.color,
                  },
                ]}
                onPress={() => handleCategoryPress(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text
                  style={[
                    styles.categoryName,
                    {
                      color: selectedCategory === category.id ? "#fff" : isDark ? "#fff" : "#000",
                    },
                  ]}
                >
                  {category.name}
                </Text>
                <Text
                  style={[
                    styles.categoryCount,
                    {
                      color: selectedCategory === category.id ? "#fff" : isDark ? "#888" : "#666",
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
          <View style={[styles.section, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>
              {selectedCategoryData.name} Exercises
            </Text>

            {selectedCategoryData.exercises.map((exercise) => (
              <TouchableOpacity
                key={exercise.id}
                style={[styles.exerciseItem, { borderBottomColor: isDark ? "#333" : "#eee" }]}
                onPress={() => handleExercisePress(exercise)}
              >
                <View style={styles.exerciseInfo}>
                  <Text style={[styles.exerciseName, { color: isDark ? "#fff" : "#000" }]}>{exercise.name}</Text>
                  <Text style={[styles.exerciseDetails, { color: isDark ? "#888" : "#666" }]}>
                    {exercise.type} • {exercise.duration} • {exercise.calories}
                  </Text>
                </View>
                <MaterialCommunityIcons name="plus-circle" size={24} color="#3DCC85" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Selected Exercises */}
        {selectedExercises.length > 0 && (
          <View style={[styles.section, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>
              Your Program ({selectedExercises.length} exercises)
            </Text>

            {selectedExercises.map((exercise, index) => (
              <View
                key={`${exercise.id}-${index}`}
                style={[styles.selectedExerciseItem, { borderBottomColor: isDark ? "#333" : "#eee" }]}
              >
                <View style={styles.exerciseInfo}>
                  <Text style={[styles.exerciseName, { color: isDark ? "#fff" : "#000" }]}>{exercise.name}</Text>
                  <Text style={[styles.exerciseDetails, { color: isDark ? "#888" : "#666" }]}>
                    {exercise.sets} sets × {exercise.reps > 0 ? `${exercise.reps} reps` : `${exercise.duration}s`}
                    {exercise.weight > 0 && ` @ ${exercise.weight}kg`}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => removeExercise(exercise.id)}>
                  <MaterialCommunityIcons name="close-circle" size={24} color="#FF6B6B" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Exercise Configuration Modal */}
      <ExerciseConfigModal
        visible={showExerciseModal}
        exercise={currentExercise}
        onClose={() => setShowExerciseModal(false)}
        onSave={addExerciseToProgram}
        isDark={isDark}
      />
    </SafeAreaView>
  )
}

interface ExerciseConfigModalProps {
  visible: boolean
  exercise: Exercise | null
  onClose: () => void
  onSave: (sets: number, reps: number, weight: number, duration: number) => void
  isDark: boolean
}

function ExerciseConfigModal({ visible, exercise, onClose, onSave, isDark }: ExerciseConfigModalProps) {
  const [sets, setSets] = useState("3")
  const [reps, setReps] = useState("12")
  const [weight, setWeight] = useState("0")
  const [duration, setDuration] = useState("30")

  const handleSave = () => {
    onSave(
      Number.parseInt(sets) || 3,
      Number.parseInt(reps) || 0,
      Number.parseFloat(weight) || 0,
      Number.parseInt(duration) || 0,
    )
  }

  if (!exercise) return null

  const isCardio = exercise.type === "cardio"

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          {/* --- HAREKET GÖRSELİ/ANİMASYONU (GIF) --- */}
          <View style={{ alignItems: "center", marginBottom: 16 }}>
            {exercise.videoUrl ? (
              <Image
                source={{ uri: exercise.videoUrl }}
                style={{ width: 120, height: 120, borderRadius: 12 }}
                resizeMode="cover"
              />
            ) : exercise.image ? (
              <Image
                source={{ uri: exercise.image }}
                style={{ width: 120, height: 120, borderRadius: 12 }}
                resizeMode="cover"
              />
            ) : null}
          </View>
          {/* --- NASIL YAPILIR --- */}
          {exercise.instructions && exercise.instructions.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", color: isDark ? "#fff" : "#000", marginBottom: 4 }}>Nasıl Yapılır?</Text>
              {exercise.instructions.map((step, idx) => (
                <Text key={idx} style={{ color: isDark ? "#fff" : "#333", fontSize: 14, marginLeft: 8, marginBottom: 2 }}>• {step}</Text>
              ))}
            </View>
          )}

          {/* --- TİPLER --- */}
          {exercise.tips && exercise.tips.length > 0 && (
            <View style={{ marginBottom: 16 }}>
              <Text style={{ fontWeight: "bold", color: isDark ? "#fff" : "#000", marginBottom: 4 }}>İpuçları</Text>
              {exercise.tips.map((tip, idx) => (
                <Text key={idx} style={{ color: isDark ? "#fff" : "#333", fontSize: 14, marginLeft: 8, marginBottom: 2 }}>- {tip}</Text>
              ))}
            </View>
          )}

          <View style={styles.configRow}>
            <Text style={[styles.configLabel, { color: isDark ? "#fff" : "#000" }]}>Sets:</Text>
            <TextInput
              style={[
                styles.configInput,
                {
                  backgroundColor: isDark ? "#333" : "#f8f8f8",
                  color: isDark ? "#fff" : "#000",
                },
              ]}
              value={sets}
              onChangeText={setSets}
              keyboardType="numeric"
            />
          </View>

          {!isCardio ? (
            <>
              <View style={styles.configRow}>
                <Text style={[styles.configLabel, { color: isDark ? "#fff" : "#000" }]}>Reps:</Text>
                <TextInput
                  style={[
                    styles.configInput,
                    {
                      backgroundColor: isDark ? "#333" : "#f8f8f8",
                      color: isDark ? "#fff" : "#000",
                    },
                  ]}
                  value={reps}
                  onChangeText={setReps}
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.configRow}>
                <Text style={[styles.configLabel, { color: isDark ? "#fff" : "#000" }]}>Weight (kg):</Text>
                <TextInput
                  style={[
                    styles.configInput,
                    {
                      backgroundColor: isDark ? "#333" : "#f8f8f8",
                      color: isDark ? "#fff" : "#000",
                    },
                  ]}
                  value={weight}
                  onChangeText={setWeight}
                  keyboardType="numeric"
                />
              </View>
            </>
          ) : (
            <View style={styles.configRow}>
              <Text style={[styles.configLabel, { color: isDark ? "#fff" : "#000" }]}>Duration (seconds):</Text>
              <TextInput
                style={[
                  styles.configInput,
                  {
                    backgroundColor: isDark ? "#333" : "#f8f8f8",
                    color: isDark ? "#fff" : "#000",
                  },
                ]}
                value={duration}
                onChangeText={setDuration}
                keyboardType="numeric"
              />
            </View>
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleSave}>
              <Text style={styles.addButtonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#3DCC85",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  textArea: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlignVertical: "top",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  categoryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  selectedExerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    borderRadius: 12,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  configRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  configLabel: {
    fontSize: 16,
    fontWeight: "600",
    width: 120,
  },
  configInput: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  modalButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  addButton: {
    flex: 1,
    backgroundColor: "#3DCC85",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
})
