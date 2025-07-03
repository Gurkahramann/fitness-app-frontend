"use client"

import { useState, useEffect } from "react"
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  useColorScheme,
  Platform,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  BackHandler,
} from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "@/hooks/useAuth"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { styles } from '../styles/LoginScreen.styles';
import { ScrollView } from "react-native"
import React from "react"
import { useToast } from "../context/ToastContext"

export default function LoginScreen() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const isDark = useColorScheme() === "dark"
  const { showToast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(true)

  // Clear form function
  const clearForm = () => {
    setEmail("")
    setPassword("")
    setEmailError("")
    setPasswordError("")
  }

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Password validation (at least 6 characters and 1 number)
  const isValidPassword = (password: string) => {
    return password.length >= 6 && /\d/.test(password)
  }

  // Real-time validation
  const handleEmailChange = (text: string) => {
    setEmail(text)
    if (text.length > 0) {
      setEmailError(isValidEmail(text) ? "" : "Geçerli bir e-posta giriniz")
    } else {
      setEmailError("")
    }
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
    setPasswordError("") // Şifre hatasını temizle
  }

  // Login process
  const handleLogin = async () => {
    // Reset previous errors
    setEmailError("")
    setPasswordError("")

    // Check if fields are empty
    if (!email) {
      setEmailError("E-posta alanı boş bırakılamaz")
      showToast("Lütfen e-posta adresinizi giriniz")
      return
    }

    if (!password) {
      setPasswordError("Şifre alanı boş bırakılamaz")
      showToast("Lütfen şifrenizi giriniz")
      return
    }

    // Check if there are validation errors
    if (emailError || passwordError) {
      showToast("Lütfen form hatalarını düzeltin")
      return
    }

    try {
      const result = await login({ email, password })
      
      if (result.success) {
        router.push("/home-page")
      } else {
        // Generic error message for any authentication failure
        const errorMessage = "E-posta veya şifre hatalı"
        showToast(errorMessage, 'error')
        setPassword("") // Sadece şifreyi temizle
      }
    } catch (error) {
      console.error("Login error:", error)
      const errorMessage = "Bir hata oluştu. Lütfen tekrar deneyin."
      showToast(errorMessage, 'error')
      setPassword("") // Sadece şifreyi temizle
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    const onBackPress = () => {
      router.replace("/");
      return true;
    };
    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [router]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDark ? "#121212" : "#f8f9fa" }]}>
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.innerContainer}>
              <View style={styles.headerContainer}>
                <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Giriş Yap</Text>
                <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>Devam etmek için giriş yapın</Text>
              </View>

              {/* Email Field */}
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderColor: emailError ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
                      backgroundColor: isDark ? "#1e1e1e" : "#fff",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="email-outline"
                    size={20}
                    color={isDark ? "#aaa" : "#666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                    placeholder="E-posta"
                    placeholderTextColor={isDark ? "#777" : "#aaa"}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={handleEmailChange}
                  />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
              </View>

              {/* Password Field */}
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderColor: passwordError ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
                      backgroundColor: isDark ? "#1e1e1e" : "#fff",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-outline"
                    size={20}
                    color={isDark ? "#aaa" : "#666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                    placeholder="Şifre"
                    placeholderTextColor={isDark ? "#777" : "#aaa"}
                    secureTextEntry={showPassword}
                    value={password}
                    onChangeText={handlePasswordChange}
                    autoCapitalize="none"
                    textContentType="password"
                  />
                  <TouchableOpacity onPress={toggleShowPassword} style={styles.eyeIcon}>
                    <MaterialCommunityIcons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={isDark ? "#aaa" : "#666"}
                    />
                  </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={[styles.loginButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
                onPress={handleLogin}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color={isDark ? "#000" : "#fff"} />
                ) : (
                  <Text style={[styles.loginButtonText, { color: isDark ? "#000" : "#fff" }]}>Giriş Yap</Text>
                )}
              </TouchableOpacity>

              {/* Register Link */}
              <View style={styles.registerContainer}>
                <Text style={[styles.registerText, { color: isDark ? "#aaa" : "#666" }]}>Hesabınız yok mu?</Text>
                <TouchableOpacity onPress={() => router.push("./signup")}>
                  <Text style={[styles.registerLink, { color: isDark ? "#fff" : "#000" }]}>Kayıt Ol</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}