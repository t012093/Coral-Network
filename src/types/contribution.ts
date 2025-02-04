export interface ContributionPoint {
  id: string;
  userId: string;
  amount: number;
  reason: string;
  category: ContributionCategory;
  projectId?: string;
  createdAt: Date;
}

export type ContributionCategory =
  | 'project_creation'
  | 'task_completion'
  | 'code_review'
  | 'documentation'
  | 'idea_suggestion'
  | 'bug_report'
  | 'community_support';

export interface ContributionSummary {
  totalPoints: number;
  categoryBreakdown: Record<ContributionCategory, number>;
  recentContributions: ContributionPoint[];
  rank: number;
  level: number;
}

export interface ContributionLevel {
  level: number;
  title: string;
  requiredPoints: number;
  benefits: string[];
}

export const CONTRIBUTION_LEVELS: ContributionLevel[] = [
  {
    level: 1,
    title: "新芽のサンゴ",
    requiredPoints: 0,
    benefits: ["基本的な機能へのアクセス"]
  },
  {
    level: 2,
    title: "成長するサンゴ",
    requiredPoints: 100,
    benefits: ["プロジェクト作成権限", "投票の重み付け1.2倍"]
  },
  {
    level: 3,
    title: "活発なサンゴ",
    requiredPoints: 500,
    benefits: ["専門家バッジの取得", "投票の重み付け1.5倍"]
  },
  {
    level: 4,
    title: "サンゴの守護者",
    requiredPoints: 2000,
    benefits: ["コミュニティモデレーター権限", "投票の重み付け2倍"]
  },
  {
    level: 5,
    title: "サンゴ礁の王",
    requiredPoints: 10000,
    benefits: ["プラットフォーム開発への参加権限", "カスタムバッジの作成"]
  }
];

export function calculateLevel(points: number): ContributionLevel {
  return CONTRIBUTION_LEVELS.reduce((prev, current) => {
    if (points >= current.requiredPoints) {
      return current;
    }
    return prev;
  });
}
