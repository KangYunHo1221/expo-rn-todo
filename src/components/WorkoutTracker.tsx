import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Exercise = {
  id: string;
  name: string;
  duration: number;
  calories: number;
  completed: boolean;
};

export default function WorkoutTracker() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: '러닝', duration: 30, calories: 300, completed: true },
    { id: '2', name: '스쿼트', duration: 15, calories: 150, completed: false },
    { id: '3', name: '플랭크', duration: 5, calories: 50, completed: false },
  ]);

  const totalDuration = exercises.reduce((sum, ex) => sum + (ex.completed ? ex.duration : 0), 0);
  const totalCalories = exercises.reduce((sum, ex) => sum + (ex.completed ? ex.calories : 0), 0);

  const toggleExercise = (id: string) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, completed: !ex.completed } : ex
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>오늘의 운동</Text>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalDuration}</Text>
            <Text style={styles.statLabel}>분</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{totalCalories}</Text>
            <Text style={styles.statLabel}>kcal</Text>
          </View>
        </View>
      </View>

      <View style={styles.exerciseList}>
        {exercises.map((exercise) => (
          <TouchableOpacity
            key={exercise.id}
            style={[
              styles.exerciseCard,
              exercise.completed && styles.exerciseCardCompleted
            ]}
            onPress={() => toggleExercise(exercise.id)}
          >
            <View style={styles.exerciseInfo}>
              <Text style={styles.exerciseName}>{exercise.name}</Text>
              <Text style={styles.exerciseDetails}>
                {exercise.duration}분 • {exercise.calories}kcal
              </Text>
            </View>
            <Ionicons
              name={exercise.completed ? "checkmark-circle" : "ellipse-outline"}
              size={24}
              color={exercise.completed ? "#4CAF50" : "#666"}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add-circle" size={24} color="#007AFF" />
        <Text style={styles.addButtonText}>운동 추가하기</Text>
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
    marginBottom: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  exerciseList: {
    padding: 20,
  },
  exerciseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  exerciseCardCompleted: {
    backgroundColor: '#f0f9f0',
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  exerciseDetails: {
    fontSize: 14,
    color: '#666',
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