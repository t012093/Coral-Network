import React from 'react';
import { motion } from 'framer-motion';

interface User {
  name: string;
  username: string;
  bio: string;
  avatarUrl: string;
  joinDate: string;
  contributions: number;
  followers: number;
  following: number;
  skills: string[];
  interests: string[];
  achievements: {
    title: string;
    description: string;
    icon: string;
  }[];
}

interface AccountPageProps {
  onSettingsClick: () => void;
}

const mockUser: User = {
  name: "山田 太郎",
  username: "@yamada_taro",
  bio: "Web3とARの未来を探求するエンジニア。コミュニティ運営とオープンソース開発に携わっています。",
  avatarUrl: "/avatar.jpg",
  joinDate: "2024-01-01",
  contributions: 256,
  followers: 128,
  following: 89,
  skills: ["React", "TypeScript", "AR/VR", "Web3", "Blockchain"],
  interests: ["都市開発", "デジタルアート", "コミュニティ", "サステナビリティ"],
  achievements: [
    {
      title: "プロジェクトリーダー",
      description: "3つのプロジェクトを成功に導きました",
      icon: "🏆"
    },
    {
      title: "イノベーター",
      description: "10件の革新的なアイデアを提案",
      icon: "💡"
    },
    {
      title: "コミュニティビルダー",
      description: "100人以上のメンバーを支援",
      icon: "🤝"
    }
  ]
};

const AccountPage: React.FC<AccountPageProps> = ({ onSettingsClick }) => {
  return (
    <div className="space-y-6">
      {/* プロフィールヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden"
      >
        {/* カバー画像 */}
        <div className="h-48 bg-gradient-to-r from-primary/20 to-secondary/20 relative">
          <div className="absolute -bottom-12 left-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-r from-primary to-secondary p-1">
              <div className="w-full h-full bg-white rounded-2xl flex items-center justify-center text-2xl">
                {mockUser.name[0]}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14 px-6 pb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">{mockUser.name}</h2>
              <p className="text-gray-500">{mockUser.username}</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium shadow-sm"
              onClick={onSettingsClick}
            >
              プロフィールを編集
            </motion.button>
          </div>

          <p className="text-gray-600 mb-4">
            {mockUser.bio}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(mockUser.joinDate).toLocaleDateString('ja-JP')}に参加</span>
            </div>
            <div className="flex items-center gap-4">
              <span><strong className="text-gray-900">{mockUser.followers}</strong> フォロワー</span>
              <span><strong className="text-gray-900">{mockUser.following}</strong> フォロー中</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* スキルと興味 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6"
        >
          <h3 className="text-lg font-bold mb-4">スキル</h3>
          <div className="flex flex-wrap gap-2">
            {mockUser.skills.map(skill => (
              <span
                key={skill}
                className="px-3 py-1 bg-primary/5 text-primary rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6"
        >
          <h3 className="text-lg font-bold mb-4">興味のある分野</h3>
          <div className="flex flex-wrap gap-2">
            {mockUser.interests.map(interest => (
              <span
                key={interest}
                className="px-3 py-1 bg-secondary/5 text-secondary rounded-full text-sm"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* 実績 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6"
      >
        <h3 className="text-lg font-bold mb-4">実績</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockUser.achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="p-4 rounded-xl bg-gray-50"
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <h4 className="font-bold mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* 設定セクション */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6"
      >
        <h3 className="text-lg font-bold mb-4">設定</h3>
        <div className="space-y-4">
          <motion.button
            onClick={onSettingsClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div>
              <h4 className="font-medium">アカウント設定</h4>
              <p className="text-sm text-gray-500">プロフィールやパスワードの変更</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={onSettingsClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div>
              <h4 className="font-medium">通知設定</h4>
              <p className="text-sm text-gray-500">メールや通知の管理</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
          <motion.button
            onClick={onSettingsClick}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
          >
            <div>
              <h4 className="font-medium">プライバシー設定</h4>
              <p className="text-sm text-gray-500">公開範囲とデータの管理</p>
            </div>
            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountPage;
