import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ListUsers.css'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from '@mui/material';

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editFullName, setEditFullName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://localhost:8080/api/users/getAll', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://localhost:8080/api/users/delete/${selectedUser.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
      setOpenDeleteDialog(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  const handleOpenEditDialog = (user) => {
    setSelectedUser(user);
    setEditFullName(user.fullName);
    setEditEmail(user.email);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
    setEditFullName('');
    setEditEmail('');
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const updatedUser = {
        ...selectedUser,
        fullName: editFullName,
        email: editEmail
      };

      await axios.put(`http://localhost:8080/api/users/updateByAdmin/${selectedUser.id}`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === updatedUser.id ? updatedUser : user))
      );
      handleCloseEditDialog();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChangeFullName = (event) => {
    setEditFullName(event.target.value);
  };

  const handleChangeEmail = (event) => {
    setEditEmail(event.target.value);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Quản lý người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Họ và tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.email}</td>
              <td>{user.role.nameRole}</td>
              <td>
                <button onClick={() => handleOpenDeleteDialog(user)} className='button-user'>Xoá</button>
                <button onClick={() => handleOpenEditDialog(user)} className='button-user'>Sửa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dialog Xoá */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Xác nhận xoá</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xoá người dùng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteUser} color="secondary">
            Xoá
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Sửa */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
        <DialogTitle>Chỉnh sửa thông tin người dùng</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editFullName"
            label="Họ và tên"
            type="text"
            fullWidth
            value={editFullName}
            onChange={handleChangeFullName}
          />
          <TextField
            margin="dense"
            id="editEmail"
            label="Email"
            type="email"
            fullWidth
            value={editEmail}
            onChange={handleChangeEmail}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Hủy
          </Button>
          <Button onClick={handleEditUser} color="primary">
            Lưu
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListUsers;
