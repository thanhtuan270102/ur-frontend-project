import React, { useState, useEffect } from 'react';
import Header from './mainHeader';
import Sidebar from './mainSidebar';
import TaskCard from './TaskCard';
import './Main.css';
import api from '../Service/Api';
  
  const Home = () => { 


    return (
      <div className="dashboard">
        <Header />
        <div className="main-content">
          <Sidebar />
          <TaskCard />
        </div>
      </div>
    );
  };
  export default Home;
  