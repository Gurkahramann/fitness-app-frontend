import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import { useFormData } from '../context/FormContext';
import { useRouter } from 'expo-router';

// Stil dosyamızı içe aktarıyoruz
import { lightStyles, darkStyles } from '../styles/life-style.styles';

export default function LifestyleScreen() {
  const { formData, setFormData } = useFormData();
  const colorScheme = useColorScheme();  // Dark/Light algılama
  const router = useRouter();

  // Doğru stil objesini seç
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  const handleSave = () => {
    if (!formData.activityLevel || !formData.interestArea) {
      alert('Aktiflik seviyesi ve ilgi alanınızı girin.');
      return;
    }
    alert('Bilgiler kaydedildi!');
    router.push('/'); // Kaydetme sonrası anasayfaya dön
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yaşam Tarzı</Text>

      <TextInput
        style={styles.input}
        placeholder="Aktiflik seviyenizi girin"
        placeholderTextColor="#999"
        value={formData.activityLevel}
        onChangeText={(value) => setFormData((prev) => ({ ...prev, activityLevel: value }))}
      />

      <TextInput
        style={styles.input}
        placeholder="İlgi alanınızı girin"
        placeholderTextColor="#999"
        value={formData.interestArea}
        onChangeText={(value) => setFormData((prev) => ({ ...prev, interestArea: value }))}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
}
