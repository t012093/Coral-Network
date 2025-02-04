import React, { useState } from 'react';
import {
  TimelineEntry,
  TimelineFilter,
  TimelinePagination,
  TimelineEntryType
} from '../types/timeline';
import MediaGrid from './MediaGrid';
import VoteButtons from './VoteButtons';

interface TimelineProps {
  entries: TimelineEntry[];
  filter: TimelineFilter;
  pagination: TimelinePagination;
  onFilterChange: (filter: TimelineFilter) => void;
  onLoadMore: () => void;
}

const Timeline: React.FC<TimelineProps> = ({
  entries,
  filter,
  pagination,
  onFilterChange,
  onLoadMore
}) => {
  const [selectedType, setSelectedType] = useState<TimelineEntryType | 'all'>('all');

  const filterTypes: Array<{ value: TimelineEntryType | 'all'; label: string }> = [
    { value: 'all', label: 'すべて' },
    { value: 'project_created', label: 'プロジェクト作成' },
    { value: 'task_completed', label: 'タスク完了' },
    { value: 'contribution_earned', label: '貢献獲得' },
    { value: 'media_uploaded', label: 'メディア投稿' }
  ];

  const handleTypeChange = (type: TimelineEntryType | 'all') => {
    setSelectedType(type);
    onFilterChange({
      ...filter,
      types: type === 'all' ? undefined : [type]
    });
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - postDate.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      return '数分前';
    } else if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    } else if (diffInHours < 48) {
      return '昨日';
    } else {
      return postDate.toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  const renderEntryContent = (entry: TimelineEntry) => {
    switch (entry.type) {
      case 'media_uploaded':
        return entry.mediaUrls && (
          <div className="mt-4">
            <MediaGrid
              files={entry.mediaUrls.map((url, index) => ({
                id: `${entry.id}-${index}`,
                type: url.match(/\.(mp4|webm)$/) ? 'video' : 
                      url.match(/\.(mp3|wav)$/) ? 'audio' : 'image',
                url,
                title: `${entry.projectTitle || ''} メディア ${index + 1}`
              }))}
            />
          </div>
        );

      case 'vote_received':
        return entry.metadata?.vote && (
          <div className="mt-4">
            <VoteButtons
              voteCount={{
                likes: 0, // TODO: 実際の値を取得
                supports: 0
              }}
              voteStatus={{
                hasLiked: false,
                hasSupported: false
              }}
              onVote={async () => {}} // TODO: 実装
              size="small"
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* フィルターバー */}
      <div className="mb-6 flex overflow-x-auto no-scrollbar">
        {filterTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handleTypeChange(type.value)}
            className={`
              px-4 py-2 mr-2 rounded-full whitespace-nowrap
              ${
                selectedType === type.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }
              transition duration-200
            `}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* タイムライン */}
      <div className="space-y-6">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-lg shadow-sm p-4 border border-gray-100"
          >
            {/* ヘッダー */}
            <div className="flex items-start space-x-3">
              {entry.userAvatar ? (
                <img
                  src={entry.userAvatar}
                  alt={entry.userDisplayName}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">
                    {entry.userDisplayName.charAt(0)}
                  </span>
                </div>
              )}
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{entry.userDisplayName}</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-500 text-sm">
                    {formatDate(entry.createdAt)}
                  </span>
                </div>
                {entry.projectTitle && (
                  <div className="text-sm text-gray-600 mt-1">
                    プロジェクト: {entry.projectTitle}
                  </div>
                )}
              </div>
            </div>

            {/* コンテンツ */}
            <div className="mt-3">
              <p className="text-gray-800">{entry.content}</p>
              {renderEntryContent(entry)}
            </div>
          </div>
        ))}
      </div>

      {/* もっと読み込むボタン */}
      {pagination.hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={onLoadMore}
            className="px-6 py-2 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition duration-200"
          >
            さらに読み込む
          </button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
