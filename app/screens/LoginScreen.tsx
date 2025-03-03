import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from '../styles/LoginScreen.styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // 📌 E-posta doğrulama regex fonksiyonu
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // 📌 Şifre doğrulama fonksiyonu (en az 6 karakter ve 1 rakam içermeli)
  const isValidPassword = (password: string) => {
    return password.length >= 6 && /\d/.test(password);
  };

  // 📌 Anlık Validasyon
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(isValidEmail(text) ? '' : 'Geçerli bir e-posta girin');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(isValidPassword(text) ? '' : 'Şifre en az 6 karakter ve 1 rakam içermeli');
  };

  // 📌 Giriş işlemi
  const handleLogin = () => {
    if (!email || !password || emailError || passwordError) {
      return;
    }
    console.log('Giriş başarılı!');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}> 
        <View style={styles.content}>  
          <Text style={styles.title}>Giriş Yap</Text>

          {/* E-Posta Alanı */}
          <TextInput
            style={styles.input}
            placeholder="E-Mail"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={handleEmailChange}
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          {/* Şifre Alanı */}
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          {/* Giriş Yap Butonu */}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
