"use client"

import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { useAuth } from "../app/context/AuthContext"
import { useExercises, WeeklyWorkoutHistoryItem } from "../app/context/ExerciseContext"

interface TrainingHistoryCardProps {
  isDark: boolean
}

export default function TrainingHistoryCard({ isDark }: TrainingHistoryCardProps) {
  const { user } = useAuth();
  const { getWeeklyHistory } = useExercises();
  const [history, setHistory] = useState<WeeklyWorkoutHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  function getTodayAsStartDate() {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now.toISOString().split('T')[0];
  }

  useEffect(() => {
    (async () => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const weekStart = getTodayAsStartDate();
        const data = await getWeeklyHistory(user.id, weekStart);
        setHistory(data);
      } catch (err: any) {
        setError(err.message || "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

  // Get icon based on training type
  const getTrainingIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "cardio":
        return "run"
      case "strength":
        return "weight-lifter"
      case "flexibility":
        return "yoga"
      default:
        return "dumbbell"
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}> 
        <Text style={{ color: isDark ? "#fff" : "#000", textAlign: "center" }}>Yükleniyor...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}> 
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}> 
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Antrenman Geçmişi</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={24} color={isDark ? "#aaa" : "#666"} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => (
          <View style={[styles.trainingItem, { borderBottomColor: isDark ? "#333" : "#eee" }]}> 
            <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}> 
              <MaterialCommunityIcons name={getTrainingIcon(item.exerciseType)} size={24} color="#3DCC85" />
            </View>
            <View style={styles.trainingDetails}>
              <View style={styles.trainingHeader}>
                <Text style={[styles.trainingName, { color: isDark ? "#fff" : "#000" }]}>{item.exerciseName}</Text>
                <Text style={[styles.trainingDate, { color: isDark ? "#aaa" : "#666" }]}>{item.date}</Text>
              </View>
              <View style={styles.trainingStats}>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="clock-outline" size={14} color={isDark ? "#aaa" : "#666"} />
                  <Text style={[styles.statText, { color: isDark ? "#aaa" : "#666" }]}>{item.durationMinutes} dk</Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialCommunityIcons name="fire" size={14} color={isDark ? "#aaa" : "#666"} />
                  <Text style={[styles.statText, { color: isDark ? "#aaa" : "#666" }]}>{item.calories} kcal</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        scrollEnabled={false}
      />

      <TouchableOpacity style={[styles.viewAllButton, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}> 
        <Text style={[styles.viewAllText, { color: isDark ? "#fff" : "#000" }]}>Tümünü Görüntüle</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  trainingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  trainingDetails: {
    flex: 1,
  },
  trainingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  trainingName: {
    fontSize: 16,
    fontWeight: "500",
  },
  trainingDate: {
    fontSize: 12,
  },
  trainingStats: {
    flexDirection: "row",
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    marginLeft: 4,
  },
  viewAllButton: {
    marginTop: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
})
