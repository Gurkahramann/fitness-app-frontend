"use client"

import { useState } from "react"
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"

interface ExerciseDetailModalProps {
  visible: boolean
  exercise: any
  onClose: () => void
  isDark: boolean
}

const { width } = Dimensions.get("window")

export default function ExerciseDetailModal({ visible, exercise, onClose, isDark }: ExerciseDetailModalProps) {
  const [activeTab, setActiveTab] = useState("instructions")

  if (!exercise) return null

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
            <Image source={{ uri: exercise.image }} style={styles.exerciseImage} />
            <TouchableOpacity style={styles.playButton}>
              <MaterialCommunityIcons name="play" size={40} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Exercise Stats */}
          <View style={[styles.statsContainer, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="clock-outline" size={20} color="#3DCC85" />
              <Text style={[styles.statLabel, { color: isDark ? "#aaa" : "#666" }]}>Duration</Text>
              <Text style={[styles.statValue, { color: isDark ? "#fff" : "#000" }]}>{exercise.duration || ''}</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialCommunityIcons name="fire" size={20} color="#FF6347" />
              <Text style={[styles.statLabel, { color: isDark ? "#aaa" : "#666" }]}>Calories</Text>
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
                Instructions
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
                Tips
              </Text>
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={[styles.contentContainer, { backgroundColor: isDark ? "#222" : "#fff" }]}>
            {activeTab === "instructions" ? (
              <View>
                <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>How to perform</Text>
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
                <Text style={[styles.sectionTitle, { color: isDark ? "#fff" : "#000" }]}>Pro Tips</Text>
                {(exercise.tips || []).map((tip: string, index: number) => (
                  <View key={index} style={styles.tipItem}>
                    <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#FFD700" />
                    <Text style={[styles.tipText, { color: isDark ? "#fff" : "#000" }]}>{tip}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: "#3DCC85" }]}>
              <MaterialCommunityIcons name="play" size={20} color="#fff" />
              <Text style={styles.actionButtonText}>Start Exercise</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, { backgroundColor: isDark ? "#333" : "#eee" }]}>
              <MaterialCommunityIcons name="plus" size={20} color={isDark ? "#fff" : "#000"} />
              <Text style={[styles.actionButtonText, { color: isDark ? "#fff" : "#000" }]}>Add to Workout</Text>
            </TouchableOpacity>
          </View>
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
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -30 }, { translateY: -30 }],
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
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
})
