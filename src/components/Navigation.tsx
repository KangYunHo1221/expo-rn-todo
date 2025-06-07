import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type NavigationProps = {
  currentTab: string;
  onTabChange: (tab: string) => void;
};

export default function Navigation({ currentTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'dashboard', icon: 'home', label: '홈' },
    { id: 'diet', icon: 'nutrition', label: '식단' },
    { id: 'workout', icon: 'fitness', label: '운동' },
    { id: 'statistics', icon: 'stats-chart', label: '통계' },
    { id: 'challenges', icon: 'trophy', label: '챌린지' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={styles.tab}
          onPress={() => onTabChange(tab.id)}
        >
          <Ionicons
            name={tab.icon as any}
            size={24}
            color={currentTab === tab.id ? '#007AFF' : '#666'}
          />
          <Text
            style={[
              styles.label,
              currentTab === tab.id && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
  activeLabel: {
    color: '#007AFF',
  },
}); 