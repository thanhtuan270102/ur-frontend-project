import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <div className="navbar">
      <img src="https://lh5.googleusercontent.com/proxy/RLuFlU4M335L0Eh0tzNC14P5Y75CV2oWBC6KKaNhGUVW8bpaNlFsWuu_j5D8AoZ6QmKWffzzGhjJDsEChmceqAJ2Az1QGzG6hipuhQYSaA" alt="profile" />
      <div className="user-options">
        {isLoggedIn ? (
          <button onClick={handleLogoutClick} className="login-button">Đăng xuất</button>
        ) : (
          <button onClick={handleLoginClick} className="login-button">Đăng nhập</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
