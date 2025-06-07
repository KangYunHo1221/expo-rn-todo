import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dashboard } from './Dashboard';
import { DietTracker } from './DietTracker';
import { WorkoutTracker } from './WorkoutTracker';
import { Statistics } from './Statistics';
import { Challenges } from './Challenges';
import  Navigation  from '../components/Navigation';      

export default function Index() {
  const [currentTab, setCurrentTab] = useState('dashboard');

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'diet':
        return <DietTracker />;
      case 'workout':
        return <WorkoutTracker />;
      case 'statistics':
        return <Statistics />;
      case 'challenges':
        return <Challenges />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FitLife</Text>
        <Text style={styles.subtitle}>당신의 건강한 습관을 응원합니다 💪</Text>
      </View>
      
      <View style={styles.content}>
        {renderContent()}
      </View>
      
      <Navigation currentTab={currentTab} onTabChange={setCurrentTab} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 