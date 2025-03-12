import { StyleSheet } from 'react-native';

// 📌 Temel stiller (Hem Light hem Dark için ortak kullanılan stiller)
const baseStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  } as const,
  title: {
    fontSize: 36,
    fontWeight: '700',
    marginBottom: 10,
  } as const,
  subtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 30,
  } as const,
  input: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    marginBottom: 10,
  } as const,
  button: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 25,
    paddingVertical: 14,
    marginVertical: 10,
    alignItems: 'center',
  } as const,
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  } as const,
};

// 📌 Light Mode Stilleri
export const lightStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#FFF',
  },
  title: {
    ...baseStyles.title,
    color: '#000',
  },
  subtitle: {
    ...baseStyles.subtitle,
    color: '#666',
  },
  input: {
    ...baseStyles.input,
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    color: '#000',
  },
  button: {
    ...baseStyles.button,
    backgroundColor: '#000',
  },
  buttonText: {
    ...baseStyles.buttonText,
    color: '#FFF',
  },
});

// 📌 Dark Mode Stilleri
export const darkStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#000',
  },
  title: {
    ...baseStyles.title,
    color: '#FFF',
  },
  subtitle: {
    ...baseStyles.subtitle,
    color: '#ccc',
  },
  input: {
    ...baseStyles.input,
    backgroundColor: '#222',
    borderColor: '#555',
    color: '#FFF',
  },
  button: {
    ...baseStyles.button,
    backgroundColor: '#FFF',
  },
  buttonText: {
    ...baseStyles.buttonText,
    color: '#000',
  },
});
