"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React, { useEffect, useState } from "react"
import { useAuth } from "../app/context/AuthContext"
import { getAccessToken } from "../app/utils/tokenStorage"
import { useExercises } from "../app/context/ExerciseContext"

interface WeeklySummaryCardProps {
  isDark: boolean
}

interface WeeklySummaryData {
  userId: string;
  weekStartDate: string;
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number; // seconds
}

function getTodayAsStartDate() {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return now.toISOString().split('T')[0];
}

function formatDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h > 0 ? h + ":" : ""}${h > 0 ? String(m).padStart(2, "0") : m}:${String(s).padStart(2, "0")}`;
}

export default function WeeklySummaryCard({ isDark }: WeeklySummaryCardProps) {
  const { user } = useAuth();
  const { getWeeklySummary } = useExercises();
  const [data, setData] = useState<WeeklySummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (!user?.id) return;
      setLoading(true);
      setError(null);
      try {
        const weekStart = getTodayAsStartDate();
        const summary = await getWeeklySummary(user.id, weekStart);
        setData(summary);
      } catch (err: any) {
        setError(err.message || "Bilinmeyen hata");
      } finally {
        setLoading(false);
      }
    })();
  }, [user?.id]);

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
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Haftalık Özet</Text>
      </View>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}> 
            <MaterialCommunityIcons name="dumbbell" size={20} color="#3DCC85" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{data?.totalWorkouts ?? 0}</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Antrenman</Text>
          </View>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}> 
            <MaterialCommunityIcons name="fire" size={20} color="#FF6347" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{data?.totalCalories ?? 0}</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Kalori</Text>
          </View>
        </View>
        <View style={styles.summaryItem}>
          <View style={[styles.iconContainer, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}> 
            <MaterialCommunityIcons name="clock-outline" size={20} color="#4682B4" />
          </View>
          <View style={styles.summaryTextContainer}>
            <Text style={[styles.summaryValue, { color: isDark ? "#fff" : "#000" }]}>{formatDuration(data?.totalDuration ?? 0)}</Text>
            <Text style={[styles.summaryLabel, { color: isDark ? "#aaa" : "#666" }]}>Süre</Text>
          </View>
        </View>
      </View>
    </View>
  );
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
  summaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  summaryItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "48%",
    marginBottom: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  summaryLabel: {
    fontSize: 12,
  },
})
