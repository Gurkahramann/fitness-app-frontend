// import { StyleSheet } from 'react-native';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: '700',
//     color: '#fff',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#ccc',
//     marginBottom: 30,
//   },
//   button: {
//     width: '100%',
//     maxWidth: 400,
//     backgroundColor: '#fff',
//     borderRadius: 25,
//     paddingVertical: 14,
//     marginVertical: 10,
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: '#000',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   forgotPassword: {
//     fontSize: 14,
//     color: '#fff',
//     marginTop: 10,
//     textDecorationLine: 'underline',
//   },
// });

// export default styles;

// app/styles/homeScreen.styles.ts
// app/styles/homeScreen.styles.ts
// app/styles/homeScreen.styles.ts
// app/styles/homeScreen.styles.ts
// app/styles/HomeScreen.styles.ts
import { StyleSheet } from 'react-native';

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  // Üst header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerRight: {
    flex: 1,
  },
  helloText: {
    fontSize: 14,
    color: '#666',
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
  },
  menuButton: {
    width: 32,
    height: 32,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
  },

  // Bölüm başlığı
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  viewAllText: {
    fontSize: 14,
    color: '#666',
  },

  // Yatay kaydırma container
  workoutProgramsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  workoutCard: {
    width: 100,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#ddd',
    alignItems: 'center',
  },
  workoutImage: {
    width: '100%',
    height: 70,
  },
  workoutTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginVertical: 8,
  },

  // Mini takvim container
  miniCalendarContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  miniCalendar: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  headerRight: {
    flex: 1,
  },
  helloText: {
    fontSize: 14,
    color: '#ccc',
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  menuButton: {
    width: 32,
    height: 32,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  viewAllText: {
    fontSize: 14,
    color: '#888',
  },
  workoutProgramsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  workoutCard: {
    width: 100,
    marginRight: 12,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#333',
    alignItems: 'center',
  },
  workoutImage: {
    width: '100%',
    height: 70,
  },
  workoutTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
    marginVertical: 8,
  },

  miniCalendarContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
  },
  miniCalendar: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
});
