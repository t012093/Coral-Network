import React from 'react';

interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}

interface MediaPreviewProps {
  media: MediaFile;
  onClose?: () => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ media, onClose }) => {
  const renderMedia = () => {
    switch (media.type) {
      case 'image':
        return (
          <div className="relative w-full h-full">
            <img
              src={media.url}
              alt={media.title}
              className="w-full h-full object-contain"
            />
          </div>
        );
      case 'audio':
        return (
          <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">{media.title}</h3>
            <audio controls className="w-full max-w-md">
              <source src={media.url} />
              お使いのブラウザは音声再生をサポートしていません。
            </audio>
          </div>
        );
      case 'video':
        return (
          <div className="relative w-full h-full">
            <video
              controls
              className="w-full h-full object-contain"
              poster={media.thumbnail}
            >
              <source src={media.url} />
              お使いのブラウザは動画再生をサポートしていません。
            </video>
          </div>
        );
      default:
        return <div>サポートされていないメディアタイプです。</div>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative w-11/12 h-5/6 max-w-4xl">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute -top-10 right-0 text-white hover:text-gray-300"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
        {renderMedia()}
      </div>
    </div>
  );
};

export default MediaPreview;
