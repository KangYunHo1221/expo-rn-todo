import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Meal = {
  id: string;
  name: string;
  calories: number;
  time: string;
};

export default function DietTracker() {
  const [meals, setMeals] = useState<Meal[]>([
    { id: '1', name: '아침', calories: 350, time: '08:00' },
    { id: '2', name: '점심', calories: 650, time: '12:30' },
    { id: '3', name: '저녁', calories: 550, time: '18:00' },
  ]);

  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0);
  const dailyGoal = 2000;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 식단</Text>
        <Text style={styles.subtitle}>
          {totalCalories} / {dailyGoal} kcal
        </Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progress, 
              { width: `${Math.min((totalCalories / dailyGoal) * 100, 100)}%` }
            ]} 
          />
        </View>
      </View>

      <View style={styles.mealList}>
        {meals.map((meal) => (
          <View key={meal.id} style={styles.mealCard}>
            <View style={styles.mealHeader}>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealTime}>{meal.time}</Text>
            </View>
            <Text style={styles.mealCalories}>{meal.calories} kcal</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={24} color="#007AFF" />
        <Text style={styles.addButtonText}>식사 추가하기</Text>
      </TouchableOpacity>
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007AFF',
  },
  mealList: {
    padding: 20,
  },
  mealCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '600',
  },
  mealTime: {
    color: '#666',
  },
  mealCalories: {
    fontSize: 16,
    color: '#007AFF',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  addButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 