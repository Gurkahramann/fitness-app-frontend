"use client"

import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"

interface AchievementsCardProps {
  isDark: boolean
}

export default function AchievementsCard({ isDark }: AchievementsCardProps) {
  // Mock achievements data
  const achievements = [
    {
      id: "1",
      title: "Mükemmel uyku",
      date: "7 May",
      icon: "moon-waning-crescent",
      color: "#FFD700",
    },
    {
      id: "2",
      title: "Harika enerji skoru",
      date: "11 Nis",
      icon: "fire",
      color: "#FF6347",
    },
  ]

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>İşaretler</Text>
        <TouchableOpacity>
          <MaterialCommunityIcons name="chevron-right" size={24} color={isDark ? "#aaa" : "#666"} />
        </TouchableOpacity>
      </View>

      <View style={styles.achievementsContainer}>
        {achievements.map((achievement) => (
          <View key={achievement.id} style={styles.achievementItem}>
            <View style={[styles.achievementIcon, { backgroundColor: isDark ? "#333" : "#f5f5f5" }]}>
              <MaterialCommunityIcons name={achievement.icon as any} size={32} color={achievement.color} />
            </View>
            <Text style={[styles.achievementTitle, { color: isDark ? "#fff" : "#000" }]}>{achievement.title}</Text>
            <Text style={[styles.achievementDate, { color: isDark ? "#aaa" : "#666" }]}>{achievement.date}</Text>
          </View>
        ))}
      </View>
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
  achievementsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  achievementItem: {
    alignItems: "center",
    width: "45%",
  },
  achievementIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
  },
})
