"use client"

import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet, useColorScheme } from "react-native"
import { Calendar, type DateData, LocaleConfig } from "react-native-calendars"
import { useAuth } from "../app/context/AuthContext"
import { useExercises } from "../app/context/ExerciseContext"
import { Calendar as RNCalendar } from "react-native-calendars"

LocaleConfig.locales["tr"] = {
  monthNames: [
    "Ocak",
    "Şubat",
    "Mart",
    "Nisan",
    "Mayıs",
    "Haziran",
    "Temmuz",
    "Ağustos",
    "Eylül",
    "Ekim",
    "Kasım",
    "Aralık",
  ],
  monthNamesShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
  dayNames: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"],
  dayNamesShort: ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"],
  today: "Bugün",
}
LocaleConfig.defaultLocale = "tr"

type CalendarCardProps = {
  onDayPress: (day: DateData) => void
  selectedDate: string
  markedDates?: { [date: string]: any }
}

export default function CalendarCard({ onDayPress, selectedDate, markedDates }: CalendarCardProps) {
  const isDark = useColorScheme() === "dark"
  const backgroundColor = isDark ? "#222" : "#fff"
  const textColor = isDark ? "#fff" : "#000"
  const subTextColor = isDark ? "#ccc" : "#666"

  const { user } = useAuth();
  const { getWeeklyHistory } = useExercises();
  const [customMarkedDates, setCustomMarkedDates] = useState<{ [date: string]: any }>({});
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  useEffect(() => {
    console.log('CalendarCard useEffect tetiklendi', { userId: user?.id, currentMonth });
    (async () => {
      if (!user?.id) return;
      // Ayın ilk günü
      const [year, month] = currentMonth.split('-');
      const firstDay = new Date(Number(year), Number(month) - 1, 1);
      const weekStart = firstDay.toISOString().split('T')[0];
      const history = await getWeeklyHistory(user.id, weekStart);
      // Günleri grupla
      const grouped: { [date: string]: { completed: boolean[] } } = {};
      history.forEach(item => {
        if (!grouped[item.date]) grouped[item.date] = { completed: [] };
        grouped[item.date].completed.push(item.completed);
      });
      const now = new Date();
      const marks: { [date: string]: any } = {};
      Object.entries(grouped).forEach(([date, { completed }]) => {
        console.log('CalendarCard debug:', { date, completed });
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        let color = "#3DCC85"; // default: yeşil (gelecek)
        // Sadece gün karşılaştırması yap
        const todayOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        console.log('CalendarCard debug:', { date, d: d.toISOString(), todayOnly: todayOnly.toISOString(), d_lt_today: d < todayOnly, d_eq_today: d.getTime() === todayOnly.getTime(), completed });
        if (d < todayOnly) {
          // Geçmiş gün
          if (completed.length > 0) {
            if (completed.every(c => c)) {
              color = "#007AFF"; // mavi: tümü tamamlandı
            } else {
              color = "#FF3B30"; // kırmızı: eksik var
            }
            marks[date] = { selected: false, marked: true, dotColor: color, selectedColor: color };
          }
        } else if (d.getTime() === todayOnly.getTime()) {
          // Bugün
          if (completed.length > 0) {
            if (completed.every(c => c)) {
              color = "#007AFF";
            } else {
              color = "#FF3B30";
            }
            marks[date] = { selected: false, marked: true, dotColor: color, selectedColor: color };
          }
        } else {
          // Gelecek günler
          // Eğer o gün için program varsa yeşil işaretle
          if (completed.length > 0) {
            marks[date] = { selected: false, marked: true, dotColor: color, selectedColor: color };
          }
        }
      });
      setCustomMarkedDates(marks);
      console.log('CalendarCard işaretleme tamamlandı', marks);
    })();
  }, [user?.id, currentMonth]);

  // Merge selectedDte into markedDates for selection highlight
  const mergedMarkedDates = {
    ...customMarkedDates,
    ...(markedDates || {}),
    [selectedDate]: {
      ...(customMarkedDates[selectedDate] || {}),
      ...(markedDates?.[selectedDate] || {}),
      selected: true,
      selectedColor: customMarkedDates[selectedDate]?.selectedColor || "#3DCC85",
    },
  }

  return (
    <View style={[styles.container, { backgroundColor }]}> 
      <Text style={[styles.title, { color: textColor }]}>Takvim</Text>
      <Calendar
        onMonthChange={(monthObj) => {
          const newMonth = `${monthObj.year}-${String(monthObj.month).padStart(2, "0")}`;
          setCurrentMonth(newMonth);
        }}
        key={isDark ? "dark" : "light"}
        style={{
          height: 350,
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
        markedDates={mergedMarkedDates}
      />
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
  calendarWrapper: {
    borderRadius: 12,
    overflow: "hidden",
  },
})

