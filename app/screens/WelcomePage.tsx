"use client"
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native"
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import React from "react"
import { useAuth } from "../../hooks/useAuth"
import styles from "../styles/WelcomePage.styles";

export default function WelcomePage() {
  const router = useRouter()
  const isDark = useColorScheme() === "dark"
  const { user, isLoading } = useAuth()

  React.useEffect(() => {
    if (!isLoading && user) {
      router.replace("/home-page")
    }
  }, [user, isLoading])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <View style={styles.content}>
        {/* Logo and Brand */}
        <View style={styles.brandContainer}>
          <View style={[styles.logoCircle, { backgroundColor: isDark ? "#fff" : "#000" }]}>
            <MaterialCommunityIcons name="dumbbell" size={40} color={isDark ? "#000" : "#fff"} />
          </View>
          <Text style={[styles.appName, { color: isDark ? "#fff" : "#000" }]}>FITNESS</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Vücudunu Dönüştür</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>Kişiselleştirilmiş antrenman ve beslenme planlarıyla formda ve sağlıklı kal</Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <View style={[styles.featureItem, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
              <MaterialCommunityIcons
                name="calendar-check"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>Antrenman Planları</Text>
            </View>

            <View style={[styles.featureItem, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
              <MaterialCommunityIcons
                name="food-apple"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>Beslenme Takibi</Text>
            </View>
          </View>

          <View style={[styles.featureRow, { justifyContent: "center" }]}>
            <View style={[styles.featureItem, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
              <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>İlerleme İstatistikleri</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
            onPress={() => router.push("/signup")}
          >
            <Text style={[styles.primaryButtonText, { color: isDark ? "#000" : "#fff" }]}>Kayıt Ol</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: isDark ? "#fff" : "#000" }]}
            onPress={() => router.push("/login")}
          >
            <Text style={[styles.secondaryButtonText, { color: isDark ? "#fff" : "#000" }]}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

