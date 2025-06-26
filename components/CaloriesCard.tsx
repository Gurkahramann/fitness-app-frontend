import React from "react"
import { View, Text, StyleSheet, useColorScheme } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"

type CaloriesCardProps = {
  remaining: number
  goal: number
  consumed: number
}

export default function CaloriesCard({ remaining, goal, consumed }: CaloriesCardProps) {
  const isDark = useColorScheme() === "dark"
  const textColor = isDark ? "#fff" : "#000"
  const subTextColor = isDark ? "#ccc" : "#666"

  // Calculate percentage of calories remaining
  const percentRemaining = Math.round((remaining / goal) * 100)

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <Text style={[styles.title, { color: textColor }]}>Kaloriler</Text>
      <Text style={[styles.subtitle, { color: subTextColor }]}>Kalan = Hedef - Alınan</Text>

      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={140}
          width={12}
          fill={percentRemaining}
          tintColor="#3DCC85"
          backgroundColor={isDark ? "#444" : "#e0e0e0"}
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.progressContent}>
              <Text style={[styles.remainingValue, { color: textColor }]}>{remaining.toLocaleString()}</Text>
              <Text style={[styles.remainingLabel, { color: subTextColor }]}>Kalan</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>{goal.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: subTextColor }]}>Hedef</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>{consumed.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: subTextColor }]}>Alınan</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginTop: 2,
  },
  progressContainer: {
    marginVertical: 16,
    alignItems: "center",
  },
  progressContent: {
    alignItems: "center",
  },
  remainingValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  remainingLabel: {
    fontSize: 14,
    marginTop: 2,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 2,
  },
})

