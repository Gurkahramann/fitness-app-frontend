"use client"

import { View, Text, TouchableOpacity, Image, StyleSheet, Platform, StatusBar, useColorScheme } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { useRouter } from "expo-router"
import React from "react"

type HeaderProps = {
  userName: string
  profileImageUrl?: string // Opsiyonel hale getirdik
}

export default function Header({ userName, profileImageUrl }: HeaderProps) {
  const isDark = useColorScheme() === "dark"
  const router = useRouter()
  const topPadding = Platform.OS === "android" ? (StatusBar.currentHeight || 24) + 16 : 50

  const handleProfilePress = () => {
     router.push("/profile-page") // Profil sayfası hazırsa burayı açarsın
  }

  const hasValidProfileImage = profileImageUrl && profileImageUrl.trim() !== ""

  return (
    <View style={[styles.container, { paddingTop: topPadding }]}>
      <View>
        <Text style={[styles.helloText, { color: isDark ? "#aaa" : "#666" }]}>Hello!</Text>
        <Text style={[styles.userName, { color: isDark ? "#fff" : "#000" }]}>{userName}</Text>
      </View>

      <TouchableOpacity onPress={handleProfilePress} style={styles.profileButton}>
        {hasValidProfileImage ? (
          <Image
            source={{ uri: profileImageUrl }}
            style={styles.profileImage}
          />
        ) : (
          <View style={[styles.profileFallback, { backgroundColor: isDark ? "#333" : "#ddd" }]}>
            <MaterialCommunityIcons name="account" size={30} color={isDark ? "#fff" : "#000"} />
          </View>
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
  helloText: {
    fontSize: 14,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileButton: {
    borderRadius: 25,
    overflow: "hidden",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileFallback: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
})
