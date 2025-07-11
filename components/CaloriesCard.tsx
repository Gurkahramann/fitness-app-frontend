import { View, Text, StyleSheet, useColorScheme, ActivityIndicator, ScrollView } from "react-native"
import { AnimatedCircularProgress } from "react-native-circular-progress"
import { Ionicons } from "@expo/vector-icons"
import React from "react"

type CaloriesCardProps = {
  remaining: number
  goal: number
  consumed: number
  logs: any[]
  loading?: boolean
  error?: string | null
}

export default function CaloriesCard({ remaining, goal, consumed, logs, loading, error }: CaloriesCardProps) {
  const isDark = useColorScheme() === "dark"
  const textColor = isDark ? "#fff" : "#000"
  const subTextColor = isDark ? "#ccc" : "#666"

  // Get today's date string in yyyy-mm-dd format
  const todayString = new Date().toISOString().split('T')[0];

  // Filter logs for today only
  const todaysLogs = logs.filter(item => {
    if (!item.createdAt) return false;
    const logDate = new Date(item.createdAt).toISOString().split('T')[0];
    return logDate === todayString;
  });

  // Calculate today's consumed calories
  const todaysConsumed = todaysLogs.reduce((sum, item) => sum + (item.totalCalories || 0), 0);
  const todaysRemaining = Math.max(goal - todaysConsumed, 0);
  const percentRemaining = Math.round((todaysRemaining / goal) * 100);

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Sadece gün.ay.yıl
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#1C1C1E" : "#FFFFFF" }]}>
      <Text style={[styles.title, { color: textColor }]}>Kaloriler</Text>
      <Text style={[styles.subtitle, { color: subTextColor }]}>Kalan = Hedef - Alınan</Text>

      <View style={styles.progressContainer}>
        <AnimatedCircularProgress
          size={140}
          width={12}
          fill={percentRemaining}
          tintColor="#3DCC85"
          backgroundColor={isDark ? "#2C2C2E" : "#F2F2F7"}
          rotation={0}
          lineCap="round"
        >
          {() => (
            <View style={styles.progressContent}>
              <Text style={[styles.remainingValue, { color: textColor }]}>{todaysRemaining.toLocaleString()}</Text>
              <Text style={[styles.remainingLabel, { color: subTextColor }]}>Kalan</Text>
            </View>
          )}
        </AnimatedCircularProgress>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>{goal.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: subTextColor }]}>Hedef</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: textColor }]}>{todaysConsumed.toLocaleString()}</Text>
          <Text style={[styles.statLabel, { color: subTextColor }]}>Alınan</Text>
        </View>
      </View>

      {/* Food Logs Section */}
      <View style={styles.foodLogsSection}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Kaydedilen Yemekler</Text>
          {todaysLogs.length > 0 && (
            <View style={[styles.badge, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
              <Text style={[styles.badgeText, { color: isDark ? "#FFFFFF" : "#000000" }]}>{todaysLogs.length}</Text>
            </View>
          )}
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color="#3DCC85" size="small" />
            <Text style={[styles.loadingText, { color: subTextColor }]}>Yemekler yükleniyor...</Text>
          </View>
        )}

        {error && (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={20} color="#FF453A" />
            <Text style={[styles.errorText, { color: "#FF453A" }]}>{error}</Text>
          </View>
        )}

        {!loading && !error && todaysLogs.length === 0 && (
          <View style={styles.emptyContainer}>
            <View style={[styles.emptyIconContainer, { backgroundColor: isDark ? "#2C2C2E" : "#F2F2F7" }]}>
              <Ionicons name="restaurant-outline" size={24} color={isDark ? "#8E8E93" : "#6D6D70"} />
            </View>
            <Text style={[styles.emptyTitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>Henüz yemek kaydı yok</Text>
            <Text style={[styles.emptySubtitle, { color: isDark ? "#8E8E93" : "#6D6D70" }]}>
              Yediklerinizi kaydetmeye başlayın
            </Text>
          </View>
        )}

        {!loading && !error && todaysLogs.length > 0 && (
          <ScrollView style={styles.foodLogsList} showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
            {todaysLogs.map((item, index) => (
              <View
                key={item.id?.toString() || index.toString()}
                style={[
                  styles.foodLogItem,
                  {
                    backgroundColor: isDark ? "#2C2C2E" : "#F8F9FA",
                    borderColor: isDark ? "#3C3C43" : "#E5E5EA",
                  },
                ]}
              >
                <View style={styles.foodDetails}>
                  <Text style={[styles.foodName, { color: textColor }]} numberOfLines={1}>
                    {item.foodName}
                  </Text>
                  <View style={styles.foodMeta}>
                    <Text style={[styles.caloriesText, { color: "#FF6B35" }]}>+{item.totalCalories} kcal</Text>
                    <Text style={[styles.timeText, { color: subTextColor }]}> 
                      {item.createdAt ? formatDate(item.createdAt) : "Bilinmiyor"}
                    </Text>
                  </View>
                </View>
              </View>
            )) || null}
          </ScrollView>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 4,
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  progressContent: {
    alignItems: "center",
  },
  remainingValue: {
    fontSize: 28,
    fontWeight: "700",
  },
  remainingLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(142, 142, 147, 0.2)",
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },
  foodLogsSection: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    fontWeight: "400",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    fontWeight: "400",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  emptyIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  emptySubtitle: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  foodLogsList: {
    maxHeight: 300,
  },
  foodLogItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  foodIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  foodDetails: {
    flex: 1,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  foodMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  caloriesBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  caloriesText: {
    fontSize: 13,
    fontWeight: "600",
  },
  timeText: {
    fontSize: 12,
    fontWeight: "400",
  },
})
