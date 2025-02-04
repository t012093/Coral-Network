export type VirtualSpaceType = 'workspace' | 'meeting' | 'showcase' | 'social';

export interface VirtualSpaceParticipant {
  id: string;
  displayName: string;
  avatar?: string;
  position?: {
    x: number;
    y: number;
  };
  status: 'online' | 'away' | 'busy' | 'offline';
  isVideoEnabled?: boolean;
  isAudioEnabled?: boolean;
  isScreenSharing?: boolean;
}

export interface VirtualSpaceChat {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'emoji' | 'file';
  fileUrl?: string;
}

export interface SharedMedia {
  id: string;
  type: 'music' | 'image' | 'video' | 'document';
  url: string;
  title: string;
  sharedBy: string;
  timestamp: Date;
}

export interface VirtualSpace {
  id: string;
  name: string;
  type: VirtualSpaceType;
  description: string;
  capacity: number;
  participants: VirtualSpaceParticipant[];
  chat: VirtualSpaceChat[];
  sharedMedia: SharedMedia[];
  backgroundImage?: string;
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
  settings: {
    allowVideo: boolean;
    allowAudio: boolean;
    allowChat: boolean;
    allowScreenShare: boolean;
    allowMediaSharing: boolean;
    allowParticipantList: boolean;
    backgroundMusic?: {
      url: string;
      title: string;
      isPlaying: boolean;
      volume: number;
    };
  };
}

export interface VirtualSpaceEvents {
  onJoin: (spaceId: string) => Promise<void>;
  onLeave: (spaceId: string) => Promise<void>;
  onMovePosition: (spaceId: string, x: number, y: number) => Promise<void>;
  onToggleVideo: () => Promise<void>;
  onToggleAudio: () => Promise<void>;
  onToggleScreenShare: () => Promise<void>;
  onSendChat: (content: string, type: VirtualSpaceChat['type']) => Promise<void>;
  onShareMedia: (media: SharedMedia) => Promise<void>;
  onUpdateStatus: (status: VirtualSpaceParticipant['status']) => Promise<void>;
}
