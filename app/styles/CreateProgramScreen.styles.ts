import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  backButton: {
    padding: 4,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
    marginHorizontal: 16,
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  modernSection: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  sectionIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  modernSectionTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  modernInput: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
  },
  modernTextArea: {
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    textAlignVertical: "top",
    minHeight: 80,
    borderWidth: 1,
  },
  scheduleContainer: {
    marginBottom: 24,
  },
  scheduleLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  weekSelector: {
    gap: 8,
  },
  weekButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: 'center',
  },
  weekContainer: {
    marginBottom: 20,
  },
  weekHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  weekBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  weekBadgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modernDayButton: {
    width: "13%",
    aspectRatio: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    padding: 4,
  },
  dayEmoji: {
    fontSize: 16,
    marginBottom: 2,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "600",
  },
  categoriesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  modernCategoryCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 2,
  },
  categoryIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "center",
  },
  categoryCount: {
    fontSize: 12,
    textAlign: "center",
  },
  modernExerciseItem: {
    borderRadius: 12,
    marginBottom: 8,
    overflow: "hidden",
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  programWeekContainer: {
    marginBottom: 20,
  },
  programWeekHeader: {
    marginBottom: 12,
  },
  programWeekTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  programDayContainer: {
    marginBottom: 16,
  },
  programDayHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  programDayTitle: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  exerciseCountBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  exerciseCountText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  programExerciseItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modernModalContent: {
    width: "100%",
    maxHeight: "90%",
    borderRadius: 20,
    overflow: "hidden",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  exerciseImageContainer: {
    alignItems: "center",
    padding: 20,
  },
  exerciseImage: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },
  instructionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  instructionStep: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 2,
  },
  stepNumberText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  tipsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  configSection: {
    padding: 20,
    paddingTop: 0,
  },
  configTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  configGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  configItem: {
    flex: 1,
    minWidth: "45%",
  },
  configLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  configInput: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    textAlign: "center",
  },
  scheduleSection: {
    padding: 20,
    paddingTop: 0,
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  scheduleSubtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  modalWeekContainer: {
    marginBottom: 16,
  },
  modalWeekTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  modalDaysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  modalDayButton: {
    width: "13%",
    aspectRatio: 1,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 4,
  },
  modalDayEmoji: {
    fontSize: 12,
    marginBottom: 2,
  },
  modalDayLabel: {
    fontSize: 9,
    fontWeight: "600",
  },
  modalActions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#6B7280",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  addExerciseButton: {
    flex: 2,
    borderRadius: 12,
    overflow: "hidden",
  },
  addExerciseButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    gap: 8,
  },
  addExerciseButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;
