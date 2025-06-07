import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { colors, spacing, typography, borderRadius, shadows } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type TimeRange = 'week' | 'month' | 'year';

interface StatItem {
  label: string;
  value: number;
  unit: string;
  change: number;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
}

interface Achievement {
  title: string;
  emoji: string;
  achieved: boolean;
}

export function Statistics() {
  const [timeRange, setTimeRange] = useState<TimeRange>('week');

  const stats: StatItem[] = [
    {
      label: '총 운동 시간',
      value: 420,
      unit: '분',
      change: 15,
      icon: 'clock-outline',
      color: colors.health.blue
    },
    {
      label: '소모 칼로리',
      value: 2500,
      unit: 'kcal',
      change: 8,
      icon: 'fire',
      color: colors.health.orange
    },
    {
      label: '운동 횟수',
      value: 12,
      unit: '회',
      change: 20,
      icon: 'dumbbell',
      color: colors.health.green
    },
    {
      label: '평균 운동 시간',
      value: 35,
      unit: '분',
      change: -5,
      icon: 'timer-outline',
      color: colors.health.purple
    }
  ];

  const weeklyData = [
    { day: '월', calories: 1600, workouts: 1 },
    { day: '화', calories: 1750, workouts: 0 },
    { day: '수', calories: 1400, workouts: 1 },
    { day: '목', calories: 1900, workouts: 1 },
    { day: '금', calories: 1650, workouts: 0 },
    { day: '토', calories: 2100, workouts: 1 },
    { day: '일', calories: 1800, workouts: 1 }
  ];

  const monthlyStats = {
    totalWorkouts: 18,
    avgCalories: 1650,
    bestStreak: 7,
    currentStreak: 5
  };

  const achievements: Achievement[] = [
    { title: '일주일 연속 운동', emoji: '🔥', achieved: true },
    { title: '목표 칼로리 달성', emoji: '🎯', achieved: true },
    { title: '월 20회 운동', emoji: '💪', achieved: false },
    { title: '완벽한 한 주', emoji: '⭐', achieved: false }
  ];

  const getTimeRangeLabel = (range: TimeRange) => {
    switch (range) {
      case 'week': return '주간';
      case 'month': return '월간';
      case 'year': return '연간';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.health.blueLight + '10' }]}>
      {/* 시간 범위 선택 */}
      <View style={styles.timeRangeContainer}>
        {(['week', 'month', 'year'] as const).map((range) => (
          <TouchableOpacity
            key={range}
            style={[
              styles.timeRangeButton,
              timeRange === range && styles.timeRangeButtonActive
            ]}
            onPress={() => setTimeRange(range)}
          >
            <Text style={[
              styles.timeRangeText,
              timeRange === range && styles.timeRangeTextActive
            ]}>
              {getTimeRangeLabel(range)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 이번 주 요약 */}
      <Card style={styles.section}>
        <LinearGradient
          colors={colors.gradient.health}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardHeader>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="calendar" size={20} color={colors.primaryForeground} />
              <Text style={[styles.sectionTitle, { color: colors.primaryForeground }]}>이번 주 요약</Text>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.weeklySummaryGrid}>
              <View style={styles.weeklySummaryItem}>
                <Text style={[styles.weeklySummaryValue, { color: colors.primaryForeground }]}>5</Text>
                <Text style={[styles.weeklySummaryLabel, { color: colors.primaryForeground }]}>운동 완료</Text>
              </View>
              <View style={styles.weeklySummaryItem}>
                <Text style={[styles.weeklySummaryValue, { color: colors.primaryForeground }]}>1,685</Text>
                <Text style={[styles.weeklySummaryLabel, { color: colors.primaryForeground }]}>평균 칼로리</Text>
              </View>
            </View>
          </CardContent>
        </LinearGradient>
      </Card>

      {/* 통계 카드들 */}
      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <CardContent>
              <View style={styles.statHeader}>
                <View style={[styles.iconContainer, { backgroundColor: stat.color + '20' }]}>
                  <MaterialCommunityIcons name={stat.icon} size={24} color={stat.color} />
                </View>
                <View style={styles.changeContainer}>
                  <MaterialCommunityIcons
                    name={stat.change >= 0 ? 'trending-up' : 'trending-down'}
                    size={16}
                    color={stat.change >= 0 ? colors.health.green : colors.health.red}
                  />
                  <Text style={[
                    styles.changeText,
                    { color: stat.change >= 0 ? colors.health.green : colors.health.red }
                  ]}>
                    {Math.abs(stat.change)}%
                  </Text>
                </View>
              </View>
              <Text style={styles.statValue}>
                {stat.value}
                <Text style={styles.statUnit}>{stat.unit}</Text>
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </CardContent>
          </Card>
        ))}
      </View>

      {/* 주간 활동 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="chart-line" size={20} color={colors.health.green} />
            <Text style={styles.sectionTitle}>주간 활동</Text>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.weeklyActivityList}>
            {weeklyData.map((day, index) => (
              <View key={index} style={styles.weeklyActivityItem}>
                <View style={styles.weeklyActivityHeader}>
                  <Text style={styles.weeklyActivityDay}>{day.day}</Text>
                  <View style={styles.weeklyActivityContent}>
                    <View style={styles.weeklyActivityBar}>
                      <View
                        style={[
                          styles.weeklyActivityFill,
                          { width: `${(day.calories / 2000) * 100}%` }
                        ]}
                      />
                    </View>
                    <Text style={styles.weeklyActivityCalories}>{day.calories}kcal</Text>
                  </View>
                </View>
                <View style={styles.weeklyActivityBadge}>
                  {day.workouts > 0 ? (
                    <View style={[styles.badge, { backgroundColor: colors.health.blue }]}>
                      <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>운동 완료</Text>
                    </View>
                  ) : (
                    <View style={[styles.badge, { backgroundColor: colors.muted }]}>
                      <Text style={[styles.badgeText, { color: colors.mutedForeground }]}>휴식일</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* 이번 달 성과 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="trophy-outline" size={20} color={colors.health.green} />
            <Text style={styles.sectionTitle}>이번 달 성과</Text>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.monthlyStatsGrid}>
            <View style={[styles.monthlyStatsItem, { backgroundColor: colors.health.blueLight + '20' }]}>
              <Text style={[styles.monthlyStatsValue, { color: colors.health.blue }]}>{monthlyStats.totalWorkouts}</Text>
              <Text style={styles.monthlyStatsLabel}>총 운동 횟수</Text>
            </View>
            <View style={[styles.monthlyStatsItem, { backgroundColor: colors.health.greenLight + '20' }]}>
              <Text style={[styles.monthlyStatsValue, { color: colors.health.green }]}>{monthlyStats.avgCalories}</Text>
              <Text style={styles.monthlyStatsLabel}>평균 칼로리</Text>
            </View>
            <View style={[styles.monthlyStatsItem, { backgroundColor: colors.health.purpleLight + '20' }]}>
              <Text style={[styles.monthlyStatsValue, { color: colors.health.purple }]}>{monthlyStats.bestStreak}</Text>
              <Text style={styles.monthlyStatsLabel}>최고 연속 기록</Text>
            </View>
            <View style={[styles.monthlyStatsItem, { backgroundColor: colors.health.orangeLight + '20' }]}>
              <Text style={[styles.monthlyStatsValue, { color: colors.health.orange }]}>{monthlyStats.currentStreak}</Text>
              <Text style={styles.monthlyStatsLabel}>현재 연속 기록</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      {/* 성취 목록 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="medal-outline" size={20} color={colors.health.blue} />
            <Text style={styles.sectionTitle}>성취 목록</Text>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <View
                key={index}
                style={[
                  styles.achievementItem,
                  achievement.achieved
                    ? { backgroundColor: colors.health.greenLight + '20', borderColor: colors.health.greenLight }
                    : { backgroundColor: colors.muted }
                ]}
              >
                <View style={styles.achievementContent}>
                  <Text style={styles.achievementEmoji}>{achievement.emoji}</Text>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                </View>
                {achievement.achieved ? (
                  <View style={[styles.badge, { backgroundColor: colors.health.green }]}>
                    <Text style={[styles.badgeText, { color: colors.primaryForeground }]}>달성!</Text>
                  </View>
                ) : (
                  <View style={[styles.badge, { backgroundColor: colors.muted }]}>
                    <Text style={[styles.badgeText, { color: colors.mutedForeground }]}>진행 중</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </CardContent>
      </Card>

      {/* 분석 코멘트 */}
      <Card style={styles.motivationCard}>
        <LinearGradient
          colors={colors.gradient.healthLight}
          style={styles.motivationGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardContent style={styles.motivationContent}>
            <View style={styles.analysisContent}>
              <Text style={styles.analysisEmoji}>📊</Text>
              <View>
                <Text style={styles.analysisTitle}>이번 주 분석</Text>
                <View style={styles.analysisList}>
                  <View style={styles.analysisItem}>
                    <MaterialCommunityIcons name="trending-up" size={16} color={colors.health.green} />
                    <Text style={styles.analysisText}>운동 일관성이 크게 향상되었습니다!</Text>
                  </View>
                  <View style={styles.analysisItem}>
                    <MaterialCommunityIcons name="trending-up" size={16} color={colors.health.green} />
                    <Text style={styles.analysisText}>목표 칼로리를 잘 유지하고 있어요</Text>
                  </View>
                  <View style={styles.analysisItem}>
                    <MaterialCommunityIcons name="trending-down" size={16} color={colors.health.orange} />
                    <Text style={styles.analysisText}>주말에도 꾸준히 운동해보세요</Text>
                  </View>
                </View>
              </View>
            </View>
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
  timeRangeContainer: {
    flexDirection: 'row',
    margin: spacing.lg,
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.xs,
    ...shadows.base,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  timeRangeButtonActive: {
    backgroundColor: colors.health.green,
  },
  timeRangeText: {
    ...typography.sm,
    color: colors.mutedForeground,
    fontWeight: '500',
  },
  timeRangeTextActive: {
    color: colors.primaryForeground,
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
  weeklySummaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  weeklySummaryItem: {
    alignItems: 'center',
  },
  weeklySummaryValue: {
    ...typography['2xl'],
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  weeklySummaryLabel: {
    ...typography.sm,
    opacity: 0.9,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: spacing.lg,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    shadowColor: shadows.base.shadowColor,
    shadowOffset: shadows.base.shadowOffset,
    shadowOpacity: shadows.base.shadowOpacity,
    shadowRadius: shadows.base.shadowRadius,
    elevation: shadows.base.elevation,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  changeText: {
    ...typography.sm,
    fontWeight: '500',
  },
  statValue: {
    ...typography['2xl'],
    color: colors.foreground,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  statUnit: {
    ...typography.base,
    color: colors.mutedForeground,
    marginLeft: spacing.xs,
  },
  statLabel: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  weeklyActivityList: {
    gap: spacing.md,
  },
  weeklyActivityItem: {
    gap: spacing.xs,
  },
  weeklyActivityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  weeklyActivityDay: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    width: 30,
  },
  weeklyActivityContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  weeklyActivityBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  weeklyActivityFill: {
    height: '100%',
    backgroundColor: colors.health.green,
    borderRadius: borderRadius.full,
  },
  weeklyActivityCalories: {
    ...typography.sm,
    color: colors.mutedForeground,
    width: 60,
  },
  weeklyActivityBadge: {
    marginLeft: 38,
  },
  badge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeText: {
    ...typography.xs,
    fontWeight: '500',
  },
  monthlyStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  monthlyStatsItem: {
    flex: 1,
    minWidth: '45%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  monthlyStatsValue: {
    ...typography.xl,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  monthlyStatsLabel: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  achievementsList: {
    gap: spacing.sm,
  },
  achievementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
  },
  achievementContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementTitle: {
    ...typography.base,
    color: colors.foreground,
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
  },
  analysisContent: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  analysisEmoji: {
    fontSize: 24,
  },
  analysisTitle: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.sm,
  },
  analysisList: {
    gap: spacing.xs,
  },
  analysisItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  analysisText: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
}); 