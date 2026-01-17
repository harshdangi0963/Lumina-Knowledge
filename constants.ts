import { DocType, CollectionVisibility, Document, Collection, ChatMessage, HistoryEvent, Collaborator } from './types';

export const MOCK_DOCUMENTS: Document[] = [
  {
    id: '1',
    title: 'Q3 Financial Overview 2024',
    type: DocType.PDF,
    size: '2.4 MB',
    updatedAt: '2 hours ago',
    author: 'Sarah Chen',
    snippet: 'The quarterly revenue exceeded expectations by 15% due to strong enterprise adoption...',
    content: 'EXECUTIVE SUMMARY\n\nLumina Corp has seen a significant uptick in enterprise adoption for the Q3 fiscal period. Total revenue is up 15% YoY. The primary growth factors include our new AI indexing engine and the expansion into the APAC region. Operating expenses remained stable, while R&D increased by 5% to support the Project Orion launch.\n\nMARKET ANALYSIS\nEnterprise customers now account for 45% of total revenue. Retention rates are at an all-time high of 98%. Competition in the knowledge mesh space is increasing, but Lumina maintains a distinct lead in low-latency processing.',
    tags: ['Finance', 'Q3', 'Report'],
    status: 'indexed'
  },
  {
    id: '2',
    title: 'Product Roadmap: Project Orion',
    type: DocType.SLIDE,
    size: '15.1 MB',
    updatedAt: '1 day ago',
    author: 'Mike Ross',
    snippet: 'Phase 1 of Orion focuses on core infrastructure scalability and real-time data processing...',
    content: 'PROJECT ORION: VISION 2025\n\nOrion is our next-generation temporal ledger and knowledge distribution node. \n\nMILESTONES:\n- Q1: Core Engine Alpha\n- Q2: Beta rollout to enterprise partners\n- Q3: Global availability\n\nTECHNICAL SPECS:\n- 10ms latency for global search\n- Multi-silo synchronization\n- End-to-end quantum encryption.',
    tags: ['Product', 'Strategy', '2025'],
    status: 'indexed'
  },
  {
    id: '3',
    title: 'Employee Onboarding Handbook',
    type: DocType.DOCX,
    size: '850 KB',
    updatedAt: '3 days ago',
    author: 'HR Dept',
    snippet: 'Welcome to the team! This guide covers benefits, tools, and our cultural values...',
    tags: ['HR', 'Internal'],
    status: 'indexed'
  }
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    name: 'Marketing Assets',
    description: 'Brand guidelines, logos, and Q4 campaign materials.',
    coverImage: 'https://picsum.photos/800/400?random=1',
    author: 'Marketing Team',
    itemCount: 24,
    visibility: CollectionVisibility.TEAM,
    updatedAt: '1 day ago'
  },
  {
    id: 'c2',
    name: 'Legal Contracts',
    description: 'Standard NDAs, MSAs, and vendor agreements.',
    coverImage: 'https://picsum.photos/800/400?random=2',
    author: 'Legal Dept',
    itemCount: 156,
    visibility: CollectionVisibility.PRIVATE,
    updatedAt: '4 hours ago'
  },
  {
    id: 'c3',
    name: 'Engineering Resources',
    description: 'Architecture diagrams, API docs, and tech specs.',
    coverImage: 'https://picsum.photos/800/400?random=3',
    author: 'CTO Office',
    itemCount: 89,
    visibility: CollectionVisibility.TEAM,
    updatedAt: 'Just now'
  }
];

export const MOCK_HISTORY: HistoryEvent[] = [
  { id: 'h1', type: 'edit', user: 'Sarah Chen', target: 'Q3 Financial Overview', timestamp: '2 hours ago', description: 'Updated revenue projections for Q4' },
  { id: 'h2', type: 'access', user: 'John Doe', target: 'Legal Contracts', timestamp: '5 hours ago', description: 'Viewed NDA Template' },
  { id: 'h3', type: 'provision', user: 'System', target: 'Mike Ross', timestamp: '1 day ago', description: 'Provisioned Editor access' },
  { id: 'h4', type: 'rollback', user: 'Admin', target: 'Roadmap v2', timestamp: '2 days ago', description: 'Rolled back to Snapshot 2024.11.01' },
];

export const MOCK_COLLABORATORS: Collaborator[] = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@lumina.ai', role: 'Admin', joinedAt: '2023-10-12' },
  { id: 'u2', name: 'Mike Ross', email: 'mike@lumina.ai', role: 'Editor', joinedAt: '2024-01-05' },
  { id: 'u3', name: 'Rachel Zane', email: 'rachel@lumina.ai', role: 'Viewer', joinedAt: '2024-03-20' },
];

export const MOCK_CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'm1',
    role: 'user',
    content: 'What was the revenue growth in Q3?',
    timestamp: '10:42 AM'
  },
  {
    id: 'm2',
    role: 'assistant',
    content: 'According to the Q3 Financial Overview, revenue exceeded expectations by 15%, driven largely by strong enterprise adoption in the North American sector.',
    sources: [MOCK_DOCUMENTS[0]],
    timestamp: '10:42 AM'
  }
];

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};