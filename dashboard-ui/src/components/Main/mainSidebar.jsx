import React from 'react';
import './mainSidebar.css';

const mainSidebar = () => {
  return (
    <aside className="msidebar">
      <div className="mtabs">
        <div className="mtab mactive">Văn bản chính phủ</div>
        <div className="mtab">Việt Nam</div>
        <img className='mimg' src="https://lh5.googleusercontent.com/proxy/RLuFlU4M335L0Eh0tzNC14P5Y75CV2oWBC6KKaNhGUVW8bpaNlFsWuu_j5D8AoZ6QmKWffzzGhjJDsEChmceqAJ2Az1QGzG6hipuhQYSaA" alt="profile" />
      </div>
    </aside>
  );
};

export default mainSidebar;
