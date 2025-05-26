import React from "react"
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from "react-native"

type WorkoutProgram = {
  id: string
  title: string
  image: string
}

type WorkoutProgramsCardProps = {
  programs: WorkoutProgram[]
  onProgramPress: (programId: string) => void
  onViewAllPress: () => void
}

export default function WorkoutProgramsCard({ programs, onProgramPress, onViewAllPress }: WorkoutProgramsCardProps) {
  const isDark = useColorScheme() === "dark"

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Workout Programs</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={[styles.viewAllText, { color: "#3DCC85" }]}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.programsContainer}>
        {programs.map((program) => (
          <TouchableOpacity key={program.id} style={styles.programCard} onPress={() => onProgramPress(program.id)}>
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
})

