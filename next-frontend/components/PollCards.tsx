import React from 'react';
import { useRouter } from 'next/router';

interface PollData {
  user_id: number;
  title: string;
  description: string;
  createdBy: string;
}

const PollCards: React.FC = () => {
  const router = useRouter();

  const mockPollData: PollData[] = [
    {
      user_id: 0,
      title: 'Create Poll',
      description: 'Create a new poll.',
      createdBy: 'You',
    },
    {
      user_id: 1,
      title: 'Best Programming Language',
      description: 'Vote for your favorite programming language.',
      createdBy: 'Alice',
    },
    {
      user_id: 2,
      title: 'Preferred Mobile OS',
      description: 'Which mobile operating system do you prefer?',
      createdBy: 'Bob',
    },
  ];

  const handleClick = (poll_id: number) => {
    if (poll_id === 0) {
      router.push('/create-poll');
    } else {
      router.push('/poll/' + poll_id);
    }
  };

  return (
    <div className="poll-cards">
      {mockPollData.map((poll, index) => (
        <div
          key={index}
          className="poll-card"
          onClick={() => handleClick(poll.user_id)}
        >
          <h3>{poll.title}</h3>
          <p>Description: {poll.description}</p>
          <p>Created By: {poll.createdBy}</p>
        </div>
      ))}
    </div>
  );
};

export default PollCards;
