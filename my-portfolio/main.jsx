import React, { useState } from 'react';

const JobOfferForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [salaryRange, setSalaryRange] = useState('');
  const [attachment, setAttachment] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('jobTitle', jobTitle);
    formData.append('jobDescription', jobDescription);
    formData.append('salaryRange', salaryRange);
    formData.append('attachment', attachment);

    try {
      const response = await fetch('/api/job-offers', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        // Display success message or perform any other actions
        console.log('Job offer submitted successfully!');
      } else {
        // Handle error response
        console.error('Error submitting job offer');
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error submitting job offer', error);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      {/* Repeat the same pattern for other form fields */}
      {/* Phone, Email, Job Title, Job Description, Salary Range, Attachment */}
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobOfferForm;


