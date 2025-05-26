"use client"

import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CustomDateTimeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSelect: (date: Date) => void;
  isDark: boolean;
  selectedDate: Date;
  maximumDate?: Date;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CALENDAR_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

const CustomDateTimeModal: React.FC<CustomDateTimeModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  isDark,
  selectedDate,
  maximumDate,
}) => {
  const [tempDate, setTempDate] = React.useState<Date>(selectedDate);
  const [showNativePicker, setShowNativePicker] = React.useState(Platform.OS === 'android' && isVisible);

  // Handle date change
  const handleChange = (_: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowNativePicker(false);
    }
    if (date) {
      setTempDate(date);
      if (Platform.OS === 'android') {
        onSelect(date);
        onClose();
      }
    }
  };

  // Handle confirm button press
  const handleConfirm = () => {
    onSelect(tempDate);
    onClose();
  };

  // Reset temp date when modal opens
  React.useEffect(() => {
    if (isVisible) {
      setTempDate(selectedDate);
      if (Platform.OS === 'android') {
        setShowNativePicker(true);
      }
    }
  }, [isVisible, selectedDate]);

  const formatHeaderDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  if (Platform.OS === 'android') {
    if (!isVisible) return null;
    return showNativePicker ? (
      <DateTimePicker
        value={tempDate}
        mode="date"
        display="calendar"
        onChange={handleChange}
        maximumDate={maximumDate}
      />
    ) : null;
  }

  // iOS Modal UI
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View
          style={[
            styles.modalContent,
            { backgroundColor: isDark ? '#1e1e1e' : '#fff' }
          ]}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={(e) => e.stopPropagation()}
          >
            <View style={styles.modalHeader}>
              <View style={styles.headerContent}>
                <Text
                  style={[
                    styles.modalTitle,
                    { color: isDark ? '#fff' : '#000' }
                  ]}
                >
                  {formatHeaderDate(tempDate)}
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color={isDark ? '#fff' : '#000'}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={maximumDate}
                textColor={isDark ? '#fff' : '#000'}
                style={styles.iOSPicker}
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[
                  styles.cancelButton,
                  { borderColor: isDark ? '#444' : '#ddd' }
                ]}
                onPress={onClose}
              >
                <Text style={{ color: isDark ? '#fff' : '#000' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.confirmButton,
                  { backgroundColor: isDark ? '#fff' : '#000' }
                ]}
                onPress={handleConfirm}
              >
                <Text style={{ color: isDark ? '#000' : '#fff' }}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: CALENDAR_WIDTH,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flex: 1,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  closeButton: {
    padding: 4,
    marginLeft: 16,
  },
  pickerContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  iOSPicker: {
    width: CALENDAR_WIDTH - 32,
    height: 200,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});

export default CustomDateTimeModal; 