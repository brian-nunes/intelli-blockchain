import React from 'react';
import PollPage from '@/components/PollPage';
import Navbar from '@/components/NavBar';

const PollPageRoute: React.FC = () => {

  return (<div className="container">
    <Navbar />
    <main>
    <PollPage />
    </main>
  </div>)
};

export default PollPageRoute;
