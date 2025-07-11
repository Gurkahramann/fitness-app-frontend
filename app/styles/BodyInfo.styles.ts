// app/styles/BodyInfo.styles.ts
import { StyleSheet, Platform, StatusBar } from "react-native"

export const bodyInfoStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0,
    paddingBottom: 24,
  },
  header: {
    marginTop: 20,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  dateSection: {
    marginTop: 16,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  dateLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dateIcon: {
    marginRight: 8,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  dateButtonText: {
    fontSize: 16,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginTop: "auto",
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
})
