// import React, { useState } from 'react';
// import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
// import styles from '../styles/SignUpScreen.styles';

// export default function SignUpScreen() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState('');

//   // 📌 E-posta doğrulama regex fonksiyonu
//   const isValidEmail = (email: string) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   };

//   // 📌 Şifre doğrulama fonksiyonu (6 karakter ve en az 1 sayı içermeli)
//   const isValidPassword = (password: string) => {
//     return password.length >= 6 && /\d/.test(password);
//   };

//   // 📌 Form doğrulama (anlık olarak hata mesajlarını güncelleme)
//   const handleEmailChange = (text: string) => {
//     setEmail(text);
//     setEmailError(isValidEmail(text) ? '' : 'Geçerli bir e-posta girin');
//   };

//   const handlePasswordChange = (text: string) => {
//     setPassword(text);
//     setPasswordError(isValidPassword(text) ? '' : 'Şifre en az 6 karakter ve 1 rakam içermeli');
//   };

//   const handleConfirmPasswordChange = (text: string) => {
//     setConfirmPassword(text);
//     setConfirmPasswordError(text === password ? '' : 'Şifreler eşleşmiyor');
//   };

//   // 📌 Formu gönderme
//   const handleSignUp = () => {
//     if (!email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError) {
//       return;
//     }
//     console.log('Kayıt işlemi başarılı!');
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//       style={styles.container}
//     >
//       <View style={styles.content}>
//         <Text style={styles.title}>Kayıt Ol</Text>

//         {/* E-Posta Alanı */}
//         <TextInput
//           style={styles.input}
//           placeholder="E-Mail"
//           placeholderTextColor="#aaa"
//           keyboardType="email-address"
//           autoCapitalize="none"
//           value={email}
//           onChangeText={handleEmailChange}
//         />
//         {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

//         {/* Şifre Alanı */}
//         <TextInput
//           style={styles.input}
//           placeholder="Şifre"
//           placeholderTextColor="#aaa"
//           secureTextEntry
//           value={password}
//           onChangeText={handlePasswordChange}
//         />
//         {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

//         {/* Şifreyi Doğrula Alanı */}
//         <TextInput
//           style={styles.input}
//           placeholder="Şifreyi Doğrula"
//           placeholderTextColor="#aaa"
//           secureTextEntry
//           value={confirmPassword}
//           onChangeText={handleConfirmPasswordChange}
//         />
//         {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

//         {/* Sign Up Butonu */}
//         <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </KeyboardAvoidingView>
//   );
// }
// --------------------------------------------------------------------------------------------------------------------------------------------



import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router'; // 1) useRouter import
import styles from '../styles/SignUpScreen.styles'; // Mevcut stil dosyan

export default function SignUpScreen() {
  const router = useRouter(); // 2) router örneği oluştur
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // E-posta doğrulama regex fonksiyonu
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Şifre doğrulama fonksiyonu (6 karakter ve en az 1 sayı içermeli)
  const isValidPassword = (password: string) => {
    return password.length >= 6 && /\d/.test(password);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError(isValidEmail(text) ? '' : 'Geçerli bir e-posta girin');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError(isValidPassword(text) ? '' : 'Şifre en az 6 karakter ve 1 rakam içermeli');
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(text === password ? '' : 'Şifreler eşleşmiyor');
  };

  // Formu gönderme
  const handleSignUp = () => {
    // Boş alan veya hatalı alan varsa return
    if (!email || !password || !confirmPassword || emailError || passwordError || confirmPasswordError) {
      return;
    }
    // Kayıt işlemi başarılıysa
    console.log('Kayıt işlemi başarılı!');
    router.push('./personal-info');
 // 3) personal-info sayfasına yönlendir
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Kayıt Ol</Text>

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
          autoCapitalize="none"
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={handlePasswordChange}
        />
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {/* Şifreyi Doğrula Alanı */}
        <TextInput
          style={styles.input}
          placeholder="Şifreyi Doğrula"
          placeholderTextColor="#aaa"
           autoCapitalize="none"
          textContentType="password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={handleConfirmPasswordChange}
        />
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        {/* Sign Up Butonu */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
