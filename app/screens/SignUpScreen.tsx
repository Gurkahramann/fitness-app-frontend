"use client"

import { useState } from "react"
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  SafeAreaView,
  useColorScheme,
  ScrollView,
} from "react-native"
import { useRouter } from "expo-router"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import styles from "../styles/SignUpScreen.styles"
import { useFormData } from "../context/FormContext"

export default function SignUpScreen() {
  const router = useRouter()
  const { setFormData } = useFormData()
  const isDark = useColorScheme() === "dark"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmPasswordError, setConfirmPasswordError] = useState("")

  const [showPassword, setShowPassword] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

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
    if (text.length > 0) {
      setPasswordError(isValidPassword(text) ? "" : "Şifre en az 6 karakter ve 1 rakam içermeli")
    } else {
      setPasswordError("")
    }

    // Also update confirm password error if confirm password has been entered
    if (confirmPassword) {
      setConfirmPasswordError(text === confirmPassword ? "" : "Şifreler eşleşmiyor")
    }
  }

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text)
    if (text.length > 0) {
      setConfirmPasswordError(text === password ? "" : "Şifreler eşleşmiyor")
    } else {
      setConfirmPasswordError("")
    }
  }

  // Form submission
  const handleSignUp = () => {
    // Check if fields are empty
    if (!email) {
      setEmailError("E-posta alanı boş bırakılamaz")
      return
    }

    if (!password) {
      setPasswordError("Şifre alanı boş bırakılamaz")
      return
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Şifre doğrulama alanı boş bırakılamaz")
      return
    }

    // Check if there are validation errors
    if (emailError || passwordError || confirmPasswordError) return

    // Save form data and navigate to next screen
    setFormData((prev) => ({ ...prev, email, password }))
    console.log("Kayıt işlemi başarılı!")
    router.push("./personal-info")
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const goToLogin = () => {
    router.push("./login")
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
              <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>Kayıt Ol</Text>
              <Text style={[styles.subtitle, { color: isDark ? "#aaa" : "#666" }]}>
                Yeni hesap oluşturarak başlayın
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
                    autoCapitalize="none" 
                    value={password}
                    onChangeText={handlePasswordChange}
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

              {/* Confirm Password Field */}
              <View style={styles.inputContainer}>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderColor: confirmPasswordError ? "#ff4d4f" : isDark ? "#333" : "#e0e0e0",
                      backgroundColor: isDark ? "#1e1e1e" : "#fff",
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="lock-check-outline"
                    size={20}
                    color={isDark ? "#aaa" : "#666"}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[styles.input, { color: isDark ? "#fff" : "#000" }]}
                    placeholder="Şifreyi Doğrula"
                    placeholderTextColor={isDark ? "#777" : "#aaa"}
                    secureTextEntry={showConfirmPassword}
                    value={confirmPassword}
                    autoCapitalize="none" 
                    onChangeText={handleConfirmPasswordChange}
                  />
                  <TouchableOpacity onPress={toggleShowConfirmPassword} style={styles.eyeIcon}>
                    <MaterialCommunityIcons
                      name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color={isDark ? "#aaa" : "#666"}
                    />
                  </TouchableOpacity>
                </View>
                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity
                style={[styles.signUpButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
                onPress={handleSignUp}
              >
                <Text style={[styles.signUpButtonText, { color: isDark ? "#000" : "#fff" }]}>Kayıt Ol</Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={[styles.loginText, { color: isDark ? "#aaa" : "#666" }]}>Zaten hesabınız var mı?</Text>
                <TouchableOpacity onPress={goToLogin}>
                  <Text style={[styles.loginLink, { color: isDark ? "#fff" : "#000" }]}>Giriş Yap</Text>
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

