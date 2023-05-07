import IndexPage from '@/components/IndexPage';
import Layout from '@/components/Layout';
import PollCreate from '@/components/PollCreate';


const NewPoll: React.FC = () => {

  return (
    <Layout>
      <PollCreate />
    </Layout>
  );
};

export default NewPoll;
