import Navbar from '@/components/NavBar';
import PollsPage from '@/components/PollsPage';
import React from 'react';

const Polls: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <main>
        <PollsPage />
      </main>
    </div>
  );
};

export default Polls;
