import React, { useState, useEffect } from 'react';
import './ListDocument.css';
import api from '../Service/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';


const ListDocument = () => {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    field:'CREATE',
    symbolNumber: '',
    description: '',
    createdAt: ''
  });
  const [sdocs, setSdocs] = useState({
    description: ''
  });
  const [open, setOpen] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await api.get('/doc/getAll', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setDocs(response.data);
        setFilteredDocs(response.data); 
        setSdocs(response.data.describeOfDoc)
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value
    }));
  };

  useEffect(() => {
    const filtered = docs.filter(doc =>
      doc.field.toLowerCase().includes(filter.field.toLowerCase()) &&
      doc.symbolNumber.toLowerCase().includes(filter.symbolNumber.toLowerCase()) &&
      doc.describeOfDoc.toLowerCase().includes(filter.description.toLowerCase())
    );

    setFilteredDocs(filtered);
  }, [filter, docs]);

  const handleClickOpen = (doc) => {
    setDocToDelete(doc);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDocToDelete(null);
  };

  const handleDelete = async () => {
    if (!docToDelete) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await api.delete(`/doc/delete/${docToDelete.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setDocs(prevDocs => prevDocs.filter(doc => doc.id !== docToDelete.id));
      setFilteredDocs(prevFilteredDocs => prevFilteredDocs.filter(doc => doc.id !== docToDelete.id));

      toast.success('Tài liệu đã được xóa thành công!');
    } catch (error) {
      setError(error.message);
      toast.error('Có lỗi xảy ra khi xóa tài liệu!');
    } finally {
      handleClose();
    }
  };


  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).toLocaleDateString();
  };
  const handleApprove = async (doc) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const updatedDoc = { ...doc, field: 'Field Name' };
      await api.put(`/doc/update/${doc.id}`, updatedDoc, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      setDocs(prevDocs => prevDocs.map(d => d.id === doc.id ? updatedDoc : d));
      setFilteredDocs(prevFilteredDocs => prevFilteredDocs.map(d => d.id === doc.id ? updatedDoc : d));

      toast.success('Tài liệu đã được duyệt thành công!');
    } catch (error) {
      setError(error.message);
      toast.error('Có lỗi xảy ra khi duyệt tài liệu!');
    }
  };
  const handleFileView = async (filePath) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await api.get(`/doc/file/${filePath}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      window.open(response.data.url, '_blank');
    } catch (error) {
      setError(error.message);
      toast.error('Có lỗi xảy ra khi xem tài liệu!');
    }
  };



  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  



  return (
    <div className="task-list">
      <ToastContainer />

      <h2>Duyệt văn bản</h2>
      <table>
        <thead>
          <tr>
            <th>Số ký hiệu</th>
            <th>Mô tả</th>
            <th>Cơ quan phát hành</th>
            <th>Được tạo bởi</th>
            <th>Được tạo vào</th>
            <th>Phiên bản</th>
            <th>Hành động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredDocs.length > 0 ? (
            filteredDocs.map(doc => (
              <React.Fragment key={doc.id}>

                <tr>
                  <td>{doc.symbolNumber}</td>
                  <td>{doc.describeOfDoc}</td>
                  <td>{doc.issuingAuthority}</td>
                  <td>{doc.createdBy.fullName}</td>
                  <td>{formatDate(doc.createdAt)}</td>
                  <td>
                    {doc.versions.length > 0 ? (
                      <ul>
                        {doc.versions.map(version => (
                          <li key={version.id}>
                            Version {version.versionNumber} by {version.createdBy.fullName} on {formatDate(version.createdAt)} <br/>
                            File Path: <a href="#" onClick={() => handleFileView(version.filePath)}>{version.filePath}</a>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'No versions'
                    )}
                  </td>
                  <td>
                    <button className="button" onClick={() => handleClickOpen(doc)}>Xóa</button>
                  </td>
                  <td>
                  <button className="button" onClick={() => handleApprove(doc)}>Duyệt văn bản</button>
                  </td>
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="7">No documents found</td>
            </tr>
          )}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa tài liệu này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListDocument;
