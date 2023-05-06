import React, { useState } from 'react';
import { useRouter } from 'next/router';

interface PollCreateData {
  title: string;
  description: string;
  createdBy: string;
}

const PollCreate: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PollCreateData>({
    title: '',
    description: '',
    createdBy: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Faça alguma ação com os dados do formulário (por exemplo, envie para um servidor)
    router.push('/');
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="poll-create">
      <h1>Create a Poll</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" name="title" value={formData.title} onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleInputChange} />
        </label>
        <label>
          Created By:
          <input type="text" name="createdBy" value={formData.createdBy} onChange={handleInputChange} />
        </label>
        <button type="submit">Create Poll</button>
      </form>
    </div>
  );
};

export default PollCreate;
