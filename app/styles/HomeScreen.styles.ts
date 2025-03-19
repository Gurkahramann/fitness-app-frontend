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
import { StyleSheet } from 'react-native';

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    justifyContent: 'center',
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
    justifyContent: 'center',
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
});
