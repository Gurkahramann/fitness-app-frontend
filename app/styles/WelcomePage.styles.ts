import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const featureItemWidth = (width - 64) / 2;

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
});

export default styles;

