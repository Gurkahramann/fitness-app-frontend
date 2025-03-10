import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useFormData } from '../context/FormContext';
import { useRouter } from 'expo-router';

// Stil dosyamızı içe aktarıyoruz
import { lightStyles, darkStyles } from '../styles/body-info.styles';

export default function BodyInfoScreen() {
  const { formData, setFormData } = useFormData();
  const colorScheme = useColorScheme(); // Dark/Light algılama
  const router = useRouter();

  // Doğru stil objesini seç
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const handleNext = () => {
    if (!formData.height || !formData.weight || !formData.birthDate) {
      alert('Boy, Kilo ve Doğum Tarihi alanlarını doldurunuz.');
      return;
    }
    router.push('/life-style');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vücut Bilgileri</Text>

      <TextInput
        style={styles.input}
        placeholder="Boy (cm)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={formData.height}
        onChangeText={(value) => setFormData((prev) => ({ ...prev, height: value }))}
      />

      <TextInput
        style={styles.input}
        placeholder="Kilo (kg)"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={formData.weight}
        onChangeText={(value) => setFormData((prev) => ({ ...prev, weight: value }))}
      />

      <TextInput
        style={styles.input}
        placeholder="GG/AA/YYYY"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={formData.birthDate}
        onChangeText={(value) => setFormData((prev) => ({ ...prev, birthDate: value }))}
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>İleri</Text>
      </TouchableOpacity>
    </View>
  );
}
