import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CreatePage from './pages/CreatePage';
import NoteDetailsPage from './pages/NoteDetailsPage';
import HomePage from './pages/HomePage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div className="relative h-full w-full">
      <div
        className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 
        [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#8B5E3C_100%)]"
      />
      
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/note/:id" element={<NoteDetailsPage />} />
      </Routes>
    </div>
  );
};

export default App;
