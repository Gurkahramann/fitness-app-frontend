"use client"

import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from "react-native"
import { Calendar, type DateData } from "react-native-calendars"

type CalendarCardProps = {
  onDayPress: (day: DateData) => void
  selectedDate: string
}

export default function CalendarCard({ onDayPress, selectedDate }: CalendarCardProps) {
  const isDark = useColorScheme() === "dark"
  const [expanded, setExpanded] = useState(false)

  const backgroundColor = isDark ? "#222" : "#fff"
  const textColor = isDark ? "#fff" : "#000"
  const subTextColor = isDark ? "#ccc" : "#666"

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.title, { color: textColor }]}>Calendar</Text>
      <Text style={[styles.hint, { color: subTextColor }]}>
        {expanded ? "Tap to collapse calendar" : "Tap to expand calendar"}
      </Text>

      <TouchableOpacity activeOpacity={1} onPress={() => setExpanded(!expanded)} style={styles.calendarWrapper}>
      <Calendar
        key={isDark ? "dark" : "light"} // 👈 Zorunlu yeniden render için
        style={{
          height: expanded ? 350 : 220,
          borderRadius: 12,
        }}
        onDayPress={onDayPress}
        theme={{
          backgroundColor,
          calendarBackground: backgroundColor,
          dayTextColor: textColor,
          monthTextColor: textColor,
          arrowColor: "#3DCC85",
          todayTextColor: "#00adf7",
          textSectionTitleColor: isDark ? "#999" : "#888",
          selectedDayBackgroundColor: "#3DCC85",
          selectedDayTextColor: "#FFF",
          textDisabledColor: isDark ? "#444" : "#ccc",
        }}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#3DCC85",
          },
        }}
      />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    marginBottom: 8,
  },
  calendarWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
})

