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

export default function WelcomePage() {
  const router = useRouter()
  const isDark = useColorScheme() === "dark"

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
          <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Transform Your Body</Text>
          <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
            Stay in shape, stay healthy with personalized workouts and nutrition plans
          </Text>
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
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>Workout Plans</Text>
            </View>

            <View style={[styles.featureItem, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
              <MaterialCommunityIcons
                name="food-apple"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>Nutrition Tracking</Text>
            </View>
          </View>

          <View style={styles.featureRow}>
            <View style={[styles.featureItem, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
              <MaterialCommunityIcons
                name="chart-line"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>Progress Stats</Text>
            </View>

            <View style={[styles.featureItem, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
              <MaterialCommunityIcons
                name="account-group"
                size={24}
                color={isDark ? "#fff" : "#000"}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: isDark ? "#fff" : "#000" }]}>Community Support</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
            onPress={() => router.push("/signup")}
          >
            <Text style={[styles.primaryButtonText, { color: isDark ? "#000" : "#fff" }]}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: isDark ? "#fff" : "#000" }]}
            onPress={() => router.push("/login")}
          >
            <Text style={[styles.secondaryButtonText, { color: isDark ? "#fff" : "#000" }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")
const featureItemWidth = (width - 64) / 2

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "space-between",
  },
  brandContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  heroSection: {
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  featuresContainer: {
    marginTop: 40,
  },
  featureRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  featureItem: {
    width: featureItemWidth,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  actionContainer: {
    marginTop: "auto",
    marginBottom: 24,
  },
  primaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
})

