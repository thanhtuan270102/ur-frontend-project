import React from 'react';
import Sidebar from '../Home/Sidebar';
import Navbar from '../Home/Navbar';
import ProjectsInProgress from '../Home/ProjectsInProgress';
import CreateDocumentForm from './CreateDocumentForm';
import '../Home/Home.css';

const CreateDocument = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="content">
          <CreateDocumentForm />
          <div className="dashboard-widgets">
            <ProjectsInProgress />
         
          </div>
     
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;
