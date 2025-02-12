import React from 'react';
import {
  ContributionSummary,
  // ContributionLevel, // 後で使用する可能性あり
  CONTRIBUTION_LEVELS,
} from '../types/contribution';

interface ContributionDisplayProps {
  summary: ContributionSummary;
}

const ContributionDisplay: React.FC<ContributionDisplayProps> = ({ summary }) => {
  const currentLevel = CONTRIBUTION_LEVELS.find(
    (level) => level.level === summary.level
  )!;
  const nextLevel = CONTRIBUTION_LEVELS.find(
    (level) => level.level === summary.level + 1
  );

  const calculateProgress = (): number => {
    if (!nextLevel) return 100;
    const pointsInCurrentLevel =
      summary.totalPoints - currentLevel.requiredPoints;
    const pointsNeededForNextLevel =
      nextLevel.requiredPoints - currentLevel.requiredPoints;
    return Math.min(
      (pointsInCurrentLevel / pointsNeededForNextLevel) * 100,
      100
    );
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getCategoryIcon = (category: string): string => {
    const icons: Record<string, string> = {
      project_creation: '🌟',
      task_completion: '✅',
      code_review: '💻',
      documentation: '📝',
      idea_suggestion: '💡',
      bug_report: '🐛',
      community_support: '🤝',
    };
    return icons[category] || '📋';
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* レベル情報 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{currentLevel.title}</h3>
          <span className="text-sm text-gray-600">
            ランク: #{summary.rank}
          </span>
        </div>
        
        {/* レベル進捗バー */}
        <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{summary.totalPoints} ポイント</span>
          {nextLevel && (
            <span>次のレベルまで: {nextLevel.requiredPoints - summary.totalPoints} ポイント</span>
          )}
        </div>
      </div>

      {/* カテゴリー別内訳 */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold mb-3">カテゴリー別貢献</h4>
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(summary.categoryBreakdown).map(([category, points]) => (
            <div
              key={category}
              className="flex items-center space-x-2 p-2 bg-gray-50 rounded"
            >
              <span>{getCategoryIcon(category)}</span>
              <div className="flex-1">
                <div className="text-sm font-medium">
                  {category
                    .split('_')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')}
                </div>
                <div className="text-xs text-gray-600">{points} ポイント</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 最近の貢献 */}
      <div>
        <h4 className="text-lg font-semibold mb-3">最近の貢献</h4>
        <div className="space-y-3">
          {summary.recentContributions.map((contribution) => (
            <div
              key={contribution.id}
              className="flex items-start space-x-3 p-3 bg-gray-50 rounded"
            >
              <span className="text-2xl">
                {getCategoryIcon(contribution.category)}
              </span>
              <div className="flex-1">
                <div className="text-sm font-medium">{contribution.reason}</div>
                <div className="text-xs text-gray-600 mt-1">
                  <span>{contribution.amount} ポイント</span>
                  <span className="mx-2">•</span>
                  <span>{formatDate(contribution.createdAt)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionDisplay;
