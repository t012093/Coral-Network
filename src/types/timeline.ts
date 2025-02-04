import { Vote } from './vote';
import { ContributionPoint } from './contribution';

export type TimelineEntryType =
  | 'project_created'
  | 'project_updated'
  | 'task_added'
  | 'task_completed'
  | 'member_joined'
  | 'contribution_earned'
  | 'vote_received'
  | 'comment_added'
  | 'media_uploaded';

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  userId: string;
  userDisplayName: string;
  userAvatar?: string;
  projectId?: string;
  projectTitle?: string;
  content: string;
  mediaUrls?: string[];
  metadata?: {
    vote?: Vote;
    contribution?: ContributionPoint;
    taskId?: string;
    taskTitle?: string;
    commentId?: string;
  };
  createdAt: Date;
  updatedAt?: Date;
}

export interface TimelineFilter {
  types?: TimelineEntryType[];
  projectId?: string;
  userId?: string;
  startDate?: Date;
  endDate?: Date;
}

export interface TimelinePagination {
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}
