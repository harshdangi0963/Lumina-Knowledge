import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SearchResults } from './pages/SearchResults';
import { AskAI } from './pages/AskAI';
import { Collections } from './pages/Collections';
import { CollectionDetail } from './pages/CollectionDetail';
import { DocumentReader } from './pages/DocumentReader';
import { History } from './pages/History';
import { Collaborators } from './pages/Collaborators';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
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