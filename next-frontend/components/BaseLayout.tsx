import React, { ReactNode } from 'react';
import IndexBody from '@/components/IndexBody';
import Head from 'next/head';

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Ouroboros" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>
        <div className="my-5 d-flex justify-content-center">
          {children}
        </div>
      </h1>
    </div>
  );
};

export default BaseLayout;
