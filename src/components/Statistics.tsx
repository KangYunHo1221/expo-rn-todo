import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type StatCard = {
  title: string;
  value: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
};

export default function Statistics() {
  const stats: StatCard[] = [
    {
      title: '주간 운동 시간',
      value: '5.2시간',
      icon: 'time',
      trend: 'up',
      change: '+12%',
    },
    {
      title: '평균 칼로리',
      value: '1,850kcal',
      icon: 'flame',
      trend: 'down',
      change: '-5%',
    },
    {
      title: '운동 일수',
      value: '4일',
      icon: 'calendar',
      trend: 'up',
      change: '+2일',
    },
    {
      title: '달성률',
      value: '85%',
      icon: 'trophy',
      trend: 'up',
      change: '+5%',
    },
  ];

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return '#4CAF50';
      case 'down':
        return '#F44336';
      default:
        return '#666';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>통계</Text>
        <Text style={styles.subtitle}>지난 7일 기준</Text>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <View style={styles.statHeader}>
              <Ionicons name={stat.icon as any} size={24} color="#007AFF" />
              <Text style={styles.statTitle}>{stat.title}</Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <View style={styles.trendContainer}>
              <Ionicons
                name={stat.trend === 'up' ? 'arrow-up' : 'arrow-down'}
                size={16}
                color={getTrendColor(stat.trend)}
              />
              <Text
                style={[
                  styles.trendText,
                  { color: getTrendColor(stat.trend) },
                ]}
              >
                {stat.change}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>주간 활동 요약</Text>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryText}>
            이번 주는 지난 주보다 운동 시간이 12% 증가했고, 평균 칼로리 섭취는 5% 감소했습니다.
            목표 달성률이 85%로 높은 편입니다.
          </Text>
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
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  statCard: {
    width: '50%',
    padding: 10,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
}); 