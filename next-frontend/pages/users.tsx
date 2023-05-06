import Navbar from '@/components/NavBar';
import UserPage from '@/components/UserPage';
import React from 'react';

const Users: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <main>
        <UserPage />
      </main>
    </div>
  );
};

export default Users;
