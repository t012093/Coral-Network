import React from 'react';
import { motion } from 'framer-motion';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'online' | 'offline' | 'hybrid';
  category: 'tech' | 'art' | 'food' | 'community';
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  capacity: number;
  participants: number;
  organizer: string;
  tags: string[];
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "ARテクノロジーミートアップ",
    description: "AR技術の最新トレンドについて議論し、実際のデモを交えながら理解を深めます。",
    type: "hybrid",
    category: "tech",
    date: "2024-03-15",
    startTime: "19:00",
    endTime: "21:00",
    location: "渋谷テックハブ + オンライン",
    capacity: 50,
    participants: 32,
    organizer: "Tech Community",
    tags: ["AR", "VR", "テクノロジー"]
  },
  {
    id: "2",
    title: "デジタルアートワークショップ",
    description: "プロのデジタルアーティストから学ぶ、創作テクニックと表現方法。",
    type: "offline",
    category: "art",
    date: "2024-03-20",
    startTime: "14:00",
    endTime: "17:00",
    location: "アートスペース渋谷",
    capacity: 20,
    participants: 15,
    organizer: "Creative Hub",
    tags: ["デジタルアート", "ワークショップ", "創作"]
  },
  {
    id: "3",
    title: "フードテックオンラインセミナー",
    description: "食の未来を考える。持続可能な食文化とテクノロジーの関係性について。",
    type: "online",
    category: "food",
    date: "2024-03-25",
    startTime: "20:00",
    endTime: "21:30",
    location: "Zoomミーティング",
    capacity: 100,
    participants: 67,
    organizer: "Food Innovation Lab",
    tags: ["フードテック", "サステナビリティ", "イノベーション"]
  }
];

const EventPage: React.FC = () => {
  const typeColors = {
    online: 'bg-blue-100 text-blue-600',
    offline: 'bg-green-100 text-green-600',
    hybrid: 'bg-purple-100 text-purple-600'
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* ヘッダーセクション */}
      <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm p-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
          イベント
        </h2>
        <p className="text-gray-600 mb-6">
          コミュニティメンバーが主催する様々なイベントに参加しましょう。
        </p>
        
        {/* フィルター */}
        <div className="flex flex-wrap gap-2">
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            全て
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            オンライン
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            オフライン
          </button>
          <button className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-50 border border-gray-200">
            ハイブリッド
          </button>
        </div>
      </div>

      {/* イベント一覧 */}
      <div className="space-y-6">
        {mockEvents.map((event, index) => (
          <motion.article
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow duration-200"
          >
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeColors[event.type]}`}>
                  {event.type === 'online' ? 'オンライン' :
                   event.type === 'offline' ? 'オフライン' : 'ハイブリッド'}
                </span>
                <span className="text-sm text-gray-500">
                  {formatDate(event.date)}
                </span>
                <span className="text-sm text-gray-500">
                  {event.startTime} - {event.endTime}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-200">
                {event.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {event.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {event.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span className="text-sm text-gray-600">{event.participants}/{event.capacity}人</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-full text-sm font-medium shadow-sm"
                >
                  参加する
                </motion.button>
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

export default EventPage;
