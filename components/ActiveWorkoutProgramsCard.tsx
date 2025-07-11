import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

interface ActiveWorkoutProgramsCardProps {
  programs: {
    id: string | number;
    title: string;
    startDate: string;
  }[];
}

const ActiveWorkoutProgramsCard: React.FC<ActiveWorkoutProgramsCardProps> = ({ programs }) => {
  if (!programs.length) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.header}>Aktif Antrenman Programlarım</Text>
      <FlatList
        data={programs}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.programItem}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>Başlangıç: {item.startDate}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#232323',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3DCC85',
    marginBottom: 10,
  },
  programItem: {
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  date: {
    fontSize: 13,
    color: '#aaa',
    marginTop: 2,
  },
});

export default ActiveWorkoutProgramsCard; 