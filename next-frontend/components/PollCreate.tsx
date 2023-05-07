import React, { useState } from 'react';
import { useRouter } from 'next/router';
import useMetaMask from '@/contexts/MetaMaskProvider';

interface PollData {
  description: string;
  selectedFunction: string;
  inputValue: number;
}

const functionsList: Record<string, string> = {
  'Update Quorum Numerator': 'updateQuorumNumerator',
  'Set Voting Period': 'setVotingPeriod',
  'Set Voting Delay': 'setVotingDelay',
  'Set Proposal Threshold': 'setProposalThereshold',
  'Set Stake Limit': 'setStakeLimit',
};

const PollCreate: React.FC = () => {
  const router = useRouter();
  const [pollData, setPollData] = useState<PollData>({
    description: '',
    selectedFunction: '',
    inputValue: 0
  });
  const { propose } = useMetaMask()


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPollData({ ...pollData, [e.target.name]: e.target.value });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPollData({ ...pollData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPollData({ ...pollData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    propose(pollData);
    console.log(pollData);
    router.push('/poll');
  };

  return (
    <div className='poll-create'>
      <h1>Create Poll</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <br />
          <textarea name="description" value={pollData.description} onChange={handleChange} />
        </label>
        <select name="selectedFunction" onChange={handleSelectChange}>
          <option value="">Select a function</option>
          {Object.keys(functionsList).map((label) => (
            <option key={label} value={functionsList[label]}>
              {label}
            </option>
          ))}
        </select>
        <input
          name="inputValue"
          type="number"
          value={pollData.inputValue}
          onChange={handleInputChange}
          placeholder="Enter a number"
        />
        <br />
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollCreate;
