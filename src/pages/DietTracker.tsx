import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FoodEntry {
  id: string;
  name: string;
  calories: number;
  time: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

export function DietTracker() {
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>([
    {
      id: '1',
      name: '아침 식사',
      calories: 350,
      time: '08:30',
      type: 'breakfast'
    },
    {
      id: '2',
      name: '점심 식사',
      calories: 550,
      time: '12:30',
      type: 'lunch'
    }
  ]);

  const [isAddingFood, setIsAddingFood] = useState(false);
  const [newFood, setNewFood] = useState({
    name: '',
    calories: '',
    type: 'breakfast' as FoodEntry['type']
  });

  const totalCalories = foodEntries.reduce((sum, entry) => sum + entry.calories, 0);
  const targetCalories = 2000;
  const remainingCalories = targetCalories - totalCalories;

  const getMealTypeEmoji = (type: FoodEntry['type']) => {
    switch (type) {
      case 'breakfast': return '🍳';
      case 'lunch': return '🍱';
      case 'dinner': return '🍽️';
      case 'snack': return '🍎';
    }
  };

  const handleAddFood = () => {
    if (!newFood.name || !newFood.calories) return;

    const entry: FoodEntry = {
      id: Date.now().toString(),
      name: newFood.name,
      calories: parseInt(newFood.calories),
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' }),
      type: newFood.type
    };

    setFoodEntries([...foodEntries, entry]);
    setNewFood({ name: '', calories: '', type: 'breakfast' });
    setIsAddingFood(false);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.health.blueLight + '10' }]}>
      {/* 칼로리 상태 카드 */}
      <Card style={styles.section}>
        <LinearGradient
          colors={colors.gradient.health}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardHeader>
            <View style={styles.cardHeaderContent}>
              <Text style={styles.headerTitle}>오늘의 칼로리</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>목표: {targetCalories}kcal</Text>
              </View>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.calorieStats}>
              <View style={styles.calorieItem}>
                <Text style={styles.calorieValue}>{totalCalories}</Text>
                <Text style={styles.calorieLabel}>섭취</Text>
              </View>
              <View style={styles.calorieItem}>
                <Text style={styles.calorieValue}>{remainingCalories}</Text>
                <Text style={styles.calorieLabel}>남은 칼로리</Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(totalCalories / targetCalories) * 100}%` }
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
          <Text style={[styles.quickActionText, { color: colors.health.green }]}>사진으로 추가</Text>
        </Button>
        
        <Button
          onPress={() => setIsAddingFood(true)}
          style={styles.manualButton}
        >
          <MaterialCommunityIcons name="plus" size={24} color={colors.health.blue} />
          <Text style={[styles.quickActionText, { color: colors.health.blue }]}>수동으로 추가</Text>
        </Button>
      </View>

      {/* 수동 입력 폼 */}
      {isAddingFood && (
        <Card style={styles.section}>
          <CardHeader>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="food" size={20} color={colors.health.green} />
              <Text style={styles.sectionTitle}>음식 추가</Text>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>음식 이름</Text>
              <TextInput
                style={styles.input}
                value={newFood.name}
                onChangeText={(text) => setNewFood({ ...newFood, name: text })}
                placeholder="예: 닭가슴살 샐러드"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>칼로리</Text>
              <TextInput
                style={styles.input}
                value={newFood.calories}
                onChangeText={(text) => setNewFood({ ...newFood, calories: text })}
                placeholder="예: 350"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>식사 종류</Text>
              <View style={styles.mealTypeButtons}>
                {(['breakfast', 'lunch', 'dinner', 'snack'] as const).map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.mealTypeButton,
                      newFood.type === type && styles.mealTypeButtonActive
                    ]}
                    onPress={() => setNewFood({ ...newFood, type })}
                  >
                    <Text style={[
                      styles.mealTypeText,
                      newFood.type === type && styles.mealTypeTextActive
                    ]}>
                      {getMealTypeEmoji(type)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View style={styles.formActions}>
              <Button
                onPress={() => setIsAddingFood(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelButtonText}>취소</Text>
              </Button>
              <Button
                onPress={handleAddFood}
                style={styles.submitButton}
              >
                <Text style={styles.submitButtonText}>추가</Text>
              </Button>
            </View>
          </CardContent>
        </Card>
      )}

      {/* 오늘의 식단 기록 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="food-apple" size={20} color={colors.health.green} />
            <Text style={styles.sectionTitle}>오늘의 식단</Text>
          </View>
        </CardHeader>
        <CardContent>
          {foodEntries.map((entry) => (
            <View key={entry.id} style={styles.foodEntry}>
              <View style={styles.foodEntryLeft}>
                <Text style={styles.foodEmoji}>{getMealTypeEmoji(entry.type)}</Text>
                <View>
                  <Text style={styles.foodName}>{entry.name}</Text>
                  <Text style={styles.foodTime}>{entry.time}</Text>
                </View>
              </View>
              <Text style={styles.foodCalories}>{entry.calories}kcal</Text>
            </View>
          ))}
        </CardContent>
      </Card>

      {/* 식단 팁 */}
      <Card style={styles.motivationCard}>
        <LinearGradient
          colors={colors.gradient.healthLight}
          style={styles.motivationGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardContent style={styles.motivationContent}>
            <Text style={styles.motivationEmoji}>🥗</Text>
            <Text style={styles.motivationTitle}>
              균형 잡힌 식단이 건강의 기본!
            </Text>
            <Text style={styles.motivationText}>
              단백질, 탄수화물, 지방을 골고루 섭취하세요
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
  calorieStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.md,
  },
  calorieItem: {
    alignItems: 'center',
  },
  calorieValue: {
    ...typography['2xl'],
    color: colors.primaryForeground,
    fontWeight: 'bold',
  },
  calorieLabel: {
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
  mealTypeButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  mealTypeButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mealTypeButtonActive: {
    backgroundColor: colors.health.green,
  },
  mealTypeText: {
    fontSize: 24,
  },
  mealTypeTextActive: {
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
  foodEntry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  foodEntryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  foodEmoji: {
    fontSize: 24,
  },
  foodName: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  foodTime: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  foodCalories: {
    ...typography.base,
    color: colors.health.green,
    fontWeight: '500',
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