import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>오늘의 요약</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>칼로리 섭취</Text>
          <Text style={styles.cardValue}>1,200 / 2,000 kcal</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>운동 시간</Text>
          <Text style={styles.cardValue}>45분</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>주간 목표</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>운동 목표</Text>
          <Text style={styles.cardValue}>3/5일 완료</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>물 섭취</Text>
          <Text style={styles.cardValue}>1.5L / 2L</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
}); 