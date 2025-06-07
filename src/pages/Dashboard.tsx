import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function Dashboard() {
  const todayStats = {
    calories: 1200,
    targetCalories: 1800,
    workouts: 1,
    targetWorkouts: 1,
    waterGlasses: 6,
    targetWater: 8
  };

  const weeklyStreak = 5;

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.health.blueLight + '10' }]}>
      {/* 오늘의 성과 카드 */}
      <Card style={styles.section}>
        <LinearGradient
          colors={colors.gradient.health}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardHeader>
            <View style={styles.cardHeaderContent}>
              <Text style={styles.headerTitle}>오늘의 성과</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>연속 {weeklyStreak}일째 🔥</Text>
              </View>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.statsGrid}>
              <View style={styles.statsItem}>
                <Text style={styles.statsValue}>{todayStats.calories}</Text>
                <Text style={styles.statsLabel}>/ {todayStats.targetCalories}kcal</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsValue}>{todayStats.workouts}</Text>
                <Text style={styles.statsLabel}>/ {todayStats.targetWorkouts} 운동</Text>
              </View>
              <View style={styles.statsItem}>
                <Text style={styles.statsValue}>{todayStats.waterGlasses}</Text>
                <Text style={styles.statsLabel}>/ {todayStats.targetWater} 잔</Text>
              </View>
            </View>
          </CardContent>
        </LinearGradient>
      </Card>

      {/* 빠른 기록 버튼들 */}
      <View style={styles.quickActions}>
        <Button
          onPress={() => {}}
          style={styles.photoButton}
        >
          <MaterialCommunityIcons name="camera" size={24} color={colors.health.green} />
          <Text style={[styles.quickActionText, { color: colors.health.green }]}>식단 촬영</Text>
        </Button>
        
        <Button
          onPress={() => {}}
          style={styles.manualButton}
        >
          <MaterialCommunityIcons name="plus" size={24} color={colors.health.blue} />
          <Text style={[styles.quickActionText, { color: colors.health.blue }]}>운동 기록</Text>
        </Button>
      </View>

      {/* 최근 활동 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="trending-up" size={20} color={colors.health.green} />
            <Text style={styles.sectionTitle}>최근 활동</Text>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityTitle}>아침 식사</Text>
              <Text style={styles.activityDetail}>토스트, 계란, 우유</Text>
            </View>
            <View style={styles.activityRight}>
              <Text style={styles.activityValue}>350kcal</Text>
              <Text style={styles.activityTime}>30분 전</Text>
            </View>
          </View>
          
          <View style={styles.activityItem}>
            <View>
              <Text style={styles.activityTitle}>벤치프레스</Text>
              <Text style={styles.activityDetail}>3세트 완료</Text>
            </View>
            <View style={styles.activityRight}>
              <Text style={styles.activityValue}>70kg × 10</Text>
              <Text style={styles.activityTime}>2시간 전</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* 이번 주 성취 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="trophy" size={20} color={colors.health.blue} />
            <Text style={styles.sectionTitle}>이번 주 성취</Text>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.achievementGrid}>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementValue}>5일</Text>
              <Text style={styles.achievementLabel}>연속 운동</Text>
            </View>
            <View style={styles.achievementItem}>
              <Text style={styles.achievementValue}>12</Text>
              <Text style={styles.achievementLabel}>식단 기록</Text>
            </View>
          </View>
          
          <View style={styles.congratsCard}>
            <Text style={styles.congratsEmoji}>🎉</Text>
            <View>
              <Text style={styles.congratsTitle}>축하합니다!</Text>
              <Text style={styles.congratsText}>이번 주 목표 달성률 85%</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* 동기부여 메시지 */}
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
              오늘도 멋진 하루를 보내고 있어요!
            </Text>
            <Text style={styles.motivationText}>
              작은 습관이 큰 변화를 만듭니다
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
    ...shadows.base,
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
  activityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  activityTitle: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  activityDetail: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  activityRight: {
    alignItems: 'flex-end',
  },
  activityValue: {
    ...typography.base,
    color: colors.health.green,
    fontWeight: '500',
  },
  activityTime: {
    ...typography.xs,
    color: colors.mutedForeground,
  },
  achievementGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  achievementItem: {
    flex: 1,
    padding: spacing.md,
    backgroundColor: colors.health.blueLight + '20',
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  achievementValue: {
    ...typography.xl,
    color: colors.health.blue,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  achievementLabel: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  congratsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.warning + '10',
    borderWidth: 1,
    borderColor: colors.warning + '20',
    borderRadius: borderRadius.lg,
  },
  congratsEmoji: {
    fontSize: 24,
  },
  congratsTitle: {
    ...typography.base,
    color: colors.warning,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  congratsText: {
    ...typography.sm,
    color: colors.warning,
    opacity: 0.8,
  },
  motivationCard: {
    margin: spacing.lg,
    backgroundColor: 'transparent',
    ...shadows.base,
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