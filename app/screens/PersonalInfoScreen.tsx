import React from 'react';
import {
  View,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { useRouter } from 'expo-router';

import { useFormData } from '../context/FormContext';
import { lightStyles, darkStyles } from '../styles/personal-info.styles';

// Cinsiyet seçenekleri (ModalSelector, key/label formatı kullanır)
const GENDER_OPTIONS = [
  { key: '', label: 'Cinsiyet' },
  { key: 'male', label: 'Erkek' },
  { key: 'female', label: 'Kadın' },
];

export default function PersonalInfo() {
  const { formData, setFormData } = useFormData();
  const router = useRouter();
  const colorScheme = useColorScheme();

  // Temaya göre lightStyles veya darkStyles
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  // “İleri” butonuna basılınca
  const handleNext = () => {
    if (!formData.firstName || !formData.lastName || !formData.gender) {
      alert('Lütfen tüm alanları doldurunuz.');
      return;
    }
    router.push('/body-info');
  };

  // Seçili cinsiyetin “label”'ını bulalım (Arayüzde gösterim için)
  const selectedGenderLabel =
    GENDER_OPTIONS.find((opt) => opt.key === formData.gender)?.label || 'Seçiniz';

  // ModalSelector onChange callback’i
  const handleSelectGender = (option: { key: string; label: string }) => {
    setFormData((prev) => ({ ...prev, gender: option.key }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Adınız"
        placeholderTextColor="#999"
        value={formData.firstName}
        onChangeText={(value) =>
          setFormData((prev) => ({ ...prev, firstName: value }))
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Soyadınız"
        placeholderTextColor="#999"
        value={formData.lastName}
        onChangeText={(value) =>
          setFormData((prev) => ({ ...prev, lastName: value }))
        }
      />


      {/* ModalSelector Bileşeni */}
      <ModalSelector
        data={GENDER_OPTIONS}
        initValue={selectedGenderLabel} // Başlangıçta gösterilecek metin
        onChange={handleSelectGender} // Seçim yapıldığında setFormData'yı güncelle
        style={styles.modalSelector} // Kendi stil dosyamız
        selectTextStyle={{
          color: colorScheme === 'dark' ? '#FFF' : '#000',
        }}
        initValueTextStyle={{
          color: colorScheme === 'dark' ? '#FFF' : '#000',
        }}
        optionTextStyle={{
          color: colorScheme === 'dark' ? '#FFF' : '#000',
        }}
        optionContainerStyle={{
          backgroundColor: colorScheme === 'dark' ? '#333' : '#FFF',
        }}
        cancelText="Vazgeç"
      />

      {/* İleri Butonu */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>İleri {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
}
