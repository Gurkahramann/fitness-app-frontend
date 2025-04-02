// import React from 'react';
// import { Text, View, TouchableOpacity } from 'react-native';
// import { useRouter } from 'expo-router';
// import styles from '../styles/HomeScreen.styles';

// export default function HomeScreen() {
//   const router = useRouter();

//   return (
//     <View style={styles.container}>
//       {/* Başlık */}
//       <Text style={styles.title}>Fitness App</Text>
//       {/* Alt başlık */}
//       <Text style={styles.subtitle}>Stay in shape, stay healthy</Text>

//       {/* Sign Up Butonu */}
//       <TouchableOpacity style={styles.button} onPress={() => router.push('/signup')}>
//         <Text style={styles.buttonText}>Sign Up</Text>
//       </TouchableOpacity>

//       {/* Login Butonu */}
//       <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// app/screens/HomeScreen.tsx
// app/screens/HomeScreen.tsx
// app/screens/HomeScreen.tsx
// app/screens/HomeScreen.tsx
// app/screens/HomeScreen.tsx
// app/screens/HomeScreen.tsx

// app/screens/HomeScreen.tsx
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import { Calendar, DateData } from 'react-native-calendars';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { lightStyles, darkStyles } from '../styles/HomeScreen.styles';
import { WORKOUT_PROGRAMS } from '@/constants/workoutData';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  // Takvimde seçili gün
  const [selectedDate, setSelectedDate] = useState('');
  // Takvim büyük/küçük state
  const [calendarExpanded, setCalendarExpanded] = useState(false);

  // onDayPress callback
  const handleDayPress = (day: DateData) => {
    setSelectedDate(day.dateString);
    console.log('Takvim tıklanan gün:', day.dateString);
  };

  // Dark/Light renkleri
  const backgroundColor = colorScheme === 'dark' ? '#000' : '#FFF';
  const textColor = colorScheme === 'dark' ? '#FFF' : '#000';
  const subTextColor = colorScheme === 'dark' ? '#ccc' : '#666';

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />
        <View style={styles.headerRight}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.userNameText}>MORGAN MAXWELL</Text>
        </View>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={{ color: colorScheme === 'dark' ? '#000' : '#FFF' }}>
            ☰
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {/* WORKOUT PROGRAMS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Workout Programs</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {/* Yatay program kartları */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.workoutProgramsContainer}
        >
          {WORKOUT_PROGRAMS.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.workoutCard}
              onPress={() => console.log('Clicked:', item.title)}
            >
              <Image
                source={{ uri: item.image }}
                style={styles.workoutImage}
                resizeMode="cover"
              />
              <Text style={styles.workoutTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* TAKVİM */}
        <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
          <Text style={styles.sectionTitle}>Takvim</Text>
          <Text style={innerStyles.hintText}>
            {calendarExpanded
              ? 'Takvim büyük! Dokunarak küçültebilirsin.'
              : 'Takvime dokunarak büyütebilirsin.'}
          </Text>

          {/* Dokununca takvimi “expanded” state’ini değiştiriyoruz */}
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setCalendarExpanded(!calendarExpanded)}
            style={{
              borderRadius: 16,
              overflow: 'hidden',
              marginTop: 8,
            }}
          >
            <Calendar
              key ={colorScheme}
              style={{
                height: calendarExpanded ? 400 : 220,
                borderRadius: 16,
                overflow: 'hidden',
              }}
              onDayPress={handleDayPress}
              theme={{
                backgroundColor,                // Calendar bileşeni zemin
                calendarBackground: backgroundColor,
                dayTextColor: textColor,        // Normal gün metin rengi
                monthTextColor: textColor,      // Ay adı
                arrowColor: textColor,          // Ok (arrow) rengi
                todayTextColor: '#00adf7',      // Bugünün günü
                textSectionTitleColor: colorScheme === 'dark' ? '#999' : '#888',
                selectedDayBackgroundColor: '#3DCC85',
                selectedDayTextColor: '#FFF',
                textDisabledColor: colorScheme === 'dark' ? '#444' : '#ccc',
              }}
              markedDates={{
                [selectedDate]: {
                  selected: true,
                  selectedColor: '#3DCC85',
                },
              }}
            />
          </TouchableOpacity>
        </View>

        {/* KALORİ GÖSTERGESİ */}
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Calories</Text>
          <Text style={{ fontSize: 12, color: subTextColor }}>
            Remaining = Goal - Food
          </Text>
          <AnimatedCircularProgress
            size={120}
            width={12}
            fill={60}
            tintColor="#3498db"
            backgroundColor="#e0e0e0"
            style={{ marginVertical: 16 }}
          >
            {() => (
              <View style={innerStyles.circleInner}>
                <Text style={[innerStyles.calorieValue, { color: textColor }]}>
                  1,000
                </Text>
                <Text style={[innerStyles.calorieLabel, { color: subTextColor }]}>
                  Remaining
                </Text>
              </View>
            )}
          </AnimatedCircularProgress>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const innerStyles = StyleSheet.create({
  hintText: {
    marginTop: 4,
    fontSize: 12,
    color: '#888',
  },
  circleInner: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calorieValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  calorieLabel: {
    fontSize: 14,
  },
});
