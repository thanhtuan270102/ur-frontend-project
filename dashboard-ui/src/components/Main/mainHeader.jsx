import React from 'react';
import './mainHeader.css';

const Header = () => {
  return (
    
    <header className="header">
      <div className='img'>
   
      <img src='https://datafiles.chinhphu.vn/cpp/1/banner/svg.png'/>
      <p>Đây là dự án học tập, được tham khảo từ chinhphu.vn</p>
   
      </div>
     <div className='search'> 
      <h3>Tìm kiếm</h3>    
      <input type="text" placeholder="Search" className="search-input" />
      </div>
    </header>
  );
};

export default Header;
