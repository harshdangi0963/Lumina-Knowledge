
import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Layout } from './components/Layout.tsx';
import { Home } from './pages/Home.tsx';
import { SearchResults } from './pages/SearchResults.tsx';
import { AskAI } from './pages/AskAI.tsx';
import { Collections } from './pages/Collections.tsx';
import { CollectionDetail } from './pages/CollectionDetail.tsx';
import { DocumentReader } from './pages/DocumentReader.tsx';
import { History } from './pages/History.tsx';
import { Collaborators } from './pages/Collaborators.tsx';
import { SMOOTH_TRANSITION } from './constants.ts';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        // Snappy page fade: very minimal movement (y: 4) so it feels faster
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={SMOOTH_TRANSITION}
        className="h-full"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/ask" element={<AskAI />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/collections/:id" element={<CollectionDetail />} />
          <Route path="/documents/:id" element={<DocumentReader />} />
          <Route path="/history" element={<History />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
};

export default App;
