import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface WorkoutEntry {
  id: string;
  name: string;
  duration: number;
  calories: number;
  time: string;
  type: 'strength' | 'cardio' | 'flexibility' | 'other';
}

export function WorkoutTracker() {
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([
    {
      id: '1',
      name: '벤치프레스',
      duration: 30,
      calories: 150,
      time: '10:30',
      type: 'strength'
    },
    {
      id: '2',
      name: '러닝',
      duration: 45,
      calories: 300,
      time: '15:00',
      type: 'cardio'
    }
  ]);

  const [isAddingWorkout, setIsAddingWorkout] = useState(false);
  const [newWorkout, setNewWorkout] = useState({
    name: '',
    duration: '',
    calories: '',
    type: 'strength' as WorkoutEntry['type']
  });

  const totalCalories = workoutEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const totalDuration = workoutEntries.reduce((sum, entry) => sum + entry.duration, 0);
  const targetCalories = 500;
  const targetDuration = 60;

  const getWorkoutTypeEmoji = (type: WorkoutEntry['type']) => {
    switch (type) {
      case 'strength': return '💪';
      case 'cardio': return '🏃';
      case 'flexibility': return '🧘';
      case 'other': return '🎯';
    }
  };

  const handleAddWorkout = () => {
    if (!newWorkout.name || !newWorkout.duration || !newWorkout.calories) return;

    const entry: WorkoutEntry = {
      id: Date.now().toString(),
      name: newWorkout.name,
      duration: parseInt(newWorkout.duration),
      calories: parseInt(newWorkout.calories),
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      type: newWorkout.type
    };

    setWorkoutEntries([...workoutEntries, entry]);
    setNewWorkout({ name: '', duration: '', calories: '', type: 'strength' });
    setIsAddingWorkout(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.health.blueLight + '10' }]}>
      {/* 운동 상태 카드 */}
      <Card style={styles.section}>
        <LinearGradient
          colors={colors.gradient.health}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardHeader>
            <View style={styles.cardHeaderContent}>
              <Text style={styles.headerTitle}>오늘의 운동</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>목표: {targetDuration}분</Text>
              </View>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.statsGrid}>
              <View style={styles.statsItem}>
                <Text style={styles.statsValue}>{totalDuration}</Text>
                <Text style={styles.statsLabel}>운동 시간</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsValue}>{totalCalories}</Text>
                <Text style={styles.statsLabel}>소모 칼로리</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(totalDuration / targetDuration) * 100}%` }
                ]} 
              />
            </View>
          </CardContent>
        </LinearGradient>
      </Card>

      {/* 빠른 추가 버튼들 */}
      <View style={styles.quickActions}>
        <Button
          onPress={() => {}}
          style={styles.photoButton}
        >
          <MaterialCommunityIcons name="camera" size={24} color={colors.health.green} />
          <Text style={[styles.quickActionText, { color: colors.health.green }]}>운동 인증</Text>
        </Button>
        
        <Button
          onPress={() => setIsAddingWorkout(true)}
          style={styles.manualButton}
        >
          <MaterialCommunityIcons name="plus" size={24} color={colors.health.blue} />
          <Text style={[styles.quickActionText, { color: colors.health.blue }]}>운동 기록</Text>
        </Button>
      </View>

      {/* 수동 입력 폼 */}
      {isAddingWorkout && (
        <Card style={styles.section}>
          <CardHeader>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="dumbbell" size={20} color={colors.health.green} />
              <Text style={styles.sectionTitle}>운동 추가</Text>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>운동 이름</Text>
              <TextInput
                style={styles.input}
                value={newWorkout.name}
                onChangeText={(text) => setNewWorkout({ ...newWorkout, name: text })}
                placeholder="예: 벤치프레스"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>운동 시간 (분)</Text>
              <TextInput
                style={styles.input}
                value={newWorkout.duration}
                onChangeText={(text) => setNewWorkout({ ...newWorkout, duration: text })}
                placeholder="예: 30"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>소모 칼로리</Text>
              <TextInput
                style={styles.input}
                value={newWorkout.calories}
                onChangeText={(text) => setNewWorkout({ ...newWorkout, calories: text })}
                placeholder="예: 150"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>운동 종류</Text>
              <View style={styles.workoutTypeButtons}>
                {(['strength', 'cardio', 'flexibility', 'other'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.workoutTypeButton,
                      newWorkout.type === type && styles.workoutTypeButtonActive
                    ]}
                    onPress={() => setNewWorkout({ ...newWorkout, type })}
                  >
                    <Text style={[
                      styles.workoutTypeText,
                      newWorkout.type === type && styles.workoutTypeTextActive
                    ]}>
                      {getWorkoutTypeEmoji(type)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.formActions}>
              <Button
                onPress={() => setIsAddingWorkout(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </Button>
              <Button
                onPress={handleAddWorkout}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>추가</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      )}

      {/* 오늘의 운동 기록 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="run" size={20} color={colors.health.green} />
            <Text style={styles.sectionTitle}>오늘의 운동</Text>
          </View>
        </CardHeader>
        <CardContent>
          {workoutEntries.map((entry) => (
            <View key={entry.id} style={styles.workoutEntry}>
              <View style={styles.workoutEntryLeft}>
                <Text style={styles.workoutEmoji}>{getWorkoutTypeEmoji(entry.type)}</Text>
                <View>
                  <Text style={styles.workoutName}>{entry.name}</Text>
                  <Text style={styles.workoutTime}>{entry.time}</Text>
                </View>
              </View>
              <View style={styles.workoutStats}>
                <Text style={styles.workoutDuration}>{entry.duration}분</Text>
                <Text style={styles.workoutCalories}>{entry.calories}kcal</Text>
              </View>
            </View>
          ))}
        </CardContent>
      </Card>

      {/* 운동 팁 */}
      <Card style={styles.motivationCard}>
        <LinearGradient
          colors={colors.gradient.healthLight}
          style={styles.motivationGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardContent style={styles.motivationContent}>
            <Text style={styles.motivationEmoji}>💪</Text>
            <Text style={styles.motivationTitle}>
              오늘도 멋진 운동을 하고 있어요!
            </Text>
            <Text style={styles.motivationText}>
              꾸준한 운동이 건강한 몸을 만듭니다
            </Text>
          </CardContent>
        </LinearGradient>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    margin: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    shadowColor: shadows.base.shadowColor,
    shadowOffset: shadows.base.shadowOffset,
    shadowOpacity: shadows.base.shadowOpacity,
    shadowRadius: shadows.base.shadowRadius,
    elevation: shadows.base.elevation,
  },
  headerGradient: {
    borderRadius: borderRadius.lg,
  },
  cardHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    ...typography.lg,
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  badgeText: {
    ...typography.sm,
    color: colors.primaryForeground,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsValue: {
    ...typography['2xl'],
    color: colors.primaryForeground,
    fontWeight: 'bold',
  },
  statsLabel: {
    ...typography.sm,
    color: colors.primaryForeground,
    opacity: 0.9,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.full,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primaryForeground,
    borderRadius: borderRadius.full,
  },
  quickActions: {
    flexDirection: 'row',
    gap: spacing.md,
    margin: spacing.lg,
  },
  photoButton: {
    flex: 1,
    height: 80,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.health.green,
    borderRadius: borderRadius.lg,
    flexDirection: 'column',
    gap: spacing.xs,
  },
  manualButton: {
    flex: 1,
    height: 80,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.health.blue,
    borderRadius: borderRadius.lg,
    flexDirection: 'column',
    gap: spacing.xs,
  },
  quickActionText: {
    ...typography.sm,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.lg,
    color: colors.foreground,
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: spacing.md,
  },
  inputLabel: {
    ...typography.sm,
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...typography.base,
    color: colors.foreground,
  },
  workoutTypeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  workoutTypeButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  workoutTypeButtonActive: {
    backgroundColor: colors.health.green,
  },
  workoutTypeText: {
    fontSize: 24,
  },
  workoutTypeTextActive: {
    color: colors.primaryForeground,
  },
  formActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
  },
  cancelButtonText: {
    ...typography.base,
    color: colors.mutedForeground,
    fontWeight: '500',
  },
  submitButton: {
    flex: 1,
    backgroundColor: colors.health.green,
    borderRadius: borderRadius.lg,
  },
  submitButtonText: {
    ...typography.base,
    color: colors.primaryForeground,
    fontWeight: '500',
  },
  workoutEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  workoutEntryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  workoutEmoji: {
    fontSize: 24,
  },
  workoutName: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  workoutTime: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  workoutStats: {
    alignItems: 'flex-end',
  },
  workoutDuration: {
    ...typography.base,
    color: colors.health.blue,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  workoutCalories: {
    ...typography.sm,
    color: colors.health.green,
  },
  motivationCard: {
    margin: spacing.lg,
    backgroundColor: 'transparent',
    borderRadius: borderRadius.lg,
    shadowColor: shadows.base.shadowColor,
    shadowOffset: shadows.base.shadowOffset,
    shadowOpacity: shadows.base.shadowOpacity,
    shadowRadius: shadows.base.shadowRadius,
    elevation: shadows.base.elevation,
  },
  motivationGradient: {
    borderRadius: borderRadius.lg,
  },
  motivationContent: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  motivationEmoji: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  motivationTitle: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  motivationText: {
    ...typography.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
}); 