"use client"

import React, { useState, useEffect } from "react"
import { Modal, View, Text, TouchableOpacity, StyleSheet, Platform, Dimensions } from "react-native"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import DateTimePicker from "@react-native-community/datetimepicker"

interface CustomDateModalProps {
  isVisible: boolean
  onClose: () => void
  onSelect: (date: string) => void
  isDark: boolean
  selectedDate: string
  maxDate: string
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CALENDAR_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

const CustomDateModal: React.FC<CustomDateModalProps> = ({
  isVisible,
  onClose,
  onSelect,
  isDark,
  selectedDate,
  maxDate,
}) => {
  // Convert string dates to Date objects
  const parseDate = (dateStr: string): Date => {
    try {
      const [year, month, day] = dateStr.split('/')
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    } catch (error) {
      console.error("Error parsing date:", error)
      return new Date()
    }
  }

  const [date, setDate] = useState<Date>(parseDate(selectedDate))
  const [showPicker, setShowPicker] = useState(isVisible)

  useEffect(() => {
    setShowPicker(isVisible)
    if (isVisible) {
      setDate(parseDate(selectedDate))
    }
  }, [isVisible, selectedDate])

  const formatDate = (date: Date): string => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}/${month}/${day}`
  }

  const handleChange = (_: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate)
      if (Platform.OS === 'android') {
        setShowPicker(false)
        onSelect(formatDate(selectedDate))
        onClose()
      }
    } else if (Platform.OS === 'android') {
      setShowPicker(false)
      onClose()
    }
  }

  const handleConfirm = () => {
    onSelect(formatDate(date))
    onClose()
  }

  // For Android, show the native picker directly
  if (Platform.OS === 'android') {
    if (!showPicker) return null
    return (
      <DateTimePicker
        value={date}
        mode="date"
        display="calendar"
        onChange={handleChange}
        maximumDate={parseDate(maxDate)}
      />
    )
  }

  // For iOS, show in modal
  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPress={onClose}
      >
        <View style={[styles.modalContent, { backgroundColor: isDark ? "#1e1e1e" : "#fff" }]}>
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: isDark ? "#fff" : "#000" }]}>
                {date.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <MaterialCommunityIcons name="close" size={24} color={isDark ? "#fff" : "#000"} />
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={handleChange}
                maximumDate={parseDate(maxDate)}
                textColor={isDark ? "#fff" : "#000"}
                style={styles.iOSPicker}
              />
            </View>

            <View style={styles.modalFooter}>
              <TouchableOpacity
                style={[styles.cancelButton, { borderColor: isDark ? "#444" : "#ddd" }]}
                onPress={onClose}
              >
                <Text style={{ color: isDark ? "#fff" : "#000" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.confirmButton, { backgroundColor: isDark ? "#fff" : "#000" }]}
                onPress={handleConfirm}
              >
                <Text style={{ color: isDark ? "#000" : "#fff" }}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

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
  modalTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 4,
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
})

export default CustomDateModal
