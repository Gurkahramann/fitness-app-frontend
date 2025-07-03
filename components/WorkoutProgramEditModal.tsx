import React, { useEffect, useMemo, useState } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, useColorScheme, Image, FlatList, Alert, ScrollView } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import CalendarCard from "./CalendarCard"
import { useWorkoutPrograms } from "../app/context/WorkoutProgramContext"
import { useToast } from "../app/context/ToastContext"
import CustomDateModal from "./CustomDateModal"
import { useRouter } from "expo-router"

interface Exercise {
  id: number
  name: string
  type: string
  muscleGroup: string
  duration?: string
  calories?: string
  sets?: number
  reps?: number
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
  programId: number
  programType: 'custom' | 'default'
}

function getToday() {
  const today = new Date();
  // Use local date parts to construct a UTC date to avoid timezone-off-by-one issue
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  return todayUTC;
}

function getProgramDates(startDate: Date, durationWeeks: number, days: DayEntry[]) {
  const markedDates: { [date: string]: any } = {};
  const programStartDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));

  // dayOfWeek is 1-7 for Mon-Sun. We need to map it to getUTCDay's 0-6 for Sun-Mon.
  const workoutUTCDays = days.map(day => day.dayOfWeek === 7 ? 0 : day.dayOfWeek);

  for (let i = 0; i < durationWeeks * 7; i++) {
    const currentDate = new Date(programStartDate);
    currentDate.setUTCDate(programStartDate.getUTCDate() + i);

    if (workoutUTCDays.includes(currentDate.getUTCDay())) {
      const dateStr = currentDate.toISOString().split("T")[0];
      markedDates[dateStr] = { marked: true, dotColor: "#3DCC85" };
    }
  }
  return markedDates;
}

function getExercisesForDate(dateStr: string, startDate: Date, days: DayEntry[], exercises: Exercise[], durationWeeks: number) {
  const selectedDateUTC = new Date(dateStr + 'T00:00:00Z');
  const startDateUTC = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()));

  const diffDays = Math.round((selectedDateUTC.getTime() - startDateUTC.getTime()) / (1000 * 60 * 60 * 24));
  if (diffDays < 0 || diffDays >= durationWeeks * 7) return [];

  const dayOfWeek = selectedDateUTC.getUTCDay() === 0 ? 7 : selectedDateUTC.getUTCDay();

  const dayEntry = days.find(d => d.dayOfWeek === dayOfWeek);

  if (!dayEntry) return [];
  return dayEntry.exerciseEntries.map(entry =>
    exercises.find(ex => String(ex.id) === String(entry.exerciseId))
  ).filter(Boolean);
}

const getExerciseIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "cardio":
      return "heart-pulse"
    case "strength":
      return "dumbbell"
    default:
      return "weight-lifter"
  }
}

const getTypeColor = (type: string) => {
  switch (type?.toLowerCase()) {
    case "cardio":
      return "#FF6B6B"
    case "strength":
      return "#4ECDC4"
    default:
      return "#3DCC85"
  }
}

