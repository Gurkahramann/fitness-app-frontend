import { StyleSheet } from "react-native"

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  selectorWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    paddingLeft: 16,
    paddingRight: 8,
  },
  inputIcon: {
    marginRight: 12,
  },
  selectorIcon: {
    marginLeft: "auto",
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
  },
  modalSelector: {
    flex: 1,
    height: "100%",
  },
  selectStyle: {
    borderWidth: 0,
    height: "100%",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  selectTextStyle: {
    fontSize: 16,
    textAlign: "left",
  },
  initValueTextStyle: {
    fontSize: 16,
    textAlign: "left",
  },
  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  nextButton: {
    flexDirection: "row",
    height: 56,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: "600",
    marginRight: 8,
  },
})

