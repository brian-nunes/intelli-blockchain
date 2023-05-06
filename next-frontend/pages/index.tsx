import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/users');
  }, []);

  return null;
};

export default Home;
