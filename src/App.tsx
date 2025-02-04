import { motion } from 'framer-motion';
import { useState } from 'react';
import PostForm from './components/PostForm';
import PostList from './components/PostList';
import KanbanBoard from './components/KanbanBoard';
import CommunitySpacePage from './pages/CommunitySpacePage';
import NewsPage from './pages/NewsPage';
import EventPage from './pages/EventPage';
import AccountPage from './pages/AccountPage';
import AccountSettingsPage from './pages/AccountSettingsPage';

type Page = 'post' | 'project' | 'news' | 'event' | 'community' | 'account' | 'account-settings';

// Task型定義 (KanbanBoard.tsx と共通化しても良い)
interface Task {
  id: string;
  title: string;
  description: string;
  phase: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('post');
  
  // カンバンボードのタスクデータ (初期データ)
  const tasks: Task[] = [
    {
      id: "1",
      title: "UI/UXデザインの初期検討",
      description: "プラットフォーム全体のUI/UXの方向性を議論し、 প্রাথমিকデザインを作成する。",
      phase: "アイデア出し",
    },
    {
      id: "2",
      title: "3D都市モデルのデータ準備",
      description: "利用可能な3D都市モデルのデータ形式、データ量、利用条件などを調査し、最適なデータセットを特定する。",
      phase: "準備中",
    },
    {
      id: "3",
      title: "AR表示機能のプロトタイプ開発",
      description: "ARKit/ARCoreなどのARプラットフォームを利用して、3D都市モデルをAR表示するプロトタイプを開発する。",
      phase: "進行中",
    },
    {
      id: "4",
      title: "プロジェクト提案フォームのUI設計",
      description: "ユーザーが新しい都市開発プロジェクトを提案するためのフォームUIを設計する。",
      phase: "完了済み",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-light via-gray-50 to-gray-100 relative overflow-hidden">
      {/* デコラティブな背景要素 */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      </div>
      <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-between items-center"
          >
            <motion.h1 
              className="text-xl font-bold bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text"
              whileHover={{ scale: 1.02 }}
            >
              DecenSNS
            </motion.h1>
            <nav className="hidden md:flex items-center space-x-1">
              <motion.button 
                onClick={() => setCurrentPage('project')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  currentPage === 'project' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                プロジェクト
              </motion.button>
              <motion.button 
                onClick={() => setCurrentPage('news')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  currentPage === 'news' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15M9 11l3 3m0 0l3-3m-3 3V8" />
                </svg>
                ニュース
              </motion.button>
              <motion.button 
                onClick={() => setCurrentPage('post')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  currentPage === 'post' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                ポスト
              </motion.button>
              <motion.button 
                onClick={() => setCurrentPage('event')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  currentPage === 'event' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                イベント
              </motion.button>
              <motion.button 
                onClick={() => setCurrentPage('community')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  currentPage === 'community' 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                コミュニティ
              </motion.button>
            </nav>
            {/* モバイルメニュー */}
            <div className="md:hidden flex items-center gap-2">
              <motion.button
                onClick={() => setCurrentPage('post')}
                className={`p-2 rounded-xl ${
                  currentPage === 'post'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => setCurrentPage('event')}
                className={`p-2 rounded-xl ${
                  currentPage === 'event'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </motion.button>
              <motion.button
                onClick={() => setCurrentPage('community')}
                className={`p-2 rounded-xl ${
                  currentPage === 'community'
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </motion.button>
            </div>

            {/* ユーザーメニュー */}
            <motion.button
              onClick={() => setCurrentPage('account')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary cursor-pointer shadow-md"
            >
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
            </motion.button>
          </motion.div>
        </div>
      </header>
      {/* メニュー */}

      <div className="flex justify-center gap-6 px-4 py-6 relative">
        {/* サイドナビゲーション */}
        <nav className="hidden md:block w-64 h-fit sticky top-20">
          <motion.div
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-4 space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              トレンド
            </h2>
            {['#Web3', '#Blockchain', '#DeFi', '#NFT', '#DAO'].map((tag, i) => (
              <motion.button
                key={tag}
                className="block w-full text-left px-3 py-2 rounded-xl hover:bg-gray-50 text-sm text-gray-600"
                whileHover={{ x: 4 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {tag}
              </motion.button>
            ))}
          </motion.div>
        </nav>

        {/* メインコンテンツ */}
        <main className="w-full max-w-2xl">
          {/* コンテンツの切り替え */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'post' && (
              <>
                <PostForm />
                <div className="mt-8">
                  <PostList />
                </div>
              </>
            )}
            {currentPage === 'project' && <KanbanBoard tasks={tasks} />}
            {currentPage === 'news' && <NewsPage />}
            {currentPage === 'event' && <EventPage />}
            {currentPage === 'community' && <CommunitySpacePage />}
            {currentPage === 'account' && (
              <AccountPage onSettingsClick={() => setCurrentPage('account-settings')} />
            )}
            {currentPage === 'account-settings' && <AccountSettingsPage />}
          </motion.div>
        </main>

        {/* サイドバー */}
        <aside className="hidden lg:block w-72 h-fit sticky top-20">
          <motion.div
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              おすすめユーザー
            </h2>
            <div className="space-y-4">
              {['CryptoExpert', 'Web3Developer', 'BlockchainGuru'].map((user, i) => (
                <motion.div
                  key={user}
                  className="flex items-center space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20" />
                  <div>
                    <p className="text-sm font-medium">{user}</p>
                    <p className="text-xs text-gray-500">Web3 enthusiast</p>
                  </div>
                  <motion.button
                    className="ml-auto text-xs text-primary font-medium hover:text-secondary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    フォロー
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </aside>
      </div>
    </div>
  );
}

export default App;
