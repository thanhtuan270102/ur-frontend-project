import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import axios from 'axios';
import api from '../Service/Api';


const Sidebar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const postDataUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await api.post('/users/details', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.data); 
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    postDataUser();
  }, []);
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>VĂN BẢN CHÍNH PHỦ</h2>
      </div>
      <ul>
        <li> <a href="/Home">Quản lý văn bản</a></li>
        <li> <a href="/CreateDocument">Thêm văn bản</a></li>
        <li>Duyệt văn bản</li>
        <li>Ban hành văn bản</li>
        <li>Hoạt động</li>
        <li>Quản lý người dùng</li>
      </ul>
      <div className="profile">
        <img src="https://i.pinimg.com/564x/79/84/69/7984693f5dba425a90ab79c86ab584a0.jpg" alt="profile" />
        {userData && (
          <>
            <p>{userData.fullname}</p>
            <p>{userData.email}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
