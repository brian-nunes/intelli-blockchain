import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PollData {
  description: string;
}

const PollCreate: React.FC = () => {
  const router = useRouter();
  const [pollData, setPollData] = useState<PollData>({
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPollData({ ...pollData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add logic to create new poll
    console.log(pollData);
    router.push('/poll');
  };

  return (
    <div>
      <h1>Create Poll</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <br />
          <textarea name="description" value={pollData.description} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollCreate;
