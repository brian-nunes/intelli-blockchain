import React from 'react';
import Link from 'next/link';
import { MetaMaskProvider } from '@/contexts/MetaMaskProvider';
import ConnectButton from '@/components/ConnectButton';

const Navbar: React.FC = () => {

  return (
    <nav>
      <ul>
        <li>
          <Link href="/poll"><span>Polls</span></Link>
        </li>
        <li>
          <Link href="/user"><span>User</span></Link>
        </li>
        <li>
          <ConnectButton />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
