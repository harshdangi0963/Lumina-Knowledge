
import { DocType, CollectionVisibility, Document, Collection, ChatMessage, HistoryEvent, Collaborator } from './types.ts';

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
  },
  {
    id: '4',
    title: 'Cybersecurity Protocol v4.0',
    type: DocType.PDF,
    size: '4.2 MB',
    updatedAt: '5 hours ago',
    author: 'SecOps Team',
    snippet: 'Revised security measures for zero-trust architecture and multi-factor hardware keys...',
    content: 'SECURITY PROTOCOL V4.0\n\n1. ZERO TRUST ARCHITECTURE\nAll internal nodes must verify identity on every request. No network segment is implicitly trusted.\n\n2. ENCRYPTION STANDARDS\nData at rest must be encrypted using AES-256-GCM. Data in transit requires TLS 1.3 or higher.\n\n3. INCIDENT RESPONSE\nIn the event of a breach, automated silo isolation will trigger within 50ms of detection.',
    tags: ['Security', 'Compliance', 'Audit'],
    status: 'indexed'
  },
  {
    id: '5',
    title: 'Quantum Computing Whitepaper',
    type: DocType.TEXT,
    size: '120 KB',
    updatedAt: '1 week ago',
    author: 'Dr. Aris Thorne',
    snippet: 'Exploration of post-quantum cryptography impacts on current knowledge distribution...',
    content: 'POST-QUANTUM CRYPTOGRAPHY IMPACT ANALYSIS\n\nThe advent of Shor\'s algorithm poses a significant threat to RSA-based encryption. Lumina is transitioning to lattice-based cryptographic structures to ensure long-term data durability in a post-quantum world.\n\nKey areas of research:\n- Kyber key encapsulation\n- Dilithium digital signatures\n- Quantum random number generation for entropy pools.',
    tags: ['R&D', 'Quantum', 'Security'],
    status: 'indexed'
  },
  {
    id: '6',
    title: 'Global Expansion Analysis: EMEA',
    type: DocType.SHEET,
    size: '1.2 MB',
    updatedAt: '12 hours ago',
    author: 'David Wright',
    snippet: 'Market penetration metrics for the EMEA region including competitor pricing models...',
    tags: ['Sales', 'Market', 'EMEA'],
    status: 'processing'
  },
  {
    id: '7',
    title: 'Brand Identity Guidelines 2025',
    type: DocType.IMAGE,
    size: '45 MB',
    updatedAt: '2 days ago',
    author: 'Design Studio',
    snippet: 'High-resolution visual assets and color theory for the new Lumina 3.0 interface...',
    tags: ['Design', 'Brand', 'UI'],
    status: 'indexed'
  },
  {
    id: '8',
    title: 'Core API Specification',
    type: DocType.DOCX,
    size: '3.1 MB',
    updatedAt: 'Just now',
    author: 'Engineering',
    snippet: 'Comprehensive documentation for the Lumina Knowledge Mesh API endpoints...',
    content: 'CORE API DOCUMENTATION v2.4\n\nBASE URL: https://api.lumina.ai/v2\n\nENDPOINTS:\n- GET /nodes: List active intelligence silos\n- POST /search: Perform semantic vector search\n- PUT /sync: Force synchronize local cache with master mesh\n\nAUTHENTICATION:\nBearer tokens with short-lived TTL are required for all non-public endpoints.',
    tags: ['Dev', 'API', 'Docs'],
    status: 'indexed'
  },
  {
    id: '9',
    title: 'ESG Sustainability Report 2024',
    type: DocType.PDF,
    size: '5.6 MB',
    updatedAt: '4 hours ago',
    author: 'Elena Vance',
    snippet: 'Analysis of Lumina\'s carbon neutral initiatives and data center efficiency metrics...',
    tags: ['ESG', 'Corporate', '2024'],
    status: 'indexed'
  },
  {
    id: '10',
    title: 'Project Phoenix: Migration Plan',
    type: DocType.TEXT,
    size: '45 KB',
    updatedAt: '6 hours ago',
    author: 'Marcus Aurelius',
    snippet: 'Step-by-step transition from legacy SQL clusters to the new Vector Knowledge Mesh...',
    content: 'PROJECT PHOENIX: MIGRATION ARCHITECTURE\n\nPHASE 1: DATA INGESTION\nMirroring all legacy tables into Lumina ingestion buffers. Checksum validation performed at node exit.\n\nPHASE 2: VECTORIZATION\nParallel embedding generation using the Orion-7 model. Target throughput is 1M tokens/sec per cluster.\n\nPHASE 3: SWITCHOVER\nFinal cutover scheduled for Sunday at 02:00 UTC. Zero-downtime proxy routing is active.',
    tags: ['Engineering', 'Migration', 'DevOps'],
    status: 'indexed'
  },
  {
    id: '11',
    title: 'API Rate Limiting Policy',
    type: DocType.PDF,
    size: '1.1 MB',
    updatedAt: '1 day ago',
    author: 'Sarah Chen',
    snippet: 'Guidelines for external partners regarding API call frequency and quota tiers...',
    tags: ['API', 'Legal', 'Partner'],
    status: 'indexed'
  },
  {
    id: '12',
    title: 'Q4 Content Calendar',
    type: DocType.SHEET,
    size: '2.8 MB',
    updatedAt: '3 days ago',
    author: 'Marketing Team',
    snippet: 'Schedule for whitepaper releases, social media campaigns, and keynote events...',
    tags: ['Marketing', 'Planning'],
    status: 'indexed'
  },
  {
    id: '13',
    title: 'Competitive Analysis: Meshes',
    type: DocType.SLIDE,
    size: '18.4 MB',
    updatedAt: '5 days ago',
    author: 'Strategic Ops',
    snippet: 'Deep dive into the architecture of competitors and our 10ms latency advantage...',
    tags: ['Strategy', 'Competitive'],
    status: 'indexed'
  },
  {
    id: '14',
    title: 'Ethics in AI: Governance',
    type: DocType.DOCX,
    size: '2.1 MB',
    updatedAt: '1 week ago',
    author: 'Legal Dept',
    snippet: 'Framework for bias mitigation and human-in-the-loop validation for automated nodes...',
    content: 'GOVERNANCE FRAMEWORK FOR AUTONOMOUS NODES\n\n1. BIAS MITIGATION\nAll models must undergo adversarial testing for demographic parity. Results are audited by the internal Ethics Board monthly.\n\n2. TRANSPARENCY\nEvery response generated by a Lumina Assistant must include a traceability link to the source document (Node ID).\n\n3. HUMAN OVERSIGHT\nCritical decisions involving legal or financial data require a Level 4 Operator signature before distribution.',
    tags: ['AI', 'Ethics', 'Legal'],
    status: 'indexed'
  },
  {
    id: '15',
    title: 'Internal Latency Benchmarks',
    type: DocType.TEXT,
    size: '12 KB',
    updatedAt: 'Just now',
    author: 'SRE Team',
    snippet: 'Real-time performance metrics of the global knowledge distribution silos...',
    tags: ['SRE', 'Performance'],
    status: 'indexed'
  }
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: 'c1',
    name: 'Marketing Assets',
    description: 'Brand guidelines, logos, and Q4 campaign materials.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    author: 'Marketing Team',
    itemCount: 24,
    visibility: CollectionVisibility.TEAM,
    updatedAt: '1 day ago'
  },
  {
    id: 'c2',
    name: 'Legal Contracts',
    description: 'Standard NDAs, MSAs, and vendor agreements.',
    coverImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800',
    author: 'Legal Dept',
    itemCount: 156,
    visibility: CollectionVisibility.PRIVATE,
    updatedAt: '4 hours ago'
  },
  {
    id: 'c3',
    name: 'Engineering Resources',
    description: 'Architecture diagrams, API docs, and tech specs.',
    coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
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
  { id: 'h5', type: 'edit', user: 'Engineering', target: 'Core API Specification', timestamp: 'Just now', description: 'Updated authentication documentation' },
  { id: 'h6', type: 'provision', user: 'Security Bot', target: 'Cybersecurity Protocol', timestamp: '5 hours ago', description: 'Renewed node encryption keys' },
  { id: 'h7', type: 'access', user: 'Elena Vance', target: 'ESG Report', timestamp: '4 hours ago', description: 'Exported sustainability data' },
];

export const MOCK_COLLABORATORS: Collaborator[] = [
  { id: 'u1', name: 'Sarah Chen', email: 'sarah@lumina.ai', role: 'Admin', joinedAt: '2023-10-12' },
  { id: 'u2', name: 'Mike Ross', email: 'mike@lumina.ai', role: 'Editor', joinedAt: '2024-01-05' },
  { id: 'u3', name: 'Rachel Zane', email: 'rachel@lumina.ai', role: 'Viewer', joinedAt: '2024-03-20' },
  { id: 'u4', name: 'David Wright', email: 'david@lumina.ai', role: 'Editor', joinedAt: '2024-05-15' },
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
  },
  {
    id: 'm3',
    role: 'user',
    content: 'Tell me about Project Orion goals.',
    timestamp: '11:15 AM'
  },
  {
    id: 'm4',
    role: 'assistant',
    content: 'Project Orion focuses on core infrastructure scalability. Key goals include 10ms global search latency and multi-silo synchronization with end-to-end quantum encryption.',
    sources: [MOCK_DOCUMENTS[1]],
    timestamp: '11:15 AM'
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
