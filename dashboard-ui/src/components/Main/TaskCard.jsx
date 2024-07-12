import React, { useState, useEffect } from 'react';
import api from '../Service/Api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TaskCard.css';


const TaskCard = ({ task }) => {
  const [docs, setDocs] = useState([]);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    field:'Field Name',
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





  const formatDate = (dateArray) => {
    const [year, month, day, hour, minute, second] = dateArray;
    return new Date(Date.UTC(year, month - 1, day, hour, minute, second)).toLocaleDateString();
  };

  const handleFileView = async (filePath) => {
    try {

      const response = await api.get(`/doc/file/${filePath}`, {
       responseType:'blob'
      });
      const blob = new Blob([response.data],{type:response.headers['content-Type'] });
      const url = window.URL.createObjectURL(blob);
      
      const newwindow=  window.open(url, '_blank');
      window.open(response.data.url,'_blank')
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
      <div className="main-content">
       <div className="tasks-container">
        {filteredDocs.map(doc => (
   
        <div className="task-card">
        <div className="task-header">
          <img src="https://png.pngtree.com/png-vector/20190803/ourlarge/pngtree-document-text-basic-ui-line-icon-vector-png-image_1647973.jpg" alt="Task Icon" className="task-icon" />

          <h3 className="task-title">{doc.describeOfDoc}</h3>
        </div>
        <div className="task-dates">
        <p>Số ký hiệu: {doc.symbolNumber}</p>
        </div>
        <div className="task-status">Version : {doc.versions[0].versionNumber}</div>
        <div className="task-footer">
          <p>Được tạo vào ngày: {formatDate(doc.createdAt)}</p>
          <div className="task-users">
          <button onClick={() => handleFileView(doc.versions[0].filePath)}>View File</button>
          </div>
        </div>
        </div>   
         
        ))}
           </div>
      </div>
    );
  };
    



export default TaskCard;
