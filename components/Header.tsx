import { View, Text, Image, TouchableOpacity, StyleSheet, useColorScheme } from "react-native"

type HeaderProps = {
  userName: string
  profileImageUrl: string
  onMenuPress: () => void
}

export default function Header({ userName, profileImageUrl, onMenuPress }: HeaderProps) {
  const isDark = useColorScheme() === "dark"

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <Image source={{ uri: profileImageUrl || "https://via.placeholder.com/50" }} style={styles.profileImage} />
        <View style={styles.headerTextContainer}>
          <Text style={[styles.helloText, { color: isDark ? "#ccc" : "#666" }]}>Hello!</Text>
          <Text style={[styles.userNameText, { color: isDark ? "#fff" : "#000" }]}>{userName}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.menuButton, { backgroundColor: isDark ? "#444" : "#f0f0f0" }]}
        onPress={onMenuPress}
      >
        <Text style={{ color: isDark ? "#fff" : "#000", fontSize: 18 }}>☰</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerTextContainer: {
    marginLeft: 12,
  },
  helloText: {
    fontSize: 14,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
})

