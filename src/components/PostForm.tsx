import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhotoIcon, FaceSmileIcon, SparklesIcon, XMarkIcon, HashtagIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

const PostForm = () => {
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const suggestedTags = ['#blockchain', '#web3', '#crypto', '#defi', '#nft', '#dao'];
  const maxLength = 280;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [content]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleTagClick = (tag: string) => {
    const words = content.split(' ');
    const lastWord = words[words.length - 1];
    
    if (lastWord.startsWith('#')) {
      words[words.length - 1] = tag;
    } else {
      words.push(tag);
    }
    
    setContent(words.join(' ') + ' ');
    setShowTagSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '#') {
      setShowTagSuggestions(true);
    } else if (e.key === 'Escape') {
      setShowTagSuggestions(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 投稿処理の実装 (モックAPI呼び出し)
    console.log('投稿内容:', content);
    
    // モックAPI呼び出し (fetch APIを使用)
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (response.ok) {
        console.log('投稿成功!');
        setContent('');
        setIsExpanded(false);
        setSelectedImage(null);
      } else {
        console.error('投稿失敗:', response.status);
        // TODO: エラーハンドリング
      }
    } catch (error) {
      console.error('投稿エラー:', error);
      // TODO: エラーハンドリング
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card max-w-2xl mx-auto my-4 hover:shadow-lg hover:shadow-primary/5 
                border border-gray-100/50 bg-gradient-to-b from-white/95 to-white/90 p-6"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <motion.textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, maxLength))}
            onFocus={() => setIsExpanded(true)}
            onKeyDown={handleKeyDown}
            className="input min-h-[120px] resize-none text-lg placeholder-gray-400
                     focus:shadow-lg focus:shadow-primary/5 transition-all duration-300
                     hover:border-primary/20 rounded-xl bg-white/50 backdrop-blur-sm
                     focus:ring-2 focus:ring-primary/10 focus:border-primary/20
                     w-full px-4 py-3"
            placeholder="いまどうしてる？"
            style={{ lineHeight: '1.5' }}
          />
          <div className="flex items-center gap-2 absolute right-3 top-3">
            {content.length > 0 && (
              <span className={`text-sm font-medium ${
                content.length >= maxLength ? 'text-red-500' : 'text-gray-400'
              }`}>
                {content.length}/{maxLength}
              </span>
            )}
            <motion.div
              initial={false}
              animate={{ 
                opacity: isExpanded ? 1 : 0,
                scale: isExpanded ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <SparklesIcon className="h-5 w-5 text-primary/80 cursor-pointer hover:text-secondary 
                                       filter hover:drop-shadow-glow transition-all duration-300" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {showTagSuggestions && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full left-0 mb-2 bg-white/90 backdrop-blur-sm rounded-xl 
                        shadow-lg p-3 w-full max-h-40 overflow-y-auto border border-gray-100/50"
            >
              <div className="grid grid-cols-2 gap-2">
                {suggestedTags.map((tag) => (
                  <motion.button
                    key={tag}
                    type="button"
                    onClick={() => handleTagClick(tag)}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-gray-700
                             hover:text-primary transition-colors duration-200 group"
                  >
                    <HashtagIcon className="h-4 w-4 text-gray-400 group-hover:text-primary 
                                         transition-colors duration-200" />
                    <span>{tag.slice(1)}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative mt-4"
          >
            <div className="rounded-xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 p-1">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <motion.button
              type="button"
              onClick={removeImage}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-gray-900/50 text-white
                       hover:bg-gray-900/70 backdrop-blur-sm"
            >
              <XMarkIcon className="h-4 w-4" />
            </motion.button>
          </motion.div>
        )}

        <div className="flex items-center justify-between pt-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <div className="flex -space-x-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-10 p-2.5 rounded-full bg-white shadow-sm hover:shadow-md
                       hover:bg-primary/5 transition-all duration-300"
              onClick={() => fileInputRef.current?.click()}
            >
              <PhotoIcon className="h-5 w-5 text-primary" />
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="relative z-0 p-2.5 rounded-full bg-white shadow-sm hover:shadow-md
                       hover:bg-secondary/5 transition-all duration-300"
            >
              <FaceSmileIcon className="h-5 w-5 text-secondary" />
            </motion.button>
          </div>
          
          <motion.button
            type="submit"
            whileHover={content.trim() ? { scale: 1.02, y: -2 } : {}}
            whileTap={content.trim() ? { scale: 0.98 } : {}}
            className={`px-6 py-2.5 rounded-xl font-medium flex items-center space-x-2
                      bg-gradient-to-r from-primary to-secondary relative overflow-hidden
                      ${!content.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-xl hover:shadow-primary/20'}`}
            disabled={!content.trim()}
          >
            <span className="relative z-10 text-white">投稿する</span>
            <PaperAirplaneIcon className="h-4 w-4 text-white relative z-10" />
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
