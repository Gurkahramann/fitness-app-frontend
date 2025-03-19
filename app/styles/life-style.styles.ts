import { StyleSheet } from 'react-native';

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
  input: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,           // Metin stili
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

export const lightStyles = StyleSheet.create({
  // Ana container
  container: {
    ...baseStyles.container,
    backgroundColor: '#FFF',
  },
  title: {
    ...baseStyles.title,
    color: '#000',
  },
  
  // TextInput
  input: {
    ...baseStyles.input,
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    color: '#000',
  },

  // Kaydet butonu
  button: {
    ...baseStyles.button,
    backgroundColor: '#000',
  },
  buttonText: {
    ...baseStyles.buttonText,
    color: '#FFF',
  },

  // ModalSelector container - VIEW stili, input benzeri
  modalContainer: {
    backgroundColor: '#FFF',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  // ModalSelector'da metin stili
  modalText: {
    color: '#000',
    fontSize: 16,
  },
  // Seçenek listesi
  modalOptionContainer: {
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
});

export const darkStyles = StyleSheet.create({
  container: {
    ...baseStyles.container,
    backgroundColor: '#000',
  },
  title: {
    ...baseStyles.title,
    color: '#FFF',
  },

  // TextInput
  input: {
    ...baseStyles.input,
    backgroundColor: '#222',
    borderColor: '#555',
    color: '#FFF',
  },

  // Kaydet butonu
  button: {
    ...baseStyles.button,
    backgroundColor: '#FFF',
  },
  buttonText: {
    ...baseStyles.buttonText,
    color: '#000',
  },

  // ModalSelector container
  modalContainer: {
    backgroundColor: '#000',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingVertical: 12,
    paddingHorizontal: 15,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  // Metin stili
  modalText: {
    color: '#FFF',
    fontSize: 16,
  },
  // Seçenek listesi
  modalOptionContainer: {
    backgroundColor: '#333',
    borderRadius: 8,
  },
});
