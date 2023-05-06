import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const handleBackClick = () => {
    if (typeof window !== 'undefined') {
      window.history.back();
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/poll"><span>Polls</span></Link>
        </li>
        <li>
          <Link href="/user"><span>User</span></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
