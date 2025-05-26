"use client"
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../../hooks/useAuth"
import TrainingHistoryCard from "../../components/TrainingHistoryCard"
import WeeklySummaryCard from "../../components/WeeklySummaryCard"
import AchievementsCard from "../../components/AchievementsCard"
import { useUserProfile } from "../context/UserProfileContext"
import React from "react"

export default function ProfileScreen() {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const { user, logout } = useAuth()
  const { userProfile, loading, error, refetch } = useUserProfile()
  console.log(user)
  console.log(userProfile)

  // Mock user data if not available from auth context
  // const user = user || {
  //   name: "Tun tun tun Sahur",
  //   email: "user@example.com",
  //   profileImage: "https://via.placeholder.com/150",
  //   gender: "Erkek",
  //   height: 184,
  //   weight: 88,
  //   birthDate: "24/09/2001",
  //   activityLevel: "moderate",
  //   fitnessGoal: "stayFit",
  // }

  const handleEditPress = () => {
    router.push("/profile-edit")
  }

  // Get activity level text
  const getActivityLevelText = (level: string) => {
    switch (level) {
      case "sedentary":
        return "Hareketsiz"
      case "light":
        return "Hafif Aktif"
      case "moderate":
        return "Orta Aktif"
      case "active":
        return "Aktif"
      case "veryActive":
        return "Çok Aktif"
      case "extraActive":
        return "Ekstra Aktif"
      default:
        return "Orta Aktif"
    }
  }

  // Get fitness goal text
  const getFitnessGoalText = (goal: string) => {
    switch (goal) {
      case "loseWeight":
        return "Kilo Vermek"
      case "gainMuscle":
        return "Kas Kazanmak"
      case "stayFit":
        return "Formda Kalmak"
      case "improveHealth":
        return "Sağlığı İyileştirmek"
      default:
        return "Formda Kalmak"
    }
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>Sayfam</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="dots-vertical" size={24} color={isDark ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }}
              style={styles.profileImage}
            />
          </View>
          <Text style={[styles.userName, { color: isDark ? "#fff" : "#000" }]}>{userProfile?.name}</Text>
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: isDark ? "#333" : "#eee" }]}
            onPress={handleEditPress}
          >
            <Text style={[styles.editButtonText, { color: isDark ? "#fff" : "#000" }]}>Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* User Stats Summary */}
        <View style={[styles.statsCard, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="human-male"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>{userProfile?.gender}</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="human-male-height"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>{userProfile?.height} cm</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="weight"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>{userProfile?.weight} kg</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="calendar"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>{userProfile?.birthDate}</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="run"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>
              {getActivityLevelText(userProfile?.activityLevel || "")}
            </Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="target"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>
              {getFitnessGoalText(userProfile?.goal || "")}
            </Text>
          </View>
        </View>

        {/* Achievements Card */}

        {/* Weekly Summary Card */}
        <WeeklySummaryCard isDark={isDark} />

        {/* Training History Card */}
        <TrainingHistoryCard isDark={isDark} />

        {/* Logout Button */}
        <TouchableOpacity
          style={{
            marginHorizontal: 16,
            marginBottom: 32,
            marginTop: 8,
            backgroundColor: isDark ? '#333' : '#eee',
            paddingVertical: 14,
            borderRadius: 16,
            alignItems: 'center',
          }}
          onPress={async () => {
            try {
              await logout();
              router.replace('/login');
            } catch (e) {
              // Hata yönetimi eklenebilir
            }
          }}
        >
          <Text style={{ color: isDark ? '#fff' : '#000', fontSize: 16, fontWeight: 'bold' }}>Çıkış Yap</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
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
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    marginBottom: 16,
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  statsCard: {
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
  statItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#444",
  },
  statIcon: {
    marginRight: 12,
  },
  statText: {
    fontSize: 16,
  },
})
