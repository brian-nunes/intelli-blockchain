import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link href="/polls">
            <span>Polls</span>
          </Link>
        </li>
        <li>
          <Link href="/users">
            <span>Users</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
