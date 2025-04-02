import React from 'react';
import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { useFormData } from '../context/FormContext';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';

import { lightStyles, darkStyles } from '../styles/LifeStyle.styles';

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
  const {register,isLoading} = useAuth();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  // Seçim
  const handleSelectActivity = (option: { key: string; label: string }) => {
    // Sadece key sakliyoruz (ör. "light"), ekranda bu görünecek
    setFormData((prev) => ({ ...prev, activityLevel: option.key }));
  };

  // Ekranda gösterilecek metin
  const initValue = formData.activityLevel || 'Seçiniz';

  const handleSave = async () => {
    if (!formData.activityLevel || !formData.interestArea) {
      alert('Aktiflik seviyesi ve ilgi alaninizi girin.');
      return;
    }
  
    // 👉 Kayit objesini hazirliyoruz
    const registerData = {
      email: formData.email,
      password: formData.password,
      name: `${formData.firstName} ${formData.lastName}`,
      gender: (formData.gender === 'male' ? 'Male' : 'Female') as 'Male' | 'Female',
      height: Number(formData.height),
      weight: Number(formData.weight),
      age: calculateAge(formData.birthDate),
      activityLevel: formData.activityLevel,
      goal: formData.interestArea,
    };
  
    console.log("📤 Kayit verisi gönderiliyor:", registerData);
  
    try {
      const response = await register(registerData);
  
      console.log("✅ Register yaniti:", response);
  
      if (response?.success) {
        alert("🎉 Kayit basarili!");
        router.push('/login');
      } else {
        alert(`❌ Kayit baiarisiz: ${response?.message || "Bilinmeyen hata"}`);
      }
  
    } catch (error) {
      console.log("💥 Kayit hatasi:", error);
      alert("❌ Bir hata oluitu, lütfen tekrar deneyin.");
    }
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yaşam Tarzi</Text>

      <ModalSelector
        data={ACTIVITY_OPTIONS}
        initValue={initValue}
        onChange={handleSelectActivity}
        style={styles.modalContainer}
        selectTextStyle={styles.modalText}
        initValueTextStyle={styles.modalText}
        optionTextStyle={styles.modalText}
        optionContainerStyle={styles.modalOptionContainer}
        cancelText="Vazgeç"
      />

      <TextInput
        style={styles.input}
        placeholder="İlgi alaninizi girin"
        placeholderTextColor="#999"
        value={formData.interestArea}
        onChangeText={(value) => setFormData((prev) => ({ ...prev, interestArea: value }))}
      />

      <TouchableOpacity style={styles.button} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
function calculateAge(birthDateStr: string): number {
  const [day, month, year] = birthDateStr.split('/').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}
