import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: '#ccc',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});

export default styles;
