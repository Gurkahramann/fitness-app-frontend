import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { useFormData } from '../context/FormContext';
import { useRouter } from 'expo-router';

import { lightStyles, darkStyles } from '../styles/life-style.styles';

// Uzun açıklamalı liste
const ACTIVITY_OPTIONS = [
  { key: 'sedentary', label: 'Sedentary: little or no exercise' },
  { key: 'light', label: 'Light: exercise 1-3 times/week' },
  { key: 'moderate', label: 'Moderate: exercise 4-5 times/week' },
  { key: 'active', label: 'Active: daily exercise or intense exercise 3-4 times/week' },
  { key: 'veryActive', label: 'Very Active: intense exercise 6-7 times/week' },
  { key: 'extraActive', label: 'Extra Active: very intense exercise daily, or physical job' },
];

export default function LifestyleScreen() {
  const { formData, setFormData } = useFormData();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  // Seçim
  const handleSelectActivity = (option: { key: string; label: string }) => {
    // Sadece key saklıyoruz (ör. "light"), ekranda bu görünecek
    setFormData((prev) => ({ ...prev, activityLevel: option.key }));
  };

  // Ekranda gösterilecek metin
  const initValue = formData.activityLevel || 'Seçiniz';

  const handleSave = () => {
    if (!formData.activityLevel || !formData.interestArea) {
      alert('Aktiflik seviyesi ve ilgi alanınızı girin.');
      return;
    }
    alert('Bilgiler kaydedildi!');
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yaşam Tarzı</Text>

      <ModalSelector
        data={ACTIVITY_OPTIONS}
        initValue={initValue}
        onChange={handleSelectActivity}
        style={styles.modalContainer}              // Aynı genişlik + padding
        selectTextStyle={styles.modalText}         // Metin rengi
        initValueTextStyle={styles.modalText}
        optionTextStyle={styles.modalText}
        optionContainerStyle={styles.modalOptionContainer}
        cancelText="Vazgeç"
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
