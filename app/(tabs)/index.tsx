
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity 
} from 'react-native';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Başlık */}
      <Text style={styles.title}>Fitness App</Text>
      {/* Alt başlık */}
      <Text style={styles.subtitle}>Stay in shape, stay healthy</Text>

      {/* Sign Up butonu */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Login butonu */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password linki */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                   // Ekranı tamamen kaplasın
    backgroundColor: '#000',   // Arkaplan siyah
    justifyContent: 'center',  // Dikeyde ortalama
    alignItems: 'center',      // Yatayda ortalama
    paddingHorizontal: 20,     // Kenarlardan boşluk
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
    // React Native'de textShadow
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ccc',
    marginBottom: 30,
  },
  button: {
    width: '100%',             // Butonlar geniş ekranlarda da esneyebilsin
    maxWidth: 400,            // Çok geniş ekranlarda 400 pikseli aşmasın
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    marginVertical: 10,
    // Gölge efekti (iOS ve Android için)
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'center', // Buton içeriğini ortala
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
// });
