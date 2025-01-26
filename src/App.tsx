import { motion } from 'framer-motion';
import PostForm from './components/PostForm';
import PostList from './components/PostList';

function App() {
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
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-secondary cursor-pointer shadow-md"
            />
          </motion.div>
        </div>
      </header>

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
          <PostForm />
          <div className="mt-8">
            <PostList />
          </div>
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
