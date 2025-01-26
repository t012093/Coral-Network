import { useState } from 'react';
import { motion } from 'framer-motion';
import { PhotoIcon, FaceSmileIcon, SparklesIcon } from '@heroicons/react/24/outline';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 投稿処理の実装
    console.log('投稿内容:', content);
    setContent('');
    setIsExpanded(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto my-4 hover:shadow-lg hover:shadow-primary/5"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <motion.textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            className="input min-h-[120px] resize-none text-lg placeholder-gray-400
                     focus:shadow-lg focus:shadow-primary/5 transition-all duration-300
                     hover:border-primary/20"
            placeholder="いまどうしてる？"
            style={{ 
              fontSize: '1rem',
              lineHeight: '1.5',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
          />
          <motion.div
            initial={false}
            animate={{ 
              opacity: isExpanded ? 1 : 0,
              scale: isExpanded ? 1 : 0.8,
            }}
            transition={{ duration: 0.2 }}
            className="absolute right-3 top-3"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <SparklesIcon className="h-5 w-5 text-primary cursor-pointer hover:text-secondary 
                                     transition-colors duration-300 hover:shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full hover:bg-primary/10 transition-all duration-300
                       hover:shadow-lg hover:shadow-primary/20"
            >
              <PhotoIcon className="h-5 w-5 text-primary" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2.5 rounded-full hover:bg-secondary/10 transition-all duration-300
                       hover:shadow-lg hover:shadow-secondary/20"
            >
              <FaceSmileIcon className="h-5 w-5 text-secondary" />
            </motion.button>
          </div>
          
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className={`btn btn-primary relative overflow-hidden
                      ${!content.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl'}`}
            disabled={!content.trim()}
          >
            <span className="relative z-10">投稿する</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
            />
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default PostForm;
