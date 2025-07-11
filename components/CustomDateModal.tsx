"use client"

import React, { useState } from 'react';
import { Modal, View, StyleSheet, TouchableOpacity, Text, useColorScheme } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface CustomDateModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  initialDate: string; // 'YYYY-MM-DD'
  mode?: 'birthdate' | 'workout'; // yeni prop
}

const CustomDateModal: React.FC<CustomDateModalProps> = ({
  visible,
  onClose,
  onSelectDate,
  initialDate,
  mode = 'workout',
}) => {
  const isDark = useColorScheme() === 'dark';
  const [selected, setSelected] = useState(initialDate);

  const localDate = new Date();
  const year = localDate.getFullYear();
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  // maxDate: doğum günü için bugün, workout için yok
  // minDate: workout için bugün, doğum günü için yok
  const calendarProps: any = {
    current: initialDate,
    onDayPress: (day: any) => {
      setSelected(day.dateString);
      onSelectDate(new Date(day.dateString + 'T00:00:00Z'));
    },
    markedDates: {
      [selected]: { selected: true, disableTouchEvent: true, selectedColor: '#3DCC85' },
    },
    theme: {
      backgroundColor: isDark ? '#222' : '#fff',
      calendarBackground: isDark ? '#222' : '#fff',
      textSectionTitleColor: '#3DCC85',
      selectedDayBackgroundColor: '#3DCC85',
      selectedDayTextColor: '#ffffff',
      todayTextColor: '#3DCC85',
      dayTextColor: isDark ? '#fff' : '#2d4150',
      textDisabledColor: isDark ? '#555' : '#d9e1e8',
      dotColor: '#3DCC85',
      selectedDotColor: '#ffffff',
      arrowColor: '#3DCC85',
      monthTextColor: isDark ? '#fff' : '#000',
      indicatorColor: 'blue',
      textDayFontSize: 16,
      textMonthFontSize: 16,
      textDayHeaderFontSize: 14,
    },
  };
  if (mode === 'workout') {
    calendarProps.minDate = todayStr;
  } else if (mode === 'birthdate') {
    calendarProps.maxDate = todayStr;
  }

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: isDark ? '#222' : '#fff' }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: isDark ? '#fff' : '#000' }]}>Başlangıç Tarihi Seç</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={28} color={isDark ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>
          <Calendar {...calendarProps} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '92%',
    borderRadius: 18,
    padding: 20,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomDateModal;
