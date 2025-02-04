import React, { useState } from 'react';
import MediaPreview from './MediaPreview';

interface MediaFile {
  id: string;
  type: 'image' | 'audio' | 'video';
  url: string;
  title: string;
  thumbnail?: string;
}

interface MediaGridProps {
  files: MediaFile[];
}

const MediaGrid: React.FC<MediaGridProps> = ({ files }) => {
  const [selectedMedia, setSelectedMedia] = useState<MediaFile | null>(null);

  const renderThumbnail = (file: MediaFile) => {
    switch (file.type) {
      case 'image':
        return (
          <img
            src={file.url}
            alt={file.title}
            className="w-full h-full object-cover"
          />
        );
      case 'audio':
        return (
          <div className="flex flex-col items-center justify-center w-full h-full bg-gray-100 p-4">
            <svg
              className="w-12 h-12 text-gray-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
            </svg>
            <p className="mt-2 text-sm text-gray-600 text-center">{file.title}</p>
          </div>
        );
      case 'video':
        return (
          <div className="relative w-full h-full">
            <img
              src={file.thumbnail || file.url}
              alt={file.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
              <svg
                className="w-12 h-12 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="relative aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-200"
            onClick={() => setSelectedMedia(file)}
          >
            {renderThumbnail(file)}
          </div>
        ))}
      </div>

      {selectedMedia && (
        <MediaPreview
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </>
  );
};

export default MediaGrid;
