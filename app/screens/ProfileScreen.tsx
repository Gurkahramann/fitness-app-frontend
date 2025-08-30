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
  BackHandler,
  Alert,
} from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import { useAuth } from "../../hooks/useAuth"
import TrainingHistoryCard from "../../components/TrainingHistoryCard"
import WeeklySummaryCard from "../../components/WeeklySummaryCard"
import { useUserProfile } from "../context/UserProfileContext"
import React from "react"
import { useNavigationState } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from "../styles/ProfileScreen.styles";

export default function ProfileScreen() {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const { user, logout } = useAuth()
  const { userProfile, loading, error, refetch } = useUserProfile()
  const navState = useNavigationState(state => state);
  const insets = useSafeAreaInsets();

  const profileImageUrl =
    userProfile?.profileImage ||
    (userProfile?.gender === "Male"
      ? "https://storage.googleapis.com/fitness-app-photos/Male%20Avatar.png"
      : userProfile?.gender === "Female"
      ? "https://storage.googleapis.com/fitness-app-photos/Female%20Avatar.png"
      : "https://via.placeholder.com/150");

  React.useEffect(() => {
    // Navigation stack'i logla

    const onBackPress = () => {
      // Eğer stack'te geri gidilecek ekran yoksa, çıkışı engelle ve Alert göster
      if (navState?.routes?.length === 1) {
        Alert.alert(
          'Çıkış Yap',
          'Uygulamadan çıkmak ister misiniz?',
          [
            { text: 'Hayır', style: 'cancel' },
            {
              text: 'Evet',
              onPress: () => BackHandler.exitApp(),
            },
          ]
        );
        return true;
      } else {
        // Stack'te başka ekran varsa, bir önceki ekrana dön
        router.back();
        return true;
      }
    };
    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [navState, router]);



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

  const formatDateForDisplay = (dateString: string | undefined): string => {
    if (!dateString) return "Tarih belirtilmemiş";

    if (dateString.includes("T")) {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString;
      }
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return dateString;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: isDark ? "#fff" : "#000" }]}>Profilim</Text>
        </View>

        {/* Profile Card */}
        <View style={[styles.profileCard, { backgroundColor: isDark ? "#222" : "#fff" }]}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profileImageUrl }}
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
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>{userProfile?.gender === 'Male' ? 'Erkek' : userProfile?.gender === 'Female' ? 'Kadın' : 'Belirtilmemiş'}</Text>
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
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>{formatDateForDisplay(userProfile?.birthDate)}</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="run"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>Aktivite Seviyesi: {getActivityLevelText(userProfile?.activityLevel || "")}</Text>
          </View>

          <View style={styles.statItem}>
            <MaterialCommunityIcons
              name="target"
              size={20}
              color={isDark ? "#3DCC85" : "#3DCC85"}
              style={styles.statIcon}
            />
            <Text style={[styles.statText, { color: isDark ? "#fff" : "#000" }]}>Hedef: {getFitnessGoalText(userProfile?.goal || "")}</Text>
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
              router.replace('/');
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
