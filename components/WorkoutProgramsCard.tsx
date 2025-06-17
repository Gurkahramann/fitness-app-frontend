"use client"

import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from "react-native"
import { useRouter } from "expo-router"
import React from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"

type WorkoutProgram = {
  id: string
  title: string
  image: string
}

type WorkoutProgramsCardProps = {
  title: string;
  programs: WorkoutProgram[];
  showCreate?: boolean;
  onViewAllPress?: () => void;
}

export default function WorkoutProgramsCard({ title, programs, showCreate = true, onViewAllPress }: WorkoutProgramsCardProps) {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const handleProgramPress = (programId: string) => {
    router.push({
      pathname: "/workout-detail",
      params: { id: programId }
    })
  }

  const handleCreatePress = () => {
    router.push("/create-program")
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{title}</Text>
        {onViewAllPress && (
          <TouchableOpacity onPress={onViewAllPress}>
            <Text style={[styles.viewAllText, { color: "#3DCC85" }]}>View All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.programsContainer}>
        {showCreate && (
          <TouchableOpacity style={[styles.programCard, styles.createCard]} onPress={handleCreatePress}>
            <View style={styles.createIconContainer}>
              <MaterialCommunityIcons name="plus" size={40} color="#3DCC85" />
            </View>
            <View style={styles.programTitleContainer}>
              <Text style={styles.createText}>Create Your Own{"\n"}Program</Text>
            </View>
          </TouchableOpacity>
        )}
        {programs.map((program) => (
          <TouchableOpacity key={program.id} style={styles.programCard} onPress={() => handleProgramPress(program.id)}>
            <Image source={{ uri: program.image }} style={styles.programImage} resizeMode="cover" />
            <View style={styles.programTitleContainer}>
              <Text style={styles.programTitle}>{program.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "500",
  },
  programsContainer: {
    paddingBottom: 8,
  },
  programCard: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  programImage: {
    width: "100%",
    height: "100%",
  },
  programTitleContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 8,
  },
  programTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  createCard: {
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#3DCC85",
    marginRight: 16,
  },
  createIconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 100,
  },
  createText: {
    color: "#3DCC85",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
})
