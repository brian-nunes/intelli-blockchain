import React from 'react';
import { useRouter } from 'next/router';

const PollPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const mockPollData = {
    id: 1,
    title: 'Best Programming Language',
    description: 'Vote for your favorite programming language.',
    createdBy: 'Alice',
    lastVoters: [
      { id: 1, name: 'John' },
      { id: 2, name: 'Jane' },
      { id: 3, name: 'Jack' },
    ],
  };

  return (
    <div className='poll-container'>
      <div className='poll'>
        <h1>{mockPollData.title}</h1>
        <p>Description: {mockPollData.description}</p>
        <p>Created By: {mockPollData.createdBy}</p>
        <p>Poll ID: {id}</p>
        <div className='lastVoters'>
          <h3>Last voters:</h3>
          <ul>
            {mockPollData.lastVoters.map((voter) => (
              <li key={voter.id}>{voter.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PollPage;
