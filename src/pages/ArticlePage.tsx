import React from 'react';
import { motion } from 'framer-motion';

interface ArticlePageProps {
  articleId: string;
  onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ articleId, onBack }) => {
  // 実際のアプリケーションでは、articleIdを使用して記事データを取得します
  const mockArticle = {
    id: articleId,
    title: "新しいAR都市開発プロジェクトがスタート",
    content: `最新のAR技術を活用し、都市開発の新しい形を目指すプロジェクトが始動しました。
    
    このプロジェクトでは、AR（拡張現実）技術を活用して、都市計画や開発の過程を可視化し、市民参加型の都市開発を実現することを目指しています。

    主な特徴：
    
    1. リアルタイムAR可視化
    - 計画段階の建築物をAR表示
    - 周辺環境との調和をシミュレーション
    - 時間帯による影響の確認
    
    2. 市民参加プラットフォーム
    - 意見投稿機能
    - オンライン投票システム
    - コミュニティディスカッション

    3. データ駆動型意思決定
    - 交通流シミュレーション
    - 環境影響評価
    - 経済効果予測
    
    今後の展開：
    
    - 3月: パイロットプロジェクト開始
    - 5月: 市民参加プラットフォームβ版リリース
    - 7月: 第一期プロジェクト評価
    
    このプロジェクトを通じて、より透明性の高い、市民参加型の都市開発プロセスを確立することを目指しています。`,
    category: "tech",
    author: "山田 太郎",
    date: "2024-02-05",
    readTime: 5,
    imageUrl: "/ar-project.jpg",
    likes: 42,
    comments: 12,
    tags: ["AR", "都市開発", "テクノロジー"]
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden"
    >
      {/* ヘッダー */}
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-secondary/20">
        <div className="absolute inset-0 flex items-center justify-center text-9xl opacity-20">
          🌆
        </div>
        <button
          onClick={onBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-white/80 hover:bg-white text-gray-700 transition-colors"
        >
          ← 戻る
        </button>
      </div>

      {/* コンテンツ */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-4">
          {mockArticle.tags.map(tag => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="text-3xl font-bold mb-4">
          {mockArticle.title}
        </h1>

        <div className="flex items-center gap-4 mb-8 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
              {mockArticle.author[0]}
            </div>
            <span>{mockArticle.author}</span>
          </div>
          <span>•</span>
          <span>{new Date(mockArticle.date).toLocaleDateString('ja-JP')}</span>
          <span>•</span>
          <span>{mockArticle.readTime}分で読める</span>
        </div>

        <div className="prose prose-gray max-w-none">
          {mockArticle.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-600 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* アクション */}
        <div className="flex items-center justify-between mt-8 pt-8 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{mockArticle.likes}</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{mockArticle.comments}</span>
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <span>シェア</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ArticlePage;
