import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface AccountSettingsPageProps {
  onLogout?: () => void;
  onBack?: () => void;
}

const AccountSettingsPage: React.FC<AccountSettingsPageProps> = ({ onLogout = () => {}, onBack = () => {} }) => {
  const [currentTab, setCurrentTab] = useState<'profile' | 'password' | 'notifications' | 'privacy'>('profile');
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileForm, setProfileForm] = useState({
    name: '山田 太郎',
    email: 'taro.yamada@example.com',
    bio: 'Web3とARの未来を探求するエンジニア。',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <motion.button
              onClick={onBack}
              className="text-gray-500 hover:text-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>
            <h2 className="text-2xl font-bold">アカウント設定</h2>
          </div>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ログアウト
          </motion.button>
        </div>

        {/* タブナビゲーション */}
        <div className="flex space-x-2 border-b">
          {[
            { id: 'profile', label: 'プロフィール' },
            { id: 'password', label: 'パスワード' },
            { id: 'notifications', label: '通知' },
            { id: 'privacy', label: 'プライバシー' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id as typeof currentTab)}
              className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                currentTab === tab.id
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* タブコンテンツ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6"
      >
        {currentTab === 'profile' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                名前
              </label>
              <input
                type="text"
                name="name"
                value={profileForm.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                name="email"
                value={profileForm.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                自己紹介
              </label>
              <textarea
                name="bio"
                value={profileForm.bio}
                onChange={handleProfileChange}
                rows={4}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-sm"
            >
              変更を保存
            </motion.button>
          </div>
        )}

        {currentTab === 'password' && (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                現在のパスワード
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                新しいパスワード
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                新しいパスワード（確認）
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-4 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-medium shadow-sm"
            >
              パスワードを変更
            </motion.button>
          </div>
        )}

        {currentTab === 'notifications' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div>
                <h3 className="font-medium">メール通知</h3>
                <p className="text-sm text-gray-500">新着情報やアクティビティに関する通知</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div>
                <h3 className="font-medium">プッシュ通知</h3>
                <p className="text-sm text-gray-500">アプリ内の通知設定</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        )}

        {currentTab === 'privacy' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div>
                <h3 className="font-medium">プロフィールの公開設定</h3>
                <p className="text-sm text-gray-500">プロフィール情報の公開範囲を設定</p>
              </div>
              <select className="form-select rounded-xl border-gray-200 text-sm">
                <option>全員に公開</option>
                <option>フォロワーのみ</option>
                <option>非公開</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors">
              <div>
                <h3 className="font-medium">アクティビティの公開設定</h3>
                <p className="text-sm text-gray-500">あなたの活動履歴の公開範囲を設定</p>
              </div>
              <select className="form-select rounded-xl border-gray-200 text-sm">
                <option>全員に公開</option>
                <option>フォロワーのみ</option>
                <option>非公開</option>
              </select>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AccountSettingsPage;
