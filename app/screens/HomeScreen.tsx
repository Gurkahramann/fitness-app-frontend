"use client"

import { useState } from "react"
import { SafeAreaView, ScrollView, StyleSheet, useColorScheme } from "react-native"
import type { DateData } from "react-native-calendars"

// Import components
import Header from "../../components/Header"
import WorkoutProgramsCard from "../../components/WorkoutProgramsCard"
import CalendarCard from "../../components/CalendarCard"
import CaloriesCard from "../../components/CaloriesCard"

// Import data
import { WORKOUT_PROGRAMS } from "../../constants/workoutData"

export default function HomeScreen() {
  const isDark = useColorScheme() === "dark"
  const [selectedDate, setSelectedDate] = useState("")

  // Event handlers
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString)
    console.log("Selected day:", day.dateString)
  }

  const handleProgramPress = (programId: string) => {
    console.log("Program selected:", programId)
    // Navigate to program details or start workout
  }

  const handleViewAllPress = () => {
    console.log("View all programs pressed")
    // Navigate to all programs screen
  }

  const handleMenuPress = () => {
    console.log("Menu button pressed")
    // Open menu/drawer
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f5f5f5" }]}>
      <Header
        userName="MORGAN MAXWELL"
        profileImageUrl="https://via.placeholder.com/50"
        onMenuPress={handleMenuPress}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <WorkoutProgramsCard
          programs={WORKOUT_PROGRAMS}
          onProgramPress={handleProgramPress}
          onViewAllPress={handleViewAllPress}
        />

        <CalendarCard selectedDate={selectedDate} onDayPress={handleDayPress} />

        <CaloriesCard remaining={1000} goal={2000} consumed={1000} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 8,
    paddingBottom: 24,
  },
})

