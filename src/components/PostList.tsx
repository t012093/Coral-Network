import { motion } from 'framer-motion';
import { useState } from 'react';
import { HeartIcon, ChatBubbleLeftIcon, ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { Post } from '../types/post';
import { StoryGroup } from '../types/story';
import { Project, mockProject } from '../types/project';
import StoryPreview from './StoryPreview';
import ProjectDetailsPopup from './ProjectDetailsPopup';

const mockStories: StoryGroup[] = [
  {
    userId: '1',
    userName: 'Satoshi.eth',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1',
    hasUnviewed: true,
    stories: [
      {
        id: '1',
        content: 'Building a decentralized future! 🚀',
        author: {
          id: '1',
          name: 'Satoshi.eth',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        viewedBy: [],
        interactions: { likes: 24, comments: 3, shares: 5 },
        tags: ['blockchain', 'development'],
        mood: 'excited'
      }
    ]
  },
  {
    userId: '2',
    userName: 'CryptoNinja',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2',
    hasUnviewed: true,
    stories: [
      {
        id: '2',
        content: 'Check out this new DeFi protocol! 💫',
        author: {
          id: '2',
          name: 'CryptoNinja',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
        },
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        viewedBy: [],
        interactions: { likes: 18, comments: 7, shares: 2 },
        tags: ['defi', 'crypto']
      }
    ]
  }
];

const mockPosts: Post[] = [
  {
    id: '1',
    content: '分散型SNSの開発始めました！🚀\nWeb3の未来を一緒に作っていきましょう！ #blockchain #web3 #cryptocurrency',
    author: {
      name: 'Satoshi.eth',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1'
    },
    createdAt: '2024-01-26T10:00:00Z',
    likes: 42,
    comments: 12,
    shares: 8
  },
  {
    id: '2',
    content: 'ブロックチェーンの可能性は無限大です✨\nみんなでデータの主権を取り戻そう！💪\n#decentralization #privacy #freedom',
    author: {
      name: 'CryptoNinja',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2'
    },
    createdAt: '2024-01-26T09:30:00Z',
    likes: 38,
    comments: 5,
    shares: 15
  },
  {
    id: '3',
    content: '新しいプロトコル設計中...👩‍💻\nP2Pネットワークの最適化がキモですね\nもうすぐテストネット公開します！お楽しみに！',
    author: {
      name: 'Web3Builder',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3'
    },
    createdAt: '2024-01-26T08:45:00Z',
    likes: 56,
    comments: 23,
    shares: 12
  }
];

interface PostListProps {
  posts?: Post[];
  stories?: StoryGroup[];
}

const PostList = ({ posts = mockPosts, stories = mockStories }: PostListProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  return (
    <div className="space-y-6">
      {/* Stories row */}
      <div className="overflow-x-auto pb-2">
        <div className="flex space-x-4 px-2">
          {stories.map((story) => (
            <StoryPreview
              key={story.userId}
              storyGroup={story}
              className="flex-shrink-0"
            />
          ))}
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <motion.div
          key={post.id}
          onClick={() => setSelectedProject(mockProject)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.01 }}
          className="card post-item"
        >
          <div className="flex items-start space-x-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full ring-2 ring-primary/20 hover:ring-primary/40 transition-all duration-300"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-base text-gradient hover-lift">
                    {post.author.name}
                  </h3>
                  <span className="text-gray-400 text-sm">
                    {new Date(post.createdAt).toLocaleDateString('ja-JP')}
                  </span>
                </div>
              </div>
              <p className="mt-3 text-base leading-relaxed whitespace-pre-wrap text-gray-700 hover:text-gray-900 transition-colors duration-200">
                {post.content}
              </p>
              
              <div className="mt-4 flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-primary transition-colors duration-200 hover-lift hover-glow px-3 py-1.5 rounded-full accent-border"
                >
                  <HeartIcon className="h-5 w-5" />
                  <span className="font-medium">{post.likes}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-secondary transition-colors duration-200 hover-lift hover-glow px-3 py-1.5 rounded-full accent-border"
                >
                  <ChatBubbleLeftIcon className="h-5 w-5" />
                  <span className="font-medium">{post.comments}</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 text-gray-500 hover:text-accent-2 transition-colors duration-200 hover-lift hover-glow px-3 py-1.5 rounded-full accent-border"
                >
                  <ArrowPathRoundedSquareIcon className="h-5 w-5" />
                  <span className="font-medium">{post.shares}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Project Details Popup */}
      <ProjectDetailsPopup
        project={mockProject}
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default PostList;
