import { StyleSheet } from 'react-native';

// 📌 Temel buton stilleri
const baseStyles = StyleSheet.create({
  button: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 14,
    marginVertical: 10,
    alignItems: 'center',
  }, // 💡 Tip uyuşmazlığı yaşanmaması için ekledik
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
});

// 📌 Light Mode Stilleri
export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  } ,
  label: {
    color: '#000',
    marginBottom: 4,
  } ,
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 12,
    color: '#000',
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
  } ,
  modalSelector: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
    width: '100%',
    maxWidth: 400,
  } ,
  ...baseStyles, // ✅ Sorunsuz birleştirme
});

// 📌 Dark Mode Stilleri
export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  } ,
  label: {
    color: '#FFF',
    marginBottom: 4,
  } ,
  input: {
    borderWidth: 1,
    borderColor: '#555',
    marginBottom: 12,
    padding: 12,
    color: '#FFF',
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
  } ,
  modalSelector: {
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
    width: '100%',
    maxWidth: 400,
  } ,
  ...baseStyles, // ✅ Sorunsuz birleştirme
});
