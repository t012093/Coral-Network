import React from 'react';
import { motion } from 'framer-motion';

interface Community {
  id: string;
  name: string;
  type: 'tech' | 'art' | 'food';
  description: string;
  memberCount: number;
  imageUrl: string;
  tags: string[];
  activeProjects: number;
}

const mockCommunities: Community[] = [
  {
    id: "1",
    name: "Tech Innovators",
    type: "tech",
    description: "プログラミングとAIの最新技術を探求するコミュニティ",
    memberCount: 156,
    imageUrl: "/tech-community.jpg",
    tags: ["Programming", "AI", "Web3"],
    activeProjects: 12
  },
  {
    id: "2",
    name: "Digital Artists",
    type: "art",
    description: "デジタルアートとNFTの創作活動を行うコミュニティ",
    memberCount: 89,
    imageUrl: "/art-community.jpg",
    tags: ["Digital Art", "NFT", "Creative"],
    activeProjects: 8
  },
  {
    id: "3",
    name: "Food Innovation Lab",
    type: "food",
    description: "食文化の革新と持続可能な食の未来を考えるコミュニティ",
    memberCount: 134,
    imageUrl: "/food-community.jpg",
    tags: ["Sustainable", "Innovation", "Culture"],
    activeProjects: 5
  }
];

const CommunitySpacePage: React.FC = () => {
  const typeColors = {
    tech: 'from-blue-400 to-blue-600',
    art: 'from-purple-400 to-purple-600',
    food: 'from-green-400 to-green-600'
  };

  const typeIcons = {
    tech: '💻',
    art: '🎨',
    food: '🍳'
  };

  return (
    <div className="space-y-6">
      {/* ヘッダーセクション */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          コミュニティ
        </h2>
        <p className="text-gray-600 mb-6">
          専門家と学習者が集まり、知識と経験を共有する場所です。
        </p>
        
        {/* フィルターとソート */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            全て
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            技術 💻
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            アート 🎨
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            食文化 🍳
          </button>
        </div>
      </div>

      {/* コミュニティグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockCommunities.map((community, index) => (
          <motion.div
            key={community.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200"
          >
            {/* コミュニティカードヘッダー */}
            <div className={`h-32 bg-gradient-to-r ${typeColors[community.type]} relative overflow-hidden`}>
              <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-20">
                {typeIcons[community.type]}
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white mb-1">
                  {community.name}
                </h3>
                <div className="flex items-center text-white/80 text-sm">
                  <span>{community.memberCount} メンバー</span>
                  <span className="mx-2">•</span>
                  <span>{community.activeProjects} プロジェクト</span>
                </div>
              </div>
            </div>

            {/* コミュニティ情報 */}
            <div className="p-4">
              <p className="text-gray-600 text-sm mb-4">
                {community.description}
              </p>
              
              {/* タグ */}
              <div className="flex flex-wrap gap-2 mb-4">
                {community.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* アクション */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium"
                >
                  参加する
                </motion.button>
                <button className="text-gray-400 hover:text-gray-600">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ページネーション */}
      <div className="flex justify-center mt-8">
        <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
          もっと見る
        </button>
      </div>
    </div>
  );
};

export default CommunitySpacePage;
