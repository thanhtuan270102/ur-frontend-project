import React from 'react';
import Sidebar from '../Home/Sidebar';
import Navbar from '../Home/Navbar';
import List from './ListDocument'
import ProjectsInProgress from '../Home/ProjectsInProgress';
import '../Home/Home.css';

const DuyetDocument = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <List />
          <div className="dashboard-widgets">
            <ProjectsInProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DuyetDocument;
