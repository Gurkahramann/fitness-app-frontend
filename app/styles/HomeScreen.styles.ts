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
import { StyleSheet } from "react-native"

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerRight: {
    flex: 1,
    marginLeft: 12,
  },
  helloText: {
    fontSize: 14,
    color: "#666",
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  viewAllText: {
    fontSize: 14,
    color: "#3DCC85",
    fontWeight: "500",
  },
  workoutProgramsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  workoutCard: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  workoutImage: {
    width: "100%",
    height: "100%",
  },
  workoutTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: 8,
    textAlign: "center",
  },
})

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  headerRight: {
    flex: 1,
    marginLeft: 12,
  },
  helloText: {
    fontSize: 14,
    color: "#ccc",
  },
  userNameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  menuButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#444",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  viewAllText: {
    fontSize: 14,
    color: "#3DCC85",
    fontWeight: "500",
  },
  workoutProgramsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  workoutCard: {
    width: 120,
    height: 160,
    marginRight: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  workoutImage: {
    width: "100%",
    height: "100%",
  },
  workoutTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    color: "#fff",
    padding: 8,
    textAlign: "center",
  },
})

