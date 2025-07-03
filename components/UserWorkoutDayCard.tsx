"use client"

import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useState, useEffect } from "react"
import ExerciseDetailModal from "./ExerciseDetailModal"
import React from "react"
import { useExercises } from "../app/context/ExerciseContext"
import { useAuth } from "../app/context/AuthContext"

type ExerciseEntry = {
  id: number
  exerciseId: number 

  exercise: {
    name: string
    type: string
    muscleGroup: string
    imageUrl?: string
    duration: string
    calories: string
    sets: number
    reps: number
    instructions?: string[]
    tips?: string[]
    weight?: string
  }
  orderIndex: number
  sets?: number | null
  reps?: number | null
  weight?: number | null
  duration?: string | null
}

type Props = {
  date: string
  workoutDay: {
    dayNumber: number
    exerciseEntries: ExerciseEntry[]
  } | null
  onStartWorkout: (exercise: ExerciseEntry) => void
  isAnyExerciseActive?: boolean
  onAnyExerciseActive?: (active: boolean) => void
}

export default function UserWorkoutDayCard({ date, workoutDay, onStartWorkout, isAnyExerciseActive, onAnyExerciseActive }: Props) {
  const isDark = useColorScheme() === "dark"
  const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalExercise, setModalExercise] = useState<any>(null)
  const [activeExerciseId, setActiveExerciseId] = useState<number | null>(null)
  const [timer, setTimer] = useState(0) // ms
  const [isRunning, setIsRunning] = useState(false)
  const { getWeeklyHistory, logExercise } = useExercises()
  const { user } = useAuth()
  const [completedExercises, setCompletedExercises] = useState<any[]>([])

  useEffect(() => {
    let interval: any
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 10)
      }, 10)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  useEffect(() => {
    if (onAnyExerciseActive) {
      onAnyExerciseActive(!!activeExerciseId);
    }
  }, [activeExerciseId]);

  useEffect(() => {
    (async () => {
      if (!user?.id || !date || !workoutDay) return;
      // Haftanın başı olarak bugünü gönderiyoruz, ama sadece o günün completed olanlarını filtreleyeceğiz
      const weekStart = date;
      try {
        const history = await getWeeklyHistory(user.id, weekStart);
        // Sadece bugünkü ve completed olanları al
        let completed = history.filter(item => item.date === date && item.completed);
        // --- YENİ: Sadece bugünkü programda olan egzersizleri göster (isim ile) ---
        const validExerciseNames = workoutDay.exerciseEntries.map(e => e.exercise.name);
        completed = completed.filter(item => validExerciseNames.includes(item.exerciseName));
        setCompletedExercises(completed);
      } catch (e) {
        setCompletedExercises([]);
      }
    })();
  }, [user?.id, date, workoutDay]);

  useEffect(() => {
    if (completedExercises && completedExercises.length > 0) {
     
    }
  }, [completedExercises]);

  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const centiseconds = Math.floor((ms % 1000) / 10)
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}:${centiseconds.toString().padStart(2, "0")}`
  }

  const handleStartTimer = (exercise: ExerciseEntry) => {
    setActiveExerciseId(exercise.id)
    setTimer(0)
    setIsRunning(true)
  }

  const handlePauseResume = () => setIsRunning((prev) => !prev)

  const handleFinish = async (exercise: ExerciseEntry) => {
    setIsRunning(false)
    setSelectedExerciseId(null)
    setActiveExerciseId(null)
    setTimer(0)
    if (user && user.id) {
      await logExercise({
        userId: user.id,
        exerciseId: exercise.exerciseId,
        date,
        durationMs: timer,
        completed: true,
      });
      // Kayıt sonrası tekrar güncelle
      const history = await getWeeklyHistory(user.id, date);
      const completed = history.filter(item => item.date === date && item.completed);
      setCompletedExercises(completed);
    }
  }

  if (!workoutDay) return null

  // Hareket listesini console'a yazdır
  console.log('WorkoutDay Exercise Entries:', workoutDay.exerciseEntries);

  const handleShowDetail = (exercise: ExerciseEntry) => {
    setModalExercise({
      ...exercise.exercise,
      instructions: exercise.exercise.instructions || [],
      tips: exercise.exercise.tips || [],
    })
    setModalVisible(true)
  }

  const handleSelectExercise = (uniqueKey: string) => {
    setSelectedExerciseId((prev) => (prev === uniqueKey ? null : uniqueKey))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }
    return date.toLocaleDateString("tr-TR", options)
  }

  const getExerciseIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "cardio":
        return "heart-pulse"
      case "strength":
        return "dumbbell"
      default:
        return "fitness"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "cardio":
        return "#FF6B6B"
      case "strength":
        return "#4ECDC4"
      default:
        return "#3DCC85"
    }
  }

  // Yardımcı fonksiyon: saniyeyi saat:dakika:saniye olarak formatla
  function formatSeconds(seconds: any) {
    const sec = Number(seconds);
    if (isNaN(sec) || sec < 0) return "00:00";
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h > 0 ? h + ":" : ""}${h > 0 ? String(m).padStart(2, "0") : m}:${String(s).padStart(2, "0")}`;
  }

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
        },
      ]}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.dateContainer}>
          <MaterialCommunityIcons name="calendar-today" size={20} color={isDark ? "#3DCC85" : "#2E7D32"} />
          <Text style={[styles.dateText, { color: isDark ? "#FFFFFF" : "#1A1A1A" }]}>
            {formatDate(date)} - Antrenman Programı
          </Text>
        </View>
        <View style={[styles.dayBadge, { backgroundColor: isDark ? "#3DCC85" : "#E8F5E8" }]}>
          <Text style={[styles.dayBadgeText, { color: isDark ? "#FFFFFF" : "#2E7D32" }]}>
            Gün {workoutDay.dayNumber}
          </Text>
        </View>
      </View>

      {/* Exercise List */}
      <View style={styles.exerciseList}>
        {workoutDay.exerciseEntries.map((entry, index) => {
          if (!entry.exercise) return null;
          // Benzersiz key ve seçme için hem id hem orderIndex kullan
          const uniqueKey = `${entry.id}-${entry.orderIndex}`;
          const isSelected = selectedExerciseId === uniqueKey;
          return (
            <View
              key={uniqueKey}
              style={[
                styles.exerciseItem,
                {
                  backgroundColor:
                    isSelected
                      ? isDark
                        ? "rgba(61, 204, 133, 0.1)"
                        : "rgba(61, 204, 133, 0.05)"
                      : "transparent",
                  borderRadius: isSelected ? 12 : 0,
                  borderBottomColor: isDark ? "#333333" : "#F0F0F0",
                  borderBottomWidth: index < workoutDay.exerciseEntries.length - 1 ? 1 : 0,
                },
              ]}
            >
              <View style={styles.exerciseRow}>
                <TouchableOpacity
                  style={styles.exerciseContent}
                  onPress={() => handleSelectExercise(uniqueKey)}
                  activeOpacity={0.7}
                  disabled={!!activeExerciseId && activeExerciseId !== entry.id}
                >
                  <View
                    style={[styles.exerciseIconContainer, { backgroundColor: getTypeColor(entry.exercise.type) + "20" }]}
                  >
                    <MaterialCommunityIcons
                      name={getExerciseIcon(entry.exercise.type) as any}
                      size={24}
                      color={getTypeColor(entry.exercise.type)}
                    />
                  </View>

                  <View style={styles.exerciseInfo}>
                    <Text style={[styles.exerciseName, { color: isDark ? "#3DCC85" : "#2E7D32" }]}>
                      {entry.exercise.name}
                    </Text>
                    <View style={styles.exerciseDetails}>
                      <View style={[styles.typeBadge, { backgroundColor: getTypeColor(entry.exercise.type) + "15" }]}>
                        <Text style={[styles.typeText, { color: getTypeColor(entry.exercise.type) }]}>
                          {entry.exercise.type}
                        </Text>
                      </View>
                      <Text style={[styles.muscleGroupText, { color: isDark ? "#B0B0B0" : "#666666" }]}>
                        {entry.exercise.muscleGroup}
                      </Text>
                    </View>
                    <Text style={[styles.exerciseStats, { color: isDark ? "#B0B0B0" : "#888888" }]}>
                      {entry.exercise.type.toLowerCase() === "cardio"
                        ? `Süre: ${entry.duration ?? entry.exercise.duration} | Kalori: ${entry.exercise.calories}`
                        : `${(entry.sets ?? entry.exercise.sets) || 0} set x ${(entry.reps ?? entry.exercise.reps) || 0} reps${(entry.weight ?? entry.exercise.weight) && Number(entry.weight ?? entry.exercise.weight) > 0 ? ` | Ağırlık: ${(entry.weight ?? entry.exercise.weight)} kg` : ""} | Kalori: ${entry.exercise.calories}`}
                    </Text>
                  </View>
                </TouchableOpacity>

                <View style={styles.exerciseActions}>
                  <TouchableOpacity style={styles.detailButton} onPress={() => handleShowDetail(entry)}>
                    <MaterialCommunityIcons name="eye-outline" size={20} color={isDark ? "#3DCC85" : "#007AFF"} />
                  </TouchableOpacity>
                  <View style={[styles.orderBadge, { backgroundColor: isDark ? "#333333" : "#F0F0F0" }]}>
                    <Text style={[styles.orderText, { color: isDark ? "#FFFFFF" : "#666666" }]}>#{entry.orderIndex}</Text>
                  </View>
                </View>
              </View>

              {/* Timer and Controls */}
              {selectedExerciseId === uniqueKey && (
                <View style={styles.timerContainer}>
                  {activeExerciseId === entry.id ? (
                    <View style={styles.activeTimerSection}>
                      <View style={styles.timerDisplay}>
                        <Text style={[styles.timerText, { color: isDark ? "#3DCC85" : "#007AFF" }]}>
                          {formatTime(timer)}
                        </Text>
                        <View style={[styles.timerIndicator, { backgroundColor: isRunning ? "#3DCC85" : "#FFA500" }]} />
                      </View>
                      <View style={styles.timerControls}>
                        <TouchableOpacity
                          style={[
                            styles.controlButton,
                            styles.pauseButton,
                            { backgroundColor: isRunning ? "#FF9500" : "#3DCC85" },
                          ]}
                          onPress={handlePauseResume}
                          activeOpacity={0.8}
                        >
                          <MaterialCommunityIcons name={isRunning ? "pause" : "play"} size={18} color="#FFFFFF" />
                          <Text style={styles.controlButtonText}>{isRunning ? "Duraklat" : "Devam Et"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[styles.controlButton, styles.finishButton]}
                          onPress={() => handleFinish(entry)}
                          activeOpacity={0.8}
                        >
                          <MaterialCommunityIcons name="stop" size={18} color="#FFFFFF" />
                          <Text style={styles.controlButtonText}>Bitir</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.startExerciseButton}
                      onPress={() => handleStartTimer(entry)}
                      activeOpacity={0.8}
                    >
                      <MaterialCommunityIcons name="play" size={20} color="#FFFFFF" />
                      <Text style={styles.startExerciseButtonText}>EGZERSİZE BAŞLA</Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Finished Workouts */}
      {completedExercises.length > 0 && (
        <View style={styles.finishedSection}>
          <View style={styles.finishedHeader}>
            <MaterialCommunityIcons name="check-circle" size={20} color="#3DCC85" />
            <Text style={[styles.finishedTitle, { color: isDark ? "#3DCC85" : "#2E7D32" }]}>Biten Antrenmanlar</Text>
          </View>
          <View style={styles.finishedList}>
            {completedExercises.map((ex, index) => (
              <View
                key={ex.id ? `completed-${ex.id}` : ex.exerciseId ? `completed-${ex.exerciseId}` : `${ex.exerciseName}-${index}`}
                style={[
                  styles.finishedItem,
                  {
                    backgroundColor: isDark ? "rgba(61, 204, 133, 0.1)" : "rgba(61, 204, 133, 0.05)",
                    borderLeftColor: "#3DCC85",
                  },
                ]}
              >
                <View style={styles.finishedItemContent}>
                  <MaterialCommunityIcons name="check-circle" size={16} color="#3DCC85" />
                  <Text style={[styles.finishedExerciseName, { color: isDark ? "#FFFFFF" : "#1A1A1A" }]}>
                    {ex.exerciseName}
                  </Text>
                </View>
                <View style={styles.finishedDuration}>
                  <MaterialCommunityIcons name="timer-outline" size={14} color={isDark ? "#B0B0B0" : "#666666"} />
                  <Text style={[styles.finishedTime, { color: isDark ? "#B0B0B0" : "#666666" }]}>
                    {formatSeconds(ex.durationSeconds)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Exercise Detail Modal */}
      <ExerciseDetailModal
        visible={modalVisible}
        exercise={modalExercise}
        onClose={() => setModalVisible(false)}
        isDark={isDark}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  dateText: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  dayBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dayBadgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  exerciseList: {
    marginBottom: 16,
  },
  exerciseItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginVertical: 2,
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  exerciseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
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
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginRight: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: "500",
    textTransform: "uppercase",
  },
  muscleGroupText: {
    fontSize: 13,
    fontWeight: "400",
  },
  exerciseStats: {
    fontSize: 12,
    fontStyle: "italic",
  },
  exerciseActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 122, 255, 0.1)",
  },
  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  orderText: {
    fontSize: 12,
    fontWeight: "600",
  },
  timerContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.1)",
  },
  activeTimerSection: {
    alignItems: "center",
  },
  timerDisplay: {
    alignItems: "center",
    marginBottom: 16,
  },
  timerText: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "monospace",
    letterSpacing: 2,
  },
  timerIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 4,
  },
  timerControls: {
    flexDirection: "row",
    gap: 12,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    minWidth: 120,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  pauseButton: {
    // backgroundColor set dynamically
  },
  finishButton: {
    backgroundColor: "#FF3B30",
  },
  controlButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
  startExerciseButton: {
    backgroundColor: "#007AFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  startExerciseButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  finishedSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.1)",
  },
  finishedHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  finishedTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  finishedList: {
    gap: 8,
  },
  finishedItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
  },
  finishedItemContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  finishedExerciseName: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 8,
  },
  finishedDuration: {
    flexDirection: "row",
    alignItems: "center",
  },
  finishedTime: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
    fontFamily: "monospace",
  },
})
