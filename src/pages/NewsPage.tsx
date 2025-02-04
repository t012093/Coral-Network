import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ArticlePage from './ArticlePage';

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  category: 'tech' | 'art' | 'food' | 'community';
  author: string;
  date: string;
  readTime: number;
  imageUrl: string;
  likes: number;
  comments: number;
}

const mockArticles: NewsArticle[] = [
  {
    id: "1",
    title: "新しいAR都市開発プロジェクトがスタート",
    content: "最新のAR技術を活用し、都市開発の新しい形を目指すプロジェクトが始動しました...",
    category: "tech",
    author: "山田 太郎",
    date: "2024-02-05",
    readTime: 5,
    imageUrl: "/ar-project.jpg",
    likes: 42,
    comments: 12
  },
  {
    id: "2",
    title: "デジタルアートフェスティバル開催決定",
    content: "地域のアーティストたちが集まり、革新的なデジタルアート作品を展示する...",
    category: "art",
    author: "鈴木 花子",
    date: "2024-02-04",
    readTime: 3,
    imageUrl: "/art-festival.jpg",
    likes: 38,
    comments: 8
  },
  {
    id: "3",
    title: "食文化とテクノロジーの融合",
    content: "伝統的な食文化とテクノロジーを組み合わせた新しい取り組みについて...",
    category: "food",
    author: "佐藤 健一",
    date: "2024-02-03",
    readTime: 4,
    imageUrl: "/food-tech.jpg",
    likes: 56,
    comments: 15
  }
];

const NewsPage: React.FC = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const categoryColors = {
    tech: 'bg-blue-100 text-blue-600',
    art: 'bg-purple-100 text-purple-600',
    food: 'bg-green-100 text-green-600',
    community: 'bg-orange-100 text-orange-600'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (selectedArticleId) {
    return (
      <ArticlePage
        articleId={selectedArticleId}
        onBack={() => setSelectedArticleId(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* ヘッダーセクション */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          ニュース
        </h2>
        <p className="text-gray-600 mb-6">
          コミュニティの最新情報とトレンドをお届けします。
        </p>
        
        {/* フィルター */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            全て
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            技術
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            アート
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            食文化
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            コミュニティ
          </button>
        </div>
      </div>

      {/* ニュース記事一覧 */}
      <div className="space-y-6">
        {mockArticles.map((article, index) => (
          <motion.article
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => setSelectedArticleId(article.id)}
          >
            <div className="md:flex">
              {/* 記事サムネイル */}
              <div className="md:w-72 h-48 md:h-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  🖼️
                </div>
              </div>

              {/* 記事内容 */}
              <div className="p-6 flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {formatDate(article.date)}
                  </span>
                  <span className="text-sm text-gray-500">
                    • {article.readTime}分で読める
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {article.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                      {article.author[0]}
                    </div>
                    <span className="text-sm text-gray-700">{article.author}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button 
                      className="flex items-center gap-1 text-gray-500 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: いいね機能の実装
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm">{article.likes}</span>
                    </button>
                    <button 
                      className="flex items-center gap-1 text-gray-500 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        // TODO: コメント機能の実装
                      }}
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span className="text-sm">{article.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
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

export default NewsPage;
