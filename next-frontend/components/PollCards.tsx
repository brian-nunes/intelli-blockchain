import React from 'react';
import { useRouter } from 'next/router';

interface PollData {
  user_id: number;
  description: string;
  votesNumber: number;
}

const PollCards: React.FC = () => {
  const router = useRouter();

  const mockPollData: PollData[] = [
    {
      user_id: 1,
      description: 'Vote for your favorite programming language.',
      votesNumber: 15,
    },
    {
      user_id: 2,
      description: 'Which mobile operating system do you prefer?',
      votesNumber: 7,
    },
  ];

  const handleCreateNewPoll = () => {
    router.push('/poll/new/');
  };

  const handleClick = (poll_id: number) => {
    router.push('/poll/' + poll_id);
  };

  return (
    <div className="poll-cards">
      <div
        className="poll-card create-poll-card"
        onClick={handleCreateNewPoll}
      >
        <p>Create new Poll</p>
      </div>
      {mockPollData.map((poll, index) => (
        <div
          key={index}
          className="poll-card"
          onClick={() => handleClick(poll.user_id)}
        >
          <p>Description: {poll.description}</p>
          <p className="vote-count">Number of Votes: {poll.votesNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default PollCards;