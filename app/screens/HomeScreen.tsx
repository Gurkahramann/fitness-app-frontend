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
import React from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  useColorScheme 
} from 'react-native';
import { lightStyles, darkStyles } from '../styles/HomeScreen.styles';

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const styles = colorScheme === 'dark' ? darkStyles : lightStyles;

  return (
    // SafeAreaView sayesinde iPhone 14 Pro vs. çentikli cihazlarda üst kısım örtüşmez
    <SafeAreaView style={styles.container}>
      {/* Header Bölümü */}
      <View style={styles.header}>
        {/* Profil Resmi */}
        <Image
          source={{ uri: 'https://via.placeholder.com/50' }}
          style={styles.profileImage}
        />

        {/* İsim/Karşılama */}
        <View style={styles.headerRight}>
          <Text style={styles.helloText}>Hello!</Text>
          <Text style={styles.userNameText}>MORGAN MAXWELL</Text>
        </View>

        {/* Menü Butonu (placeholder) */}
        <TouchableOpacity style={styles.menuButton}>
          <Text style={{ color: colorScheme === 'dark' ? '#000' : '#FFF' }}>☰</Text>
        </TouchableOpacity>
      </View>

      {/* Burada arama alanı, workout programları vb. gelecek */}
      <View style={{ padding: 16 }}>
        <Text style={{ color: colorScheme === 'dark' ? '#fff' : '#000' }}>
          Buraya arama çubuğu, kategoriler, vb. ekleyeceğiz.
        </Text>
      </View>
    </SafeAreaView>
  );
}

