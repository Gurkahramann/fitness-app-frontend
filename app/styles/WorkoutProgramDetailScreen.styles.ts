import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: Platform.OS === "android" ? 32 : 24,
    height: 80,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    flex: 1,
    textAlign: "center",
  },
  workoutInfoCard: {
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutDescription: {
    fontSize: 16,
    marginBottom: 16,
    lineHeight: 22,
  },
  exercisesSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  exercisesList: {
    paddingBottom: 20,
  },
  exerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  exerciseContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },
  exerciseImageContainer: {
    position: "relative",
    marginLeft: 16,
  },
  exerciseImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  playIconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    maxHeight: "80%",
    borderRadius: 16,
    padding: 20,
  },
});

export default styles;
