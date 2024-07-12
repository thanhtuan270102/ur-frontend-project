import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../Service/Api';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role_id: 1,
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/users/login', {
        email: formData.email,
        password: formData.password,
        role_id: formData.role_id,
      });

      if (response.data.message === "LOGIN_SUCCESSFULLY") {
        localStorage.setItem('token', response.data.token);
        toast.success('Đăng nhập thành công!');
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        toast.error('Đăng nhập thất bại, vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Đăng nhập thất bại:', error.response);
      toast.error('Đăng nhập thất bại, vui lòng thử lại.');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Quản lý văn bản chính phủ</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Tên đăng nhập hoặc Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">Chọn vai trò: &emsp;</label>
            <select
              id="role"
              name="role_id"
              value={formData.role_id}
              onChange={handleChange}
              required
            >
              <option value={2}>Biên tập viên</option>
              <option value={1}>Quản trị viên</option>
            </select>
          </div>
          <div className="form-group-check">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              required
            />
            <label htmlFor="terms">Tôi đồng ý với các điều khoản dịch vụ</label>
          </div>
          <button type="submit" className="login-button">Đăng nhập</button>
          <p className="login-footer">Chưa có tài khoản? <a href="/Register">Đăng ký</a></p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
