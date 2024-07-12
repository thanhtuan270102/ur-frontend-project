import React from 'react';
import './ProjectsInProgress.css';

const ProjectsInProgress = () => {
  return (
    <div className="projects-in-progress">
      <h2>Nhóm 13</h2>
      <div className="project-card">
        <h3>Quản lý văn bản chính phủ</h3>

        <div className="tags"> 
          <div class="container">
              <div class="cloud front">
                <span class="left-front"></span>
                <span class="right-front"></span>
              </div>
                <span class="sun sunshine"></span>
                <span class="sun"></span>
            <div class="cloud back">
              <span class="left-back"></span>
              <span class="right-back"></span>
            </div>
          </div>
          <div class="loading-wave">
          <div class="loading-bar"></div>
           <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          </div>
          <div class="loading-wave">
          <div class="loading-bar"></div>
           <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          </div>
           <main>
          <article>
            <button className='button-xe'>
              Enter ballot
            </button>
          </article>
        </main>
           
        </div>
      </div>
    </div>
  );
};

export default ProjectsInProgress;
