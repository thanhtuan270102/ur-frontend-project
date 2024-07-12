import React, { useState, useEffect } from 'react';
import './ProductivityChart.css';
import api from '../Service/Api';
import axios from 'axios';

const ProductivityChart = () => {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  useEffect(() => {

    const fetchDocs = async () => {
      const response = await api.get('/doc/getAll'); 
      const filteredData = response.data.filter(doc => doc.field === 'Field Name');
      setDocs(filteredData);
      setFilteredDocs(filteredData);
    };

    fetchDocs();
  }, []);


  const handleCluster = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/cluster', { docs: filteredDocs });
      console.log('Clusters:', docs);
      setFilteredDocs(response.data);
      console.log('Clusters:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).toLocaleDateString();
  };
  return (
    <div className="task-list">
    <button onClick={handleCluster}>Cluster Documents</button>
    <table>
      <thead>
        <tr>
          <th>Số ký hiệu</th>
          <th>Mô tả</th>
          <th>Được tạo vào</th>
           
          <th>Cụm</th>
        </tr>
      </thead>
      <tbody>
        {filteredDocs.length > 0 ? (
          filteredDocs.map(doc => (
            <tr key={doc.id}>
              <td>{doc.symbolNumber}</td>
              <td>{doc.describeOfDoc}</td>
              <td>{formatDate(doc.createdAt)}</td>
              <td>{doc.cluster}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8">No documents found</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
};

export default ProductivityChart;
