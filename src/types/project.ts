export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
  status: 'planning' | 'in_progress' | 'completed' | 'active';
  progress: number; // 0-100
  githubUrl?: string;
  tags: string[];
  metrics: {
    stars: number;
    likes: number;
    contributors: number;
  };
  team: {
    members: number;
    required: number;
  };
  timeline: {
    startDate: string;
    estimatedEndDate: string;
  };
  duration: string;
  techStack: string[];
  participants: {
    count: number;
    total: number;
    active: number;
    target: number;
    growth: number;
  };
  support: {
    amount: number;
    total: number;
    monthly: number;
    target: number;
    growth: number;
  };
  activities: {
    count: number;
    commits: number;
    pullRequests: number;
    issues: number;
    growth: number;
  };
  impact: {
    users: number;
    transactions: number;
    community: number;
    recoveryArea: number;
    biodiversityGrowth: number;
    communityGrowth: number;
  };
}

export const mockProject: Project = {
  id: '1',
  title: 'DecenSNS プロジェクト',
  description: '分散型SNSプラットフォームの開発プロジェクト。Web3技術を活用して、ユーザーデータの主権を取り戻し、より透明性の高いソーシャルネットワークを構築します。',
  shortDescription: '分散型SNSの開発プロジェクト',
  content: '分散型SNSの開発始めました！🚀\nWeb3の未来を一緒に作っていきましょう！ #blockchain #web3 #cryptocurrency',
  imageUrl: 'https://api.dicebear.com/7.x/identicon/svg?seed=project1',
  status: 'active',
  progress: 25,
  githubUrl: 'https://github.com/decensns/project',
  tags: ['#blockchain', '#web3', '#cryptocurrency', '#decentralization'],
  metrics: {
    stars: 128,
    likes: 256,
    contributors: 15
  },
  team: {
    members: 8,
    required: 12
  },
  timeline: {
    startDate: '2024-01-01',
    estimatedEndDate: '2024-12-31'
  },
  duration: '12ヶ月',
  techStack: ['React', 'TypeScript', 'Solidity', 'IPFS', 'Ethereum'],
  participants: {
    count: 150,
    total: 150,
    active: 85,
    target: 200,
    growth: 15
  },
  support: {
    amount: 1500,
    total: 1500,
    monthly: 300,
    target: 5000,
    growth: 25
  },
  activities: {
    count: 646,
    commits: 423,
    pullRequests: 128,
    issues: 95,
    growth: 32
  },
  impact: {
    users: 1200,
    transactions: 15000,
    community: 3500,
    recoveryArea: 2500,
    biodiversityGrowth: 45,
    communityGrowth: 28
  }
};
