export enum DocType {
  PDF = 'PDF',
  DOCX = 'DOCX',
  SHEET = 'SHEET',
  SLIDE = 'SLIDE',
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

export enum CollectionVisibility {
  PRIVATE = 'Private',
  TEAM = 'Team',
  PUBLIC = 'Public'
}

export interface Document {
  id: string;
  title: string;
  type: DocType;
  size: string;
  updatedAt: string;
  author: string;
  snippet?: string;
  content?: string;
  tags: string[];
  status: 'indexed' | 'processing' | 'error';
  collectionId?: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  author: string;
  itemCount: number;
  visibility: CollectionVisibility;
  updatedAt: string;
}

export interface HistoryEvent {
  id: string;
  type: 'edit' | 'access' | 'provision' | 'rollback';
  user: string;
  target: string;
  timestamp: string;
  description: string;
}

export interface Collaborator {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar?: string;
  joinedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: Document[];
  timestamp: string;
}