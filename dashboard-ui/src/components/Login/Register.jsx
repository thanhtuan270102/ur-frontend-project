import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import api from '../Service/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const navigate = useNavigate();

  //handle register
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    password: '',
    rePassword: '',
    termsAgreed: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (formData.password !== formData.rePassword) {
      alert("Mật khẩu và mật khẩu nhập lại không khớp.");
      return;
    }
    
    try {
      const response = await api.post('/users/register', {
        fullname: formData.name,
        password: formData.password,
        retype_password: formData.rePassword,
        email: formData.username,
        role_id: 2,
      });

      console.log('Đăng ký thành công:', response.data);
      toast.success('Đăng ký thành công!');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
  
    } catch (error) {
      console.error('Đăng ký thất bại:', error.response);
      if (error.response && error.response.data) {
        toast.error(`Đăng ký thất bại: ${error.response.data.message || 'Vui lòng thử lại.'}`);
      } else {
        toast.error('Đăng ký thất bại, vui lòng thử lại.');
      }
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="login-container">
    <div className="login-card">
      <h1 className="login-title">Quản lý văn bản chính phủ</h1>
      <h2 className="login-title">Tạo tài khoản</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Tên đăng nhập hoặc Email</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="name">Tên của bạn</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="re-password">Nhập lại mật khẩu</label>
          <input type="password" id="re-password" name="rePassword" value={formData.rePassword} onChange={handleChange} required />
        </div>
        <div className="form-group-check">
          <input type="checkbox" id="terms" name="termsAgreed" checked={formData.termsAgreed} onChange={handleChange} required />
          <label htmlFor="terms">Tôi đồng ý với các điều khoản dịch vụ</label>
        </div>
        <button type="submit" className="login-button">Đăng nhập</button>
        <p className="login-footer">Đã có tài khoản? <a href="/Login">Đăng nhập</a></p>
      </form>
    </div>
    <ToastContainer />
  </div>
);
};

export default Register;
