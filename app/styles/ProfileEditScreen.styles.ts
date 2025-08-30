import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    backgroundColor: "transparent",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cancelButton: {
    fontSize: 16,
  },
  saveButton: {
    fontSize: 16,
    fontWeight: "600",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
    flex: 1,
  },
  valueText: {
    fontSize: 16,
    fontWeight: "600",
  },
  textInput: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    fontSize: 16,
    marginTop: 8,
  },
  sliderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  sliderWrapper: {
    flex: 1,
    height: 4,
    marginHorizontal: 10,
    position: "relative",
  },
  sliderTrack: {
    height: 4,
    width: "100%",
    borderRadius: 2,
    position: "absolute",
  },
  sliderFill: {
    height: 4,
    borderRadius: 2,
    position: "absolute",
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    position: "absolute",
    top: -8,
    marginLeft: -10,
  },
  sliderMin: {
    fontSize: 12,
  },
  sliderMax: {
    fontSize: 12,
  },
  dateButton: {
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  dateButtonText: {
    fontSize: 16,
  },
  activityOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  activityOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
  activityLevelDetails: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  activityLevelItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 2,
  },
  activityLevelIcon: {
    marginRight: 12,
  },
  activityLevelText: {
    flex: 1,
    fontSize: 14,
  },
  checkIcon: {
    marginLeft: 8,
  },
  goalsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 16,
  },
  goalItem: {
    width: "48%",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    position: "relative",
    borderWidth: 2,
  },
  goalIcon: {
    marginBottom: 8,
  },
  goalText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  selectedIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderBottomLeftRadius: 10,
  },
});

export default styles;
