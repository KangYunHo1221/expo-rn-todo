import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, typography, borderRadius, shadows, globalStyles } from '../styles/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  target: number;
  reward: string;
  icon: string;
  isCompleted: boolean;
  isActive: boolean;
}

export function Challenges() {
  const [challenges, setChallenges] = React.useState<Challenge[]>([
    {
      id: '1',
      title: '7일 연속 운동',
      description: '일주일 동안 매일 운동하기',
      type: 'weekly',
      progress: 5,
      target: 7,
      reward: '연속 운동 마스터 배지',
      icon: '🔥',
      isCompleted: false,
      isActive: true
    },
    {
      id: '2',
      title: '일일 칼로리 목표',
      description: '오늘 목표 칼로리 달성하기',
      type: 'daily',
      progress: 1200,
      target: 1800,
      reward: '10 포인트',
      icon: '🎯',
      isCompleted: false,
      isActive: true
    },
    {
      id: '3',
      title: '월 20회 운동',
      description: '이번 달 20번 운동 완료하기',
      type: 'monthly',
      progress: 18,
      target: 20,
      reward: '월간 챔피언 배지',
      icon: '💪',
      isCompleted: false,
      isActive: true
    },
    {
      id: '4',
      title: '완벽한 주간',
      description: '운동 + 식단 모두 완벽한 일주일',
      type: 'weekly',
      progress: 7,
      target: 7,
      reward: '퍼펙트 위크 배지',
      icon: '⭐',
      isCompleted: true,
      isActive: false
    }
  ]);

  const activeChallenges = challenges.filter(c => c.isActive);
  const completedChallenges = challenges.filter(c => c.isCompleted);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily': return { bg: '#ECFDF5', text: '#059669' };
      case 'weekly': return { bg: '#EFF6FF', text: '#2563EB' };
      case 'monthly': return { bg: '#F5F3FF', text: '#7C3AED' };
      default: return { bg: '#F3F4F6', text: '#4B5563' };
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily': return '일일';
      case 'weekly': return '주간';
      case 'monthly': return '월간';
      default: return '';
    }
  };

  const calculateProgress = (progress: number, target: number) => {
    return Math.min((progress / target) * 100, 100);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.health.blueLight + '10' }]}>
      <View style={styles.header}>
        <Text style={styles.title}>챌린지</Text>
        <Text style={styles.subtitle}>건강한 습관을 만들어보세요</Text>
      </View>

      {/* 헤더 */}
      <Card style={styles.section}>
        <LinearGradient
          colors={colors.gradient.health}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <CardHeader>
            <View style={styles.headerTitleContainer}>
              <MaterialCommunityIcons name="trophy" size={24} color={colors.primaryForeground} />
              <Text style={styles.headerTitle}>도전 과제</Text>
            </View>
          </CardHeader>
          <CardContent>
            <View style={styles.headerContent}>
              <Text style={styles.completedCount}>{completedChallenges.length}</Text>
              <Text style={styles.completedLabel}>완료한 챌린지</Text>
            </View>
          </CardContent>
        </LinearGradient>
      </Card>

      {/* 활성 챌린지 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionTitleContainer}>
            <MaterialCommunityIcons name="target" size={24} color={colors.health.blue} />
            <Text style={styles.sectionTitle}>진행 중인 챌린지</Text>
          </View>
        </CardHeader>
        <CardContent>
          {activeChallenges.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>진행 중인 챌린지가 없습니다</Text>
            </View>
          ) : (
            activeChallenges.map((challenge) => {
              const typeColor = getTypeColor(challenge.type);
              return (
                <View key={challenge.id} style={[styles.challengeItem, { backgroundColor: colors.background }]}>
                  <View style={styles.challengeHeader}>
                    <View style={styles.challengeInfo}>
                      <Text style={styles.challengeEmoji}>{challenge.icon}</Text>
                      <View>
                        <Text style={styles.challengeTitle}>{challenge.title}</Text>
                        <Text style={styles.challengeDescription}>{challenge.description}</Text>
                      </View>
                    </View>
                    <View style={[styles.typeBadge, { backgroundColor: typeColor.bg }]}>
                      <Text style={[styles.typeBadgeText, { color: typeColor.text }]}>
                        {getTypeLabel(challenge.type)}
                      </Text>
                    </View>
                  </View>
                  
                  <View style={styles.progressContainer}>
                    <View style={styles.progressInfo}>
                      <Text style={styles.progressLabel}>진행률</Text>
                      <Text style={styles.progressValue}>
                        {challenge.progress} / {challenge.target}
                        {challenge.type === 'daily' && challenge.id === '2' ? 'kcal' : ''}
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <LinearGradient
                        colors={colors.gradient.primary}
                        style={[styles.progressFill, { width: `${calculateProgress(challenge.progress, challenge.target)}%` }]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                      />
                    </View>
                    <Text style={styles.rewardText}>보상: {challenge.reward}</Text>
                  </View>
                </View>
              );
            })
          )}
        </CardContent>
      </Card>

      {/* 완료된 챌린지 */}
      {completedChallenges.length > 0 && (
        <Card style={styles.section}>
          <CardHeader>
            <View style={styles.sectionTitleContainer}>
              <MaterialCommunityIcons name="star" size={24} color={colors.health.green} />
              <Text style={styles.sectionTitle}>완료한 챌린지</Text>
            </View>
          </CardHeader>
          <CardContent>
            {completedChallenges.map((challenge) => (
              <View key={challenge.id} style={[styles.completedChallengeItem, { backgroundColor: colors.health.greenLight + '20' }]}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeEmoji}>{challenge.icon}</Text>
                  <View>
                    <Text style={[styles.completedChallengeTitle, { color: colors.health.greenDark }]}>{challenge.title}</Text>
                    <Text style={[styles.completedChallengeDescription, { color: colors.health.green }]}>{challenge.description}</Text>
                  </View>
                </View>
                <View style={[styles.completedBadge, { backgroundColor: colors.health.green }]}>
                  <Text style={styles.completedBadgeText}>완료!</Text>
                </View>
              </View>
            ))}
          </CardContent>
        </Card>
      )}

      {/* 이번 주 도전 현황 */}
      <Card style={styles.section}>
        <CardHeader>
          <View style={styles.sectionTitleContainer}>
            <MaterialCommunityIcons name="calendar" size={24} color={colors.health.green} />
            <Text style={styles.sectionTitle}>이번 주 도전 현황</Text>
          </View>
        </CardHeader>
        <CardContent>
          <View style={styles.weeklyProgress}>
            {['월', '화', '수', '목', '금', '토', '일'].map((day, index) => (
              <View key={day} style={styles.dayContainer}>
                <Text style={styles.dayLabel}>{day}</Text>
                <View style={[
                  styles.dayCircle,
                  index < 5 ? { backgroundColor: colors.health.green } :
                  index === 5 ? { backgroundColor: colors.health.blue } :
                  { backgroundColor: colors.muted }
                ]}>
                  <Text style={styles.dayIcon}>
                    {index < 5 ? '✓' : index === 5 ? '💪' : ''}
                  </Text>
                </View>
              </View>
            ))}
          </View>
          <View style={styles.weeklySummary}>
            <Text style={styles.weeklyEmoji}>🔥</Text>
            <Text style={styles.weeklyTitle}>5일 연속 성공!</Text>
            <Text style={styles.weeklySubtitle}>주말까지 화이팅!</Text>
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
            <Text style={styles.motivationEmoji}>🏆</Text>
            <Text style={styles.motivationTitle}>
              챌린지를 통해 더 강해지고 있어요!
            </Text>
            <Text style={styles.motivationSubtitle}>
              작은 도전이 큰 변화를 만듭니다
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
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  title: {
    ...typography['2xl'],
    color: colors.foreground,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.base,
    color: colors.mutedForeground,
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
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  headerTitle: {
    ...typography.lg,
    color: colors.primaryForeground,
    fontWeight: '600',
  },
  headerContent: {
    alignItems: 'center',
  },
  completedCount: {
    ...typography['2xl'],
    color: colors.primaryForeground,
    fontWeight: 'bold',
    marginBottom: spacing.xs,
  },
  completedLabel: {
    ...typography.sm,
    color: colors.primaryForeground,
    opacity: 0.9,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.lg,
    color: colors.foreground,
    fontWeight: '600',
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyStateText: {
    ...typography.base,
    color: colors.mutedForeground,
  },
  challengeItem: {
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.background,
    ...shadows.sm,
  },
  challengeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  challengeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  challengeEmoji: {
    fontSize: 24,
  },
  challengeTitle: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  challengeDescription: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  typeBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  typeBadgeText: {
    ...typography.xs,
    fontWeight: '500',
  },
  progressContainer: {
    gap: spacing.xs,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressLabel: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  progressValue: {
    ...typography.sm,
    color: colors.foreground,
    fontWeight: '500',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.muted,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
  rewardText: {
    ...typography.xs,
    color: colors.mutedForeground,
  },
  completedChallengeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.health.greenLight,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  completedChallengeTitle: {
    ...typography.base,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  completedChallengeDescription: {
    ...typography.sm,
    opacity: 0.8,
  },
  completedBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  completedBadgeText: {
    ...typography.xs,
    color: colors.primaryForeground,
  },
  weeklyProgress: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLabel: {
    ...typography.xs,
    color: colors.mutedForeground,
    marginBottom: spacing.xs,
  },
  dayCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayIcon: {
    ...typography.xs,
    color: colors.primaryForeground,
    fontWeight: '500',
  },
  weeklySummary: {
    alignItems: 'center',
  },
  weeklyEmoji: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  weeklyTitle: {
    ...typography.base,
    color: colors.foreground,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  weeklySubtitle: {
    ...typography.sm,
    color: colors.mutedForeground,
  },
  motivationCard: {
    margin: spacing.lg,
    backgroundColor: colors.background,
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
  motivationSubtitle: {
    ...typography.sm,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
}); 