const WorkoutProgramEditModal: React.FC<WorkoutProgramEditModalProps> = ({
  visible,
  onClose,
  durationWeeks,
  days,
  exercises,
  userId,
  programId,
  programType
}) => {
  const isDark = useColorScheme() === "dark"
  const [markedDates, setMarkedDates] = useState<{ [date: string]: any }>({})
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [dayExercises, setDayExercises] = useState<Exercise[]>([])
  const [startDate, setStartDate] = useState<Date>(getToday())
  const [isDatePickerVisible, setDatePickerVisible] = useState(false)
  const { saveUserWorkoutProgram } = useWorkoutPrograms();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (!visible) return;
    const marked = getProgramDates(startDate, durationWeeks, days);
    setMarkedDates(marked);
    const startDateStr = startDate.toISOString().split("T")[0];
    setSelectedDate(startDateStr);
    setDayExercises(getExercisesForDate(startDateStr, startDate, days, exercises, durationWeeks).filter(Boolean) as Exercise[]);
  }, [visible, durationWeeks, days, exercises, startDate])

  useEffect(() => {
  }, [dayExercises]);

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    setDayExercises(getExercisesForDate(day.dateString, startDate, days, exercises, durationWeeks).filter(Boolean) as Exercise[]);
  }

  const handleStartDateChange = (newStartDate: Date) => {
    // CustomDateModal now sends a UTC date and prevents picking dates before today.
    // This check is a safeguard.
    const today = getToday();
    if (newStartDate.getTime() < today.getTime()) {
        showToast("Geçmiş bir tarih seçemezsiniz.", "error")
        return
    }
    setStartDate(newStartDate);
    setDatePickerVisible(false)
  }

  const showStartDatePicker = () => {
    setDatePickerVisible(true)
  }

  const handleSave = async () => {
    try {
      const startDateStr = startDate.toISOString().split("T")[0];
      const savedDays = days.map(day => ({
        dayNumber: day.dayOfWeek,
        exerciseEntries: day.exerciseEntries.map(entry => ({
          exerciseId: entry.exerciseId,
          orderIndex: entry.orderIndex
        }))
      }));

      const payload: {
        userId: string;
        startDate: string;
        savedDays: any[];
        workoutProgramId?: number;
        customWorkoutProgramId?: number;
      } = {
        userId: userId,
        startDate: startDateStr,
        savedDays: savedDays
      };

      if (programType === 'custom') {
        payload.customWorkoutProgramId = programId;
      } else {
        payload.workoutProgramId = programId;
      }

      await saveUserWorkoutProgram(payload);
      showToast("Program takvime eklendi", "success");
      onClose();
      setTimeout(() => {
        router.replace("/home-page");
      }, 600);
    } catch (error) {
      if (error instanceof Error) {
        onClose();
        setTimeout(() => {
          showToast(error.message, "error");
        }, 300);
      }
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <View style={styles.exerciseRow}>
      <View style={styles.exerciseContent}>
        <View style={[styles.exerciseIconContainer, { backgroundColor: getTypeColor(item.type) + "20" }]}>
          <MaterialCommunityIcons
            name={getExerciseIcon(item.type) as any}
            size={24}
            color={getTypeColor(item.type)}
          />
        </View>

        <View style={styles.exerciseInfo}>
          <Text style={[styles.exerciseName, { color: isDark ? "#3DCC85" : "#2E7D32" }]}>
            {item.name}
          </Text>
          <View style={styles.exerciseDetails}>
            <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) + "15" }]}>
              <Text style={[styles.typeText, { color: getTypeColor(item.type) }]}>
                {item.type}
              </Text>
            </View>
            <Text style={[styles.muscleGroupText, { color: isDark ? "#B0B0B0" : "#666666" }]}>
              {item.muscleGroup}
            </Text>
          </View>
          <Text style={[styles.exerciseStats, { color: isDark ? "#B0B0B0" : "#888888" }]}>
            {item.type?.toLowerCase() === "cardio"
              ? `Süre: ${item.duration} | Kalori: ${item.calories}`
              : `${item.sets} set x ${item.reps} reps | Kalori: ${item.calories}`}
          </Text>
        </View>
      </View>
    </View>
  )

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Gün Antrenmanı</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={28} color={isDark ? "#fff" : "#000"} />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {/* Başlangıç Tarihi Seçici */}
            <View style={styles.startDateSection}>
              <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Başlangıç Tarihi</Text>
              <TouchableOpacity
                style={[styles.startDateButton, { backgroundColor: isDark ? '#333' : '#f4f4f4' }]}
                onPress={showStartDatePicker}
              >
                <MaterialCommunityIcons name="calendar" size={20} color="#3DCC85" style={{ marginRight: 8 }} />
                <Text style={{ color: isDark ? "#fff" : "#000", fontWeight: "500" }}>
                  {formatDate(startDate)}
                </Text>
                <MaterialCommunityIcons name="chevron-down" size={20} color="#3DCC85" style={{ marginLeft: 8 }} />
              </TouchableOpacity>
            </View>
  
            {/* Bilgi Notu */}
            <View style={[styles.infoNote, { backgroundColor: isDark ? '#2a2a2a' : '#f0f8ff' }]}>
              <MaterialCommunityIcons name="information" size={16} color="#3DCC85" style={{ marginRight: 8 }} />
              <Text style={[styles.infoText, { color: isDark ? "#ccc" : "#666" }]}>
                Hazır programlarda haftanın günleri bellidir. Sadece başlangıç gününü belirleyebilirsin. Eğer özelleştirmek istiyorsan kendi antrenman programını oluşturarak yapabilirsin.
              </Text>
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
            renderItem={renderExerciseItem}
            keyExtractor={item => item && item.id !== undefined ? String(item.id) : Math.random().toString()}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 16 }}
          />
          </ScrollView>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Kaydet</Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomDateModal
        visible={isDatePickerVisible}
        onClose={() => setDatePickerVisible(false)}
        onSelectDate={handleStartDateChange}
        initialDate={startDate.toISOString().split('T')[0]}
        mode="workout"
      />
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
  startDateSection: {
    marginBottom: 12
  },
  startDateButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f4f4f4"
  },
  infoNote: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f0f8ff",
    marginBottom: 16
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: "#666"
  },
  exerciseRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(128,128,128,0.1)",
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
  saveButton: {
    backgroundColor: "#3DCC85",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8
  }
})

export default WorkoutProgramEditModal 