import React from 'react';
import { VoteCount, VoteStatus } from '../types/vote';

interface VoteButtonsProps {
  voteCount: VoteCount;
  voteStatus: VoteStatus;
  onVote: (type: 'like' | 'support') => Promise<void>;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

const VoteButtons: React.FC<VoteButtonsProps> = ({
  voteCount,
  voteStatus,
  onVote,
  size = 'medium',
  className = '',
}) => {
  const buttonSizes = {
    small: 'text-sm px-2 py-1',
    medium: 'text-base px-3 py-2',
    large: 'text-lg px-4 py-2',
  };

  const iconSizes = {
    small: 'w-4 h-4',
    medium: 'w-5 h-5',
    large: 'w-6 h-6',
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <button
        onClick={() => onVote('like')}
        className={`
          flex items-center space-x-2 rounded-full
          ${buttonSizes[size]}
          ${
            voteStatus.hasLiked
              ? 'bg-pink-100 text-pink-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
          transition duration-200
        `}
      >
        <svg
          className={iconSizes[size]}
          fill={voteStatus.hasLiked ? 'currentColor' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <span className="font-medium">{voteCount.likes}</span>
      </button>

      <button
        onClick={() => onVote('support')}
        className={`
          flex items-center space-x-2 rounded-full
          ${buttonSizes[size]}
          ${
            voteStatus.hasSupported
              ? 'bg-blue-100 text-blue-600'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }
          transition duration-200
        `}
      >
        <svg
          className={iconSizes[size]}
          fill={voteStatus.hasSupported ? 'currentColor' : 'none'}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        <span className="font-medium">{voteCount.supports}</span>
      </button>
    </div>
  );
};

export default VoteButtons;
