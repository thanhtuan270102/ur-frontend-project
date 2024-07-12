import React, { useState } from 'react';
import axios from 'axios';
import api from '../Service/Api';
import { useNavigate } from 'react-router-dom';
import './CreateDocument.css';

const CreateDocumentForm = () => {
  const [formData, setFormData] = useState({
    symbolNumber: '',
    describeOfDoc: '',
    issuingAuthority: '',
    field: 'CREATE',
    createdBy: 1,
    versions: [{
      versionNumber: 2,
      filePath: '',
      createdBy: 1
    }]
  });

  const [file, setFile] = useState(null); // State để lưu trữ file đã chọn
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Lưu trữ file đã chọn vào state
    setFormData({
      ...formData,
      versions: [{
        ...formData.versions[0],
        filePath: selectedFile ? selectedFile.name : ''
      }]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      // Validate form fields
      if (!formData.symbolNumber || !formData.describeOfDoc || !formData.issuingAuthority || !formData.versions[0].filePath) {
        setErrorMessage('Please fill in all fields and choose a file.');
        return;
      }

      const formDataForUpload = new FormData();
      formDataForUpload.append('files', file); 

      const createDocResponse = await api.post('/doc/create', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setSuccessMessage('Document created successfully!');
      console.log('Document created successfully:', createDocResponse.data.id);
      console.log('Document version ID:', createDocResponse.data.versions[0].id);

      // Upload file to server endpoint http://localhost:8080/api/doc/uploads/5
      const uploadResponse = await api.post(`/doc/uploads/${createDocResponse.data.versions[0].id}`, formDataForUpload, {
      headers: {
         'Authorization': `Bearer ${token}`,
         'Content-Type': 'multipart/form-data'
         }
      });

    } catch (error) {
      console.error('Error creating document:', error);
      setErrorMessage('Error creating document. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Thêm văn bản</h1>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <div>
        <label>Symbol Number:</label>
        <input
          type="text"
          name="symbolNumber"
          value={formData.symbolNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Describe of Document:</label>
        <input
          type="text"
          name="describeOfDoc"
          value={formData.describeOfDoc}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Issuing Authority:</label>
        <input
          type="text"
          name="issuingAuthority"
          value={formData.issuingAuthority}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Choose File:</label>
        <input
          type="file"
          onChange={handleFileChange}
        />
      </div>
      <button type="submit">Create Document</button>
    </form>
  );
};

export default CreateDocumentForm;
