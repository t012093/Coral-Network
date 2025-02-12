import React, { useState, useRef, useEffect } from 'react';
import {
  VirtualSpace as VirtualSpaceType,
  VirtualSpaceEvents,
  VirtualSpaceParticipant,
  // VirtualSpaceChat, // 後で使用する可能性あり
  // SharedMedia // 後で使用する可能性あり
} from '../types/virtualSpace';

interface VirtualSpaceProps {
  space: VirtualSpaceType;
  currentUser: VirtualSpaceParticipant;
  events: VirtualSpaceEvents;
}

const VirtualSpace: React.FC<VirtualSpaceProps> = ({
  space,
  currentUser,
  events
}) => {
  const [chatMessage, setChatMessage] = useState('');
  const [showParticipants] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [space.chat]);

  const handleSendMessage = async () => {
    if (chatMessage.trim()) {
      await events.onSendChat(chatMessage.trim(), 'text');
      setChatMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: VirtualSpaceParticipant['status']) => {
    const colors = {
      online: 'bg-green-500',
      away: 'bg-yellow-500',
      busy: 'bg-red-500',
      offline: 'bg-gray-500'
    };
    return colors[status];
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* サイドバー - 参加者リスト */}
      {showParticipants && space.settings.allowParticipantList && (
        <div className="w-64 bg-white border-r border-gray-200 p-4">
          <h3 className="text-lg font-semibold mb-4">参加者 ({space.participants.length})</h3>
          <div className="space-y-3">
            {space.participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center space-x-3 p-2 rounded hover:bg-gray-50"
              >
                <div className="relative">
                  {participant.avatar ? (
                    <img
                      src={participant.avatar}
                      alt={participant.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">
                        {participant.displayName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${getStatusColor(
                      participant.status
                    )}`}
                  />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium">
                    {participant.displayName}
                  </div>
                  <div className="flex space-x-2">
                    {participant.isVideoEnabled && (
                      <span className="text-xs text-blue-600">📹</span>
                    )}
                    {participant.isAudioEnabled && (
                      <span className="text-xs text-blue-600">🎤</span>
                    )}
                    {participant.isScreenSharing && (
                      <span className="text-xs text-blue-600">🖥️</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{space.name}</h2>
              <p className="text-sm text-gray-600">{space.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {space.settings.allowVideo && (
                <button
                  onClick={events.onToggleVideo}
                  className={`p-2 rounded-full ${
                    currentUser.isVideoEnabled
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  📹
                </button>
              )}
              {space.settings.allowAudio && (
                <button
                  onClick={events.onToggleAudio}
                  className={`p-2 rounded-full ${
                    currentUser.isAudioEnabled
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  🎤
                </button>
              )}
              {space.settings.allowScreenShare && (
                <button
                  onClick={events.onToggleScreenShare}
                  className={`p-2 rounded-full ${
                    currentUser.isScreenSharing
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  🖥️
                </button>
              )}
            </div>
          </div>
        </div>

        {/* インタラクションエリア */}
        <div className="flex-1 flex">
          {/* メインエリア（将来的にビデオ・スクリーンシェア表示用） */}
          <div className="flex-1 p-4">
            {/* ここにビデオグリッドやスクリーンシェアを表示 */}
          </div>

          {/* チャットエリア */}
          {space.settings.allowChat && (
            <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">チャット</h3>
              </div>
              
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {space.chat.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.senderId === currentUser.id
                        ? 'justify-end'
                        : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs rounded-lg p-3 ${
                        message.senderId === currentUser.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {message.senderId !== currentUser.id && (
                        <div className="text-xs font-medium mb-1">
                          {message.senderName}
                        </div>
                      )}
                      <div>{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.senderId === currentUser.id
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="メッセージを入力..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  >
                    送信
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualSpace;
