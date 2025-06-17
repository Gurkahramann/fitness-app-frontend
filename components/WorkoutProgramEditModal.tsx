import React, { useEffect, useMemo, useState } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, useColorScheme, Image, FlatList } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CalendarCard from "./CalendarCard"
import { useWorkoutPrograms } from "../app/context/WorkoutProgramContext"
import { useToast } from "../app/context/ToastContext"

interface Exercise {
  id: number
  name: string
  imageUrl?: string
  image?: string
}

interface ExerciseEntry {
  orderIndex: number
  exerciseId: number
  exerciseSets?: {
    id: number
    setNo: number
    reps: number
  }[]
}

interface DayEntry {
  dayOfWeek: number // 1=Mon, 7=Sun
  exerciseEntries: ExerciseEntry[]
}

interface WorkoutProgramEditModalProps {
  visible: boolean
  onClose: () => void
  durationWeeks: number
  days: DayEntry[]
  exercises: Exercise[]
  userId: string
  workoutProgramId: number
}

function getFirstMondayFromToday() {
  const today = new Date();
  const day = today.getDay(); // 0=Sun, 1=Mon, ...
  const diff = (8 - day) % 7 || 7;
  const firstMonday = new Date(today);
  firstMonday.setDate(today.getDate() + diff);
  firstMonday.setHours(0,0,0,0);
  return firstMonday;
}

function getProgramDates(firstMonday: Date, durationWeeks: number, days: DayEntry[]) {
  const markedDates: { [date: string]: any } = {};
  for (let week = 0; week < durationWeeks; week++) {
    days.forEach(dayObj => {
      const date = new Date(firstMonday);
      const dayOffset = (dayObj.dayOfWeek + 6) % 7; // Pazartesi=0
      date.setDate(firstMonday.getDate() + week * 7 + dayOffset);
      const dateStr = date.toISOString().split("T")[0];
      markedDates[dateStr] = { marked: true, dotColor: "#3DCC85" };
    });
  }
  return markedDates;
}

function getExercisesForDate(dateStr: string, firstMonday: Date, days: DayEntry[], exercises: Exercise[], durationWeeks: number) {
  const date = new Date(dateStr);
  const monday = new Date(firstMonday);
  const diffDays = Math.floor((date.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0 || diffDays >= durationWeeks * 7) return [];
  const weekIndex = Math.floor(diffDays / 7);
  const dayOfWeek = ((date.getDay() + 6) % 7) + 1; // Pazartesi=1
  // Haftadaki o günün programı (aynı haftadaki ilk eşleşen dayOfWeek)
  let dayEntry: DayEntry | undefined;
  let count = 0;
  for (let i = 0; i < days.length; i++) {
    if (days[i].dayOfWeek === dayOfWeek) {
      if (count === weekIndex) {
        dayEntry = days[i];
        break;
      }
      count++;
    }
  }
  if (!dayEntry) return [];
  return dayEntry.exerciseEntries.map(entry =>
    exercises.find(ex => ex.id === entry.exerciseId)
  ).filter(Boolean);
}

const WorkoutProgramEditModal: React.FC<WorkoutProgramEditModalProps> = ({
  visible,
  onClose,
  durationWeeks,
  days,
  exercises,
  userId,
  workoutProgramId
}) => {
  const isDark = useColorScheme() === "dark"
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({})
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [dayExercises, setDayExercises] = useState<Exercise[]>([])
  const { saveUserWorkoutProgram } = useWorkoutPrograms();
  const { showToast } = useToast();

  useEffect(() => {
    if (!visible) return;
    const firstMonday = getFirstMondayFromToday();
    const marked = getProgramDates(firstMonday, durationWeeks, days);
    setMarkedDates(marked);
    const firstMondayStr = firstMonday.toISOString().split("T")[0];
    setSelectedDate(firstMondayStr);
    setDayExercises(getExercisesForDate(firstMondayStr, firstMonday, days, exercises, durationWeeks).filter(Boolean) as Exercise[]);
  }, [visible, durationWeeks, days, exercises])

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    const firstMonday = getFirstMondayFromToday();
    setDayExercises(getExercisesForDate(day.dateString, firstMonday, days, exercises, durationWeeks).filter(Boolean) as Exercise[]);
  }

  const handleSave = async () => {
    try {
      const startDate = selectedDate;
      
      // Debug için gelen verileri kontrol et
      console.log("Original days data:", JSON.stringify(days, null, 2));
      console.log("Original exercises data:", JSON.stringify(exercises, null, 2));

      // Exercises listesini kontrol et
      if (!exercises || !Array.isArray(exercises) || exercises.length === 0) {
        console.error("Exercises list is invalid:", exercises);
        throw new Error("Egzersiz listesi yüklenemedi");
      }

      // Exercises ID'lerini kontrol et
      const exerciseIds = exercises.map(e => e.id);
      console.log("Available exercise IDs:", exerciseIds);

      const savedDays = days.map(day => ({
        dayNumber: day.dayOfWeek,
        exerciseEntries: day.exerciseEntries.map(entry => ({
          exerciseId: entry.exerciseId,
          orderIndex: entry.orderIndex
        }))
      }));

      const finalData = {
        userId,
        workoutProgramId,
        startDate,
        savedDays
      };

      console.log("Saving workout program with data:", JSON.stringify(finalData, null, 2));

      await saveUserWorkoutProgram(userId, workoutProgramId, startDate, savedDays);
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        onClose();
        setTimeout(() => {
          showToast(error.message, "error");
        }, 300);
      }
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Gün Antrenmanı</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={28} color={isDark ? "#fff" : "#000"} />
            </TouchableOpacity>
          </View>
          {/* Takvim */}
          <CalendarCard
            onDayPress={handleDayPress}
            selectedDate={selectedDate}
            markedDates={markedDates}
          />
          {/* Hareketler */}
          <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Hareketler</Text>
          <FlatList
            data={dayExercises}
            keyExtractor={item => item.id?.toString() ?? Math.random().toString()}
            renderItem={({ item }) => (
              <View style={[styles.exerciseItem, { backgroundColor: isDark ? '#333' : '#f4f4f4' }]}>
                <MaterialCommunityIcons name="drag" size={20} color="#3DCC85" style={{ marginRight: 8 }} />
                <Image source={{ uri: item.imageUrl || item.image }} style={styles.exerciseImage} />
                <Text style={{
                  color: isDark ? "#fff" : "#000",
                  fontWeight: "bold",
                  fontSize: 16,
                  marginLeft: 12
                }}>{item.name}</Text>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    width: "92%",
    borderRadius: 18,
    padding: 20,
    maxHeight: "90%"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12
  },
  title: {
    fontSize: 20,
    fontWeight: "bold"
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    marginBottom: 8
  },
  exerciseImage: {
    width: 36,
    height: 36,
    borderRadius: 8,
    marginRight: 4
  },
  saveButton: {
    backgroundColor: "#3DCC85",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8
  }
})

export default WorkoutProgramEditModal 