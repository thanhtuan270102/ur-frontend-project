import React, { useState, useEffect } from 'react';
import './ProductivityChart.css';
import api from '../Service/Api';
import axios from 'axios';

const ProductivityChart = () => {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);

  useEffect(() => {
    // Fetch dữ liệu từ API hoặc đặt dữ liệu mẫu
    const fetchDocs = async () => {
      const response = await api.get('/doc/getAll'); // Thay bằng API thực tế
      setDocs(response.data);
      setFilteredDocs(response.data);
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
  return (
    <div className="task-list">
    <button onClick={handleCluster}>Cluster Documents</button>
    <table>
      <thead>
        <tr>
          <th>Số ký hiệu</th>
          <th>Mô tả</th>
          <th>Được tạo vào</th>
          <th>Hành động</th>
          <th>Cụm</th>
        </tr>
      </thead>
      <tbody>
        {filteredDocs.length > 0 ? (
          filteredDocs.map(doc => (
            <tr key={doc.id}>
              <td>{doc.symbolNumber}</td>
              <td>{doc.describeOfDoc}</td>
              <td>{doc.createdAt}</td>
              <td>
                <button className="button">Xóa</button>
              </td>
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
