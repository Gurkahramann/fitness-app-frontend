import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"

import React,{useState} from "react"
import ExerciseDetailModal from "./ExerciseDetailModal"
type ExerciseEntry = {
  id: number
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
  }
  orderIndex: number
}

type Props = {
  date: string
  workoutDay: {
    dayNumber: number
    exerciseEntries: ExerciseEntry[]
  } | null
  onStartWorkout: (exercise: ExerciseEntry) => void
}

export default function UserWorkoutDayCard({ date, workoutDay, onStartWorkout }: Props) {
  const isDark = useColorScheme() === "dark"
  const [selectedExerciseId, setSelectedExerciseId] = useState<number | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalExercise, setModalExercise] = useState<any>(null)
  const joinStats = (arr: string[], unit: string) => {
    // Tekrarlı olanları birleştir, farklıysa + ile ayır
    const unique = Array.from(new Set(arr));
    return unique.join(' + ');
  };
  if (!workoutDay) return null
  const handleStartExercise = (exercise: ExerciseEntry) => {
    setSelectedExerciseId(exercise.id)
    // Burada istersen egzersiz başlatma logic'i ekleyebilirsin
    // onStartWorkout(exercise) gibi
  }
  const handleShowDetail = (exercise: ExerciseEntry) => {
    console.log(exercise)
    setModalExercise({
      ...exercise.exercise,
      instructions: exercise.exercise.instructions || [],
      tips: exercise.exercise.tips || [],
    });
    setModalVisible(true);
  };
  const handleSelectExercise = (id: number) => {
    setSelectedExerciseId(prev => (prev === id ? null : id));
  };
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

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
          //shadowColor: isDark ? "#000" : "#000",
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
        {workoutDay.exerciseEntries.map((entry, index) => (
          <View
            key={entry.id}
            style={[
              styles.exerciseItem,
              {
                borderBottomColor: isDark ? "#333333" : "#F0F0F0",
                borderBottomWidth: index < workoutDay.exerciseEntries.length - 1 ? 1 : 0,
                flexDirection: "column"
              },
            ]}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
                onPress={() => handleSelectExercise(entry.id)}
                activeOpacity={0.7}
              >
                <View style={[styles.exerciseIconContainer, { backgroundColor: getTypeColor(entry.exercise.type) + "20" }]}> 
                  <MaterialCommunityIcons
                    name={getExerciseIcon(entry.exercise.type) as any}
                    size={24}
                    color={getTypeColor(entry.exercise.type)}
                  />
                </View>
                <View style={styles.exerciseInfo}>
                  <Text style={[styles.exerciseName, { color: isDark ? "#3DCC85" : "#2E7D32" }]}> {entry.exercise.name} </Text>
                  <View style={styles.exerciseDetails}>
                    <View style={[styles.typeBadge, { backgroundColor: getTypeColor(entry.exercise.type) + "15" }]}> 
                      <Text style={[styles.typeText, { color: getTypeColor(entry.exercise.type) }]}> {entry.exercise.type} </Text>
                    </View>
                    <Text style={[styles.muscleGroupText, { color: isDark ? "#B0B0B0" : "#666666" }]}> {entry.exercise.muscleGroup} </Text>
                  </View>
                </View>
              </TouchableOpacity>
              {/* Görüntüle butonu */}
              <TouchableOpacity
                style={{ marginLeft: 8, padding: 4 }}
                onPress={() => handleShowDetail(entry)}
              >
                <MaterialCommunityIcons name="eye-outline" size={22} color={isDark ? "#3DCC85" : "#007AFF"} />
              </TouchableOpacity>
              <View style={styles.orderBadge}>
                <Text style={[styles.orderText, { color: isDark ? "#888888" : "#999999" }]}>#{entry.orderIndex}</Text>
              </View>
            </View>
            {/* Sadece seçili egzersizin altında buton göster, yeni satır olarak */}
            {selectedExerciseId === entry.id && (
              <View style={{ width: '100%', marginTop: 8 }}>
                <TouchableOpacity
                  style={styles.startButton}
                  onPress={() => onStartWorkout(entry)}
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons name="play" size={20} color="#FFFFFF" />
                  <Text style={styles.startButtonText}>EGZERSİZE BAŞLA</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </View>
        
      {/* Stats */}
      <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <MaterialCommunityIcons name="format-list-numbered" size={16} color={isDark ? "#888888" : "#666666"} />
        <Text style={[styles.statText, { color: isDark ? "#888888" : "#666666" }]}>
          {workoutDay.exerciseEntries.length} Egzersiz
        </Text>
      </View>
      <View style={styles.statItem}>
        <MaterialCommunityIcons name="clock-outline" size={16} color={isDark ? "#888888" : "#666666"} />
        <Text style={[styles.statText, { color: isDark ? "#888888" : "#666666" }]}>
          {joinStats(workoutDay.exerciseEntries.map(e => e.exercise.duration), 'dk')}
        </Text>
      </View>
      <View style={styles.statItem}>
        <MaterialCommunityIcons name="fire" size={16} color={isDark ? "#888888" : "#666666"} />
        <Text style={[styles.statText, { color: isDark ? "#888888" : "#666666" }]}>
          {joinStats(workoutDay.exerciseEntries.map(e => e.exercise.calories), 'cal')}
        </Text>
      </View>
    </View>

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
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
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
  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
  orderText: {
    fontSize: 12,
    fontWeight: "600",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.1)",
    marginBottom: 16,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    fontSize: 13,
    fontWeight: "500",
    marginLeft: 4,
  },
  startButton: {
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
  startButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    letterSpacing: 0.5,
  },
})
