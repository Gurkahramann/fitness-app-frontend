"use client"

import { useState } from "react"
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
} from "react-native"
import { useRouter } from "expo-router"
import { useAuth } from "@/hooks/useAuth"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { styles } from '../styles/LoginScreen.styles';
import { ScrollView } from "react-native"


export default function LoginScreen() {
  const { login, isLoading } = useAuth()
  const router = useRouter()
  const isDark = useColorScheme() === "dark"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [showPassword, setShowPassword] = useState(true)

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
      setEmailError(isValidEmail(text) ? "" : "Geçerli bir e-posta girin")
    } else {
      setEmailError("")
    }
  }

  const handlePasswordChange = (text: string) => {
    setPassword(text)
  }

  // Login process
  const handleLogin = async () => {
    // Check if fields are empty
    if (!email) {
      setEmailError("E-posta alanı boş bırakılamaz")
      return
    }

    if (!password) {
      setPasswordError("Şifre alanı boş bırakılamaz")
      return
    }

    // Check if there are validation errors
    if (emailError || passwordError) return


    const success = await login({ email, password })
    console.log(success);
    if (success !== undefined) {
      router.push("/home-page") // Redirect to home screen on successful login
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

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
              <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
                Hesabınıza giriş yaparak devam edin
              </Text>
            </View>

            <View style={styles.formContainer}>
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
                    placeholder="E-Mail"
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

              {/* Forgot Password */}
              {/* <TouchableOpacity style={styles.forgotPasswordContainer}>
                <Text style={[styles.forgotPasswordText, { color: isDark ? "#aaa" : "#666" }]}>Şifremi Unuttum</Text>
              </TouchableOpacity> */}

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
          </View>
      </ScrollView>
          
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}