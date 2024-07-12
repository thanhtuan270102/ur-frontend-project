import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import TaskList from './TaskList';
import ProductivityChart from './ProductivityChart';
import ProjectsInProgress from './ProjectsInProgress';
import './Home.css';

const Home = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <TaskList />
          <div className="dashboard-widgets">
            <ProductivityChart />
            <ProjectsInProgress />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
