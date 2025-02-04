export interface Vote {
  id: string;
  userId: string;
  projectId: string;
  type: 'like' | 'support';
  createdAt: Date;
}

export interface VoteCount {
  likes: number;
  supports: number;
}

export interface VoteStatus {
  hasLiked: boolean;
  hasSupported: boolean;
}
