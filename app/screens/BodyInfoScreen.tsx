// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, useColorScheme } from 'react-native';
// import { useFormData } from '../context/FormContext';
// import { useRouter } from 'expo-router';

// // Stil dosyamızı içe aktarıyoruz
// import { lightStyles, darkStyles } from '../styles/body-info.styles';

// export default function BodyInfoScreen() {
//   const { formData, setFormData } = useFormData();
//   const colorScheme = useColorScheme(); // Dark/Light algılama
//   const router = useRouter();

//   // Doğru stil objesini seç
//   const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

//   const handleNext = () => {
//     if (!formData.height || !formData.weight || !formData.birthDate) {
//       alert('Boy, Kilo ve Doğum Tarihi alanlarını doldurunuz.');
//       return;
//     }
//     router.push('/life-style');
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Vücut Bilgileri</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Boy (cm)"
//         placeholderTextColor="#999"
//         keyboardType="numeric"
//         value={formData.height}
//         onChangeText={(value) => setFormData((prev) => ({ ...prev, height: value }))}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Kilo (kg)"
//         placeholderTextColor="#999"
//         keyboardType="numeric"
//         value={formData.weight}
//         onChangeText={(value) => setFormData((prev) => ({ ...prev, weight: value }))}
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="GG/AA/YYYY"
//         placeholderTextColor="#999"
//         keyboardType="numeric"
//         value={formData.birthDate}
//         onChangeText={(value) => setFormData((prev) => ({ ...prev, birthDate: value }))}
//       />

//       <TouchableOpacity style={styles.button} onPress={handleNext}>
//         <Text style={styles.buttonText}>İleri</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import Slider from '@react-native-community/slider';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // 1) Modal Datetime Picker

import { useFormData } from '../context/FormContext';
import { useRouter } from 'expo-router';
import { lightStyles, darkStyles } from '../styles/body-info.styles';

export default function BodyInfoScreen() {
  const { formData, setFormData } = useFormData();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // modal görünür mü
  const colorScheme = useColorScheme();
  const router = useRouter();

  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  // Varsayılan slider değerleri
  const heightValue = Number(formData.height) || 170;
  const weightValue = Number(formData.weight) || 70;

  // Slider callback
  const handleHeightChange = (val: number) => {
    setFormData((prev) => ({ ...prev, height: val.toString() }));
  };
  const handleWeightChange = (val: number) => {
    setFormData((prev) => ({ ...prev, weight: val.toString() }));
  };

  // Modal aç/kapa
  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  // Tarih seçildikten sonra
  const handleConfirm = (selectedDate: Date) => {
    // 1) Saat farkını (timezone offset) yok sayarak günü korumak isterseniz:
    const offsetFixedDate = removeTimeOffset(selectedDate);

    // 2) Formatlayıp context’e kaydet
    const formatted = formatDate(offsetFixedDate);
    setFormData((prev) => ({ ...prev, birthDate: formatted }));

    hideDatePicker(); // confirm (OK) ile modal kapansın
  };

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

      {/* Boy Slider */}
      <Text style={styles.subtitle}>Boy: {formData.height || 0} cm</Text>
      <Slider
        style={{ width: '100%', maxWidth: 400 }}
        minimumValue={100}
        maximumValue={220}
        step={1}
        value={heightValue}
        onValueChange={handleHeightChange}
        minimumTrackTintColor={colorScheme === 'dark' ? '#FFF' : '#000'}
        maximumTrackTintColor="#888"
        thumbTintColor={colorScheme === 'dark' ? '#FFF' : '#000'}
      />

      {/* Kilo Slider */}
      <Text style={styles.subtitle}>Kilo: {formData.weight || 0} kg</Text>
      <Slider
        style={{ width: '100%', maxWidth: 400 }}
        minimumValue={30}
        maximumValue={200}
        step={0.5}
        value={weightValue}
        onValueChange={handleWeightChange}
        minimumTrackTintColor={colorScheme === 'dark' ? '#FFF' : '#000'}
        maximumTrackTintColor="#888"
        thumbTintColor={colorScheme === 'dark' ? '#FFF' : '#000'}
      />

      {/* Doğum Tarihi Gösterimi */}
      <Text style={styles.subtitle}>
        Doğum Tarihi: {formData.birthDate || 'Seçilmedi'}
      </Text>

      {/* Tarih Seç Butonu */}
      <TouchableOpacity style={styles.button} onPress={showDatePicker}>
        <Text style={styles.buttonText}>Tarih Seç</Text>
      </TouchableOpacity>

      {/* Modal DateTimePicker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={parseDate(formData.birthDate)} // eğer formData’da tarih varsa oradan başlasın
      />

      {/* İleri */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>İleri</Text>
      </TouchableOpacity>
    </View>
  );
}

/** “GG/AA/YYYY” string -> Date objesi. Yoksa new Date() (bugün) döndürür. */
function parseDate(dateStr?: string): Date {
  if (!dateStr) return new Date();
  // 29/06/2002 => [29, 06, 2002]
  const [dd, mm, yyyy] = dateStr.split('/');
  const day = parseInt(dd, 10);
  const month = parseInt(mm, 10) - 1;
  const year = parseInt(yyyy, 10);
  return new Date(year, month, day);
}

/** Timezone offset’i sıfırlayarak “gün kayması”nı önlemeye çalışır. */
function removeTimeOffset(date: Date): Date {
  // date’in UTC’sini alıp local offset’i çıkar
  const userOffset = date.getTimezoneOffset() * 60000; // milisaniye
  return new Date(date.getTime() + userOffset);
}

/** Date -> “DD/MM/YYYY” */
function formatDate(d: Date): string {
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
}
