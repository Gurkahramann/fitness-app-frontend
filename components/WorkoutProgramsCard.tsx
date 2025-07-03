"use client"

import { View, Text, TouchableOpacity, ScrollView, StyleSheet, useColorScheme } from "react-native"
import { useRouter } from "expo-router"
import React from "react"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Image as ExpoImage } from "expo-image"
import { RECOMMENDATION_MATRIX } from "../constants/workoutData"

export type WorkoutProgram = {
  id: string
  title: string
  image: string
  type?: string // custom or default
  onDelete?: () => void
  slug?: string // for recommendation
}

type WorkoutProgramsCardProps = {
  title: string;
  programs: WorkoutProgram[];
  showCreate?: boolean;
  onViewAllPress?: () => void;
  onProgramPress?: (program: WorkoutProgram) => void;
  userProfile?: any;
  recommendationMatrix?: any[];
  allPrograms?: WorkoutProgram[];
}

export default function WorkoutProgramsCard({ title, programs, showCreate = true, onViewAllPress, onProgramPress, userProfile, recommendationMatrix = RECOMMENDATION_MATRIX, allPrograms }: WorkoutProgramsCardProps) {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const handleProgramPress = (program: WorkoutProgram) => {
    if (onProgramPress) {
      onProgramPress(program);
    }
  }

  const handleCreatePress = () => {
    router.push("/create-program")
  }

  // Eğer tüm programlar custom ise showCreate'i false yap
  const isCustomList = programs.length > 0 && programs.every(p => p.type === "custom");
  const shouldShowCreate = showCreate && !isCustomList; 

  // Recommendation filtering
  let displayPrograms = programs;
  if (userProfile && allPrograms && recommendationMatrix) {
    
    const activity = userProfile.activityLevel || "*";
    const goal = userProfile.goal || "*";
    const match = recommendationMatrix.find(row => (row.activity === activity || row.activity === "*") && (row.goal === goal || row.goal === "*"));
    
    const normalizeSlug = (slug: string | undefined) => slug?.toUpperCase().replace(/-/g, "_");
    if (match) {
      const seen = new Set<string>();
      const recs = match.recommend
        .map((slug: string) => {
          const normalizedSlug = slug.toUpperCase();
          const found = allPrograms.find(
            (p: WorkoutProgram) => normalizeSlug(p.slug) === normalizedSlug
          );
          
          return found;
        })
        .filter((p: WorkoutProgram | undefined): p is WorkoutProgram => {
          if (!p) return false;
          if (seen.has(p.id)) return false;
          seen.add(p.id);
          return true;
        });
      
      if (recs.length > 0) displayPrograms = recs;
    }
  }
  

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#222" : "#fff" }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>{title}</Text>
        
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.programsContainer}>
        {shouldShowCreate && (
          <TouchableOpacity style={[styles.programCard, styles.createCard]} onPress={handleCreatePress}>
            <View style={styles.createIconContainer}>
              <MaterialCommunityIcons name="plus" size={40} color="#3DCC85" />
            </View>
            <View style={styles.programTitleContainer}>
              <Text style={styles.createText}>Kendi Antrenman Programını{"\n"}Oluştur</Text>
            </View>
          </TouchableOpacity>
        )}
        {displayPrograms.map((program) => (
          <TouchableOpacity key={program.id} style={styles.programCard} onPress={() => handleProgramPress(program)}>
              <ExpoImage
              source={{ uri: program.image }}
              style={{ width: 120, height: 160, backgroundColor: 'red' }}
              contentFit="cover"
              onError={() => console.log('Görsel yüklenemedi:', program.image)}
              onLoad={() => console.log('Görsel yüklendi:', program.image)}
            />
                      <View style={styles.programTitleContainer}>
              <Text style={styles.programTitle}>{program.title}</Text>
            </View>
            {program.onDelete && (
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={(e) => {
                  e.stopPropagation();
                  program.onDelete?.();
                }}
              >
                <MaterialCommunityIcons name="delete" size={20} color="#fff" />
              </TouchableOpacity>
            )}
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
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.7)',
    borderRadius: 12,
    padding: 4,
  },
})
