"use client"

import { useState } from "react"
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, TextInput } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { Image as ExpoImage } from 'expo-image'

// Gün isimleri sabiti
const DAYS = [
  { label: "Pzt", fullName: "Pazartesi", value: 1 },
  { label: "Sal", fullName: "Salı", value: 2 },
  { label: "Çar", fullName: "Çarşamba", value: 3 },
  { label: "Per", fullName: "Perşembe", value: 4 },
  { label: "Cum", fullName: "Cuma", value: 5 },
  { label: "Cmt", fullName: "Cumartesi", value: 6 },
  { label: "Paz", fullName: "Pazar", value: 0 },
]

interface ExerciseDetailModalProps {
  visible: boolean
  exercise: any
  onClose: () => void
  isDark: boolean
  showConfig?: boolean
  onAddToWorkout?: (config: any) => void
  selectedDaysPerWeek?: { [week: number]: number[] }
  weeks?: number
  onNoDaySelected?: () => void
  showActions?: boolean // yeni prop, default true
}

const { width } = Dimensions.get("window")

export default function ExerciseDetailModal({
  visible,
  exercise,
  onClose,
  isDark,
  showConfig = false,
  onAddToWorkout,
  selectedDaysPerWeek,
  weeks = 1,
  onNoDaySelected,
  showActions = true,
}: ExerciseDetailModalProps) {
  const [activeTab, setActiveTab] = useState("instructions")
  // Config state'leri
  const [sets, setSets] = useState("3")
  const [reps, setReps] = useState("12")
  const [weight, setWeight] = useState("0")
  const [duration, setDuration] = useState("30")
  const [selectedSchedule, setSelectedSchedule] = useState<{ [week: number]: number[] }>({})
  const [isGifPlaying, setIsGifPlaying] = useState(true)

  React.useEffect(() => {
    if (visible && showConfig) {
      setSets("3")
      setReps("12")
      setWeight("0")
      setDuration("30")
      setSelectedSchedule({})
    }
  }, [visible, showConfig, exercise])

  if (!exercise) return null

  const isCardio = exercise.type === "cardio"

  // Determine which image/gif to show
  const imageUrl = exercise.imageUrl || exercise.coverImageUrl || exercise.gifUrl || exercise.image;
  const isGif = imageUrl && imageUrl.toLowerCase().endsWith('.gif');
  // Durdurulduğunda GIF'in ilk karesi için jpg/png fallback
  let staticImageUrl = undefined;
  if (isGif && imageUrl) {
    staticImageUrl = imageUrl.replace(/\.gif$/i, '.jpg');
  }
  console.log('ExerciseDetailModal imageUrl:', imageUrl, 'isGif:', isGif);

  const handleScheduleToggle = (week: number, day: number) => {
    setSelectedSchedule((prev) => {
      const weekDays = prev[week] || []
      const isSelected = weekDays.includes(day)
      const updatedWeekDays = isSelected ? weekDays.filter((d) => d !== day) : [...weekDays, day]
      return { ...prev, [week]: updatedWeekDays }
    })
  }

  const handleAddToWorkout = () => {
    if (showConfig) {
      // Gün seçimi validasyonu
      const anyDaySelected = Object.values(selectedSchedule).some(days => days.length > 0)
      if (selectedDaysPerWeek && !anyDaySelected && onNoDaySelected) {
        onNoDaySelected()
        onClose()
        return
      }
      // Diğer validasyonlar (ör: ağırlık)
      if (!isCardio && (Number.parseFloat(weight) <= 0 || isNaN(Number.parseFloat(weight)))) {
        if (onAddToWorkout) onAddToWorkout({ error: "Please enter a weight greater than 0." })
        return
      }
      onAddToWorkout?.({ sets, reps, weight, duration, selectedSchedule })
    } else {
      onAddToWorkout?.({})
    }
    onClose()
  }

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: isDark ? "#333" : "#eee" }]}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>{exercise.name}</Text>
          <TouchableOpacity style={styles.favoriteButton}>
            <MaterialCommunityIcons name="heart-outline" size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Exercise Image/Video */}
          <View style={styles.mediaContainer}>
            {isGif ? (
              <ExpoImage
                source={imageUrl}
                style={styles.exerciseImage}
                contentFit="contain"
                onLoad={() => console.log('ExpoImage loaded:', imageUrl)}
                onError={(e) => console.log('ExpoImage error:', e, imageUrl)}
              />
            ) : (
              <ExpoImage
                source={imageUrl}
                style={styles.exerciseImage}
                contentFit="contain"
                onLoad={() => console.log('ExpoImage loaded:', imageUrl)}
                onError={(e) => console.log('ExpoImage error:', e, imageUrl)}
              />
            )}
          </View>

          {/* Exercise Stats */}
          <View style={[styles.statsContainer, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#3DCC85" />
              <Text style={[styles.statLabel, { color: isDark ? "#aaa" : "#666" }]}>Süre</Text>
              <Text style={[styles.statValue, { color: isDark ? "#fff" : "#000" }]}>{exercise.duration || ''}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="fire" size={20} color="#FF6347" />
              <Text style={[styles.statLabel, { color: isDark ? "#aaa" : "#666" }]}>Kalori</Text>
              <Text style={[styles.statValue, { color: isDark ? "#fff" : "#000" }]}>{exercise.calories || ''}</Text>
            </View>
          </View>

          {/* Tab Navigation */}
          <View style={[styles.tabContainer, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            <TouchableOpacity
              style={[styles.tab, activeTab === "instructions" && { backgroundColor: isDark ? "#3DCC85" : "#3DCC85" }]}
              onPress={() => setActiveTab("instructions")}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === "instructions" ? "#fff" : isDark ? "#aaa" : "#666",
                  },
                ]}
              >
                Talimatlar
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === "tips" && { backgroundColor: isDark ? "#3DCC85" : "#3DCC85" }]}
              onPress={() => setActiveTab("tips")}
            >
              <Text
                style={[
                  styles.tabText,
                  {
                    color: activeTab === "tips" ? "#fff" : isDark ? "#aaa" : "#666",
                  },
                ]}
              >
                İpuçları
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={[styles.contentContainer, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            {activeTab === "instructions" ? (
              <View>
                <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Nasıl Yapılır?</Text>
                {(exercise.instructions || []).map((instruction: string, index: number) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={[styles.stepNumber, { backgroundColor: "#3DCC85" }]}>
                      <Text style={styles.stepNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={[styles.instructionText, { color: isDark ? "#fff" : "#000" }]}>{instruction}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <View>
                <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>İpuçları</Text>
                {(exercise.tips || []).map((tip: string, index: number) => (
                  <View key={index} style={styles.tipItem}>
                    <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#FFD700" />
                    <Text style={[styles.tipText, { color: isDark ? "#fff" : "#000" }]}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Config Alanları */}
          {showConfig && (
            <View style={[styles.contentContainer, { backgroundColor: isDark ? "#222" : "#fff" }]}>
              <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Egzersiz Ayarları</Text>
              <View style={styles.configGrid}>
                <View style={styles.configItem}>
                  <Text style={[styles.configLabel, { color: isDark ? "#9CA3AF" : "#64748B" }]}>Set</Text>
                  <TextInput
                    style={[
                      styles.configInput,
                      {
                        backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                        color: isDark ? "#fff" : "#1E293B",
                        borderColor: isDark ? "#374151" : "#E2E8F0",
                      },
                    ]}
                    value={sets}
                    onChangeText={setSets}
                    keyboardType="numeric"
                  />
                </View>
                {!isCardio ? (
                  <>
                    <View style={styles.configItem}>
                      <Text style={[styles.configLabel, { color: isDark ? "#9CA3AF" : "#64748B" }]}>Tekrar</Text>
                      <TextInput
                        style={[
                          styles.configInput,
                          {
                            backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                            color: isDark ? "#fff" : "#1E293B",
                            borderColor: isDark ? "#374151" : "#E2E8F0",
                          },
                        ]}
                        value={reps}
                        onChangeText={setReps}
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.configItem}>
                      <Text style={[styles.configLabel, { color: isDark ? "#9CA3AF" : "#64748B" }]}>Ağırlık (kg)</Text>
                      <TextInput
                        style={[
                          styles.configInput,
                          {
                            backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                            color: isDark ? "#fff" : "#1E293B",
                            borderColor: isDark ? "#374151" : "#E2E8F0",
                          },
                        ]}
                        value={weight}
                        onChangeText={setWeight}
                        keyboardType="numeric"
                      />
                    </View>
                  </>
                ) : (
                  <View style={styles.configItem}>
                    <Text style={[styles.configLabel, { color: isDark ? "#9CA3AF" : "#64748B" }]}>Süre (sn)</Text>
                    <TextInput
                      style={[
                        styles.configInput,
                        {
                          backgroundColor: isDark ? "#2A2A2A" : "#F8FAFC",
                          color: isDark ? "#fff" : "#1E293B",
                          borderColor: isDark ? "#374151" : "#E2E8F0",
                        },
                      ]}
                      value={duration}
                      onChangeText={setDuration}
                      keyboardType="numeric"
                    />
                  </View>
                )}
              </View>
              {/* Gün seçimi alanı */}
              {selectedDaysPerWeek && weeks > 0 && (
                <View style={styles.scheduleSection}>
                  <Text style={[styles.scheduleTitle, { color: isDark ? "#fff" : "#1E293B" }]}>📅 Programa Ekle</Text>
                  <Text style={[styles.scheduleSubtitle, { color: isDark ? "#9CA3AF" : "#64748B" }]}>Bu egzersizi eklemek istediğiniz günleri seçin</Text>
                  {[...Array(weeks)].map((_, weekIdx) =>
                    selectedDaysPerWeek[weekIdx + 1]?.length > 0 && (
                      <View key={weekIdx} style={styles.modalWeekContainer}>
                        <Text style={[styles.modalWeekTitle, { color: isDark ? "#E2E8F0" : "#475569" }]}>Hafta {weekIdx + 1}</Text>
                        <View style={styles.modalDaysGrid}>
                          {selectedDaysPerWeek[weekIdx + 1].map((day: number) => {
                            const isSelected = selectedSchedule[weekIdx + 1]?.includes(day)
                            const dayObj = DAYS.find(d => d.value === day)
                            return (
                              <TouchableOpacity
                                key={day}
                                style={[
                                  styles.modalDayButton,
                                  {
                                    backgroundColor: isSelected ? "#3DCC85" : isDark ? "#2A2A2A" : "#F8FAFC",
                                    borderColor: isSelected ? "#3DCC85" : isDark ? "#374151" : "#E2E8F0",
                                  },
                                ]}
                                onPress={() => handleScheduleToggle(weekIdx + 1, day)}
                              >
                                <Text
                                  style={[
                                    styles.modalDayLabel,
                                    { color: isSelected ? "#fff" : isDark ? "#E2E8F0" : "#64748B" },
                                  ]}
                                >
                                  {dayObj ? dayObj.label : day}
                                </Text>
                              </TouchableOpacity>
                            )
                          })}
                        </View>
                      </View>
                    )
                  )}
                </View>
              )}
            </View>
          )}

          {/* Action Buttons */}
          {showActions && onAddToWorkout && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: isDark ? "#333" : "#eee" }]}
                onPress={handleAddToWorkout}
                disabled={!onAddToWorkout}
              >
                <MaterialCommunityIcons name="plus" size={20} color={isDark ? "#fff" : "#000"} />
                <Text style={[styles.actionButtonText, { color: isDark ? "#fff" : "#000" }]}>Programa Ekle</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  favoriteButton: {
    padding: 8,
  },
  mediaContainer: {
    position: "relative",
    height: 250,
    margin: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
  },
  statsContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "500",
  },
  contentContainer: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "flex-start",
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
  },
  actionButtons: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingBottom: 32,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  configGrid: {
    flexDirection: "row",
    gap: 12,
  },
  configItem: {
    flex: 1,
  },
  configLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  configInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 8,
  },
  scheduleSection: {
    marginTop: 16,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  scheduleSubtitle: {
    fontSize: 12,
    marginBottom: 16,
  },
  modalWeekContainer: {
    marginBottom: 16,
  },
  modalWeekTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalDaysGrid: {
    flexDirection: "row",
    gap: 8,
  },
  modalDayButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  modalDayLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
})
