import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell,List, ListItem, ListItemText, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from 'axios';

function Document() {
    const [documents, setDocuments] = useState([]);
    const [documentFilter, setDocumentsFilter] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [symbolNumber, setSymbolNumber] = useState("");
    const [field, setField] = useState("");
    const [date, setDate] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [documentToDelete, setDocumentToDelete] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/doc/getAll')
            .then(response => response.json())
            .then(data => setDocuments(data))
            .catch(error => console.error('Error fetching documents:', error));
    }, []);
    useEffect(() => {
        fetch('http://localhost:8080/api/doc/getAll')
            .then(response => response.json())
            .then(data => setDocumentsFilter(data))
            .catch(error => console.error('Error fetching documents:', error));
    }, []);

    const handleSearch = () => {
        const filteredDocuments = documentFilter.filter(document => {
            const conditions = [];
            if (symbolNumber) conditions.push(document.symbolNumber.includes(symbolNumber));
            if (field) conditions.push(document.field.includes(field));
            if (date) conditions.push(document.date.includes(date));
            if (searchTerm) conditions.push(document.describeOfDoc.includes(searchTerm));
    
            return conditions.length === 0 || conditions.every(condition => condition);
        });
    

        const uniqueDocuments = Array.from(new Set(filteredDocuments.map(doc => doc.idDocument))).map(id => {
            return filteredDocuments.find(doc => doc.idDocument === id);
        });
    

        setDocuments(uniqueDocuments);
    };
    
    const handleVersion = (symbolNumber) => {
        const filteredDocuments = documentFilter.filter(document => {
            return (
                document.symbolNumber.includes(symbolNumber)
            );
        });
        
        setDocuments(filteredDocuments);
    
    };
  
     const handleDelete = (id) => {
        setDocumentToDelete(id);
        setConfirmDelete(true);
    };
    
    const confirmDeleteHandler = () => {
    axios.delete(`http://localhost:8080/api/doc/delete/${documentToDelete}`)
        .then(response => {
            if (response.status === 200) {
                const updatedDocuments = documents.filter(doc => doc.idDocument !== documentToDelete);
                setDocuments(updatedDocuments);
                console.log("Document deleted successfully!");
            } else {
                console.error("Failed to delete document.");
            }
        })
        .catch(error => {
            console.error("Error deleting document:", error);
        })
        .finally(() => {
            setDocumentToDelete(null);
            setConfirmDelete(false);
        });
    };

    const cancelDeleteHandler = () => {
        setDocumentToDelete(null);
        setConfirmDelete(false);
    };
    const handleReload =() =>{
        window.location.reload();

    };
    const sortByIssuing = (issuing) => {
        console.log(issuing +"1")
        const filteredDocuments = documentFilter.filter(document => {
            console.log(document.issuingAuthority)
            return (
                document.issuingAuthority.includes(issuing)
              
            );
           
        });
        
        setDocuments(filteredDocuments);
    
    };
 

    return (
        
        <div>
            <div className={"header"}>
                {/*<Images/>*/}
            </div>
            <h3>TÌM KIẾM TÀI LIỆU</h3>
      
            <Grid container spacing={1} alignItems="center" style={{ marginBottom: "20px", background: "#f9f9f9", height: "70%" }}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <p>Tìm kiếm bằng số hiệu văn bản:</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Số hiệu văn bản"
                                variant="outlined"
                                fullWidth
                                size="small"
                                sx={{ width: "50%" }} // Adjust width here
                                value={symbolNumber}
                                onChange={(e) => setSymbolNumber(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <p>Tìm kiếm theo lĩnh vực: </p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Lĩnh vực"
                                variant="outlined"
                                fullWidth
                                size="small"
                                sx={{ width: "50%" }} // Adjust width here
                                value={field}
                                onChange={(e) => setField(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <p>Tìm kiếm theo Ngày:</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Ngày"
                                variant="outlined"
                                type="date"
                                fullWidth
                                size="small"
                                sx={{ width: "50%" }} // Adjust width here
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            
                <Grid item xs={12}>
                    <Button variant="contained" style={{margin:"10px"}} onClick={handleSearch}>Tìm Kiếm</Button>
                </Grid>
            </Grid>
            <h2>CƠ QUAN</h2>
            <Table>
            <TableRow>
                <TableCell  style={{ cursor: 'pointer' }} onClick={() => sortByIssuing("VĂN PHÒNG UBND TỈNH")}>VĂN PHÒNG UBND TỈNH</TableCell>
                <TableCell  style={{ cursor: 'pointer' }} onClick={() => sortByIssuing("SỞ KẾ HOẠCH VÀ ĐẦU TƯ")}>SỞ KẾ HOẠCH VÀ ĐẦU TƯ</TableCell>
                <TableCell  style={{ cursor: 'pointer' }} onClick={() => sortByIssuing("SỞ NỘI VỤ")}>SỞ NỘI VỤ</TableCell>
            </TableRow>
            <TableRow>
                <TableCell  style={{ cursor: 'pointer' }} onClick={() => sortByIssuing("SỞ TƯ PHÁP")}>SỞ TƯ PHÁP</TableCell>
                <TableCell  style={{ cursor: 'pointer' }} onClick={() => sortByIssuing("SỞ CÔNG THƯƠNG")}>SỞ CÔNG THƯƠNG</TableCell>
                <TableCell  style={{ cursor: 'pointer' }} onClick={() => sortByIssuing("SỞ GIAO THÔNG VẬN TẢI")}>SỞ GIAO THÔNG VẬN TẢI</TableCell>
            </TableRow>
            </Table>
           
    
            <h2>VĂN BẢN</h2>
            <Button variant="contained" color="primary" style={{margin:"10px"}} size="small" onClick={() => handleReload()}>LÀM MỚI</Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong style={{ color: 'blue' }}>SỐ HIỆU VĂN BẢN</strong></TableCell>
                            <TableCell><strong style={{ color: 'green' }}>NGÀY BAN HÀNH</strong></TableCell>
                            <TableCell><strong style={{ color: 'red' }}>GHI CHÚ</strong></TableCell>
                            <TableCell><strong style={{ color: 'black' }}>PHIÊN BẢN</strong></TableCell>
                            <TableCell><strong style={{ color: 'purple' }}>CƠ QUAN BAN HÀNH</strong></TableCell>
                            <TableCell><strong style={{ color: 'orange' }}>LĨNH VỰC</strong></TableCell>
    
                            <TableCell><strong>HÀNH ĐỘNG</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document, index) => (
                            <TableRow key={document.idDocument} style={{ background: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                                <TableCell>{document.symbolNumber}</TableCell>
                                <TableCell>{document.date}</TableCell>
                                <TableCell>
                                    <p>{document.describeOfDoc}</p>
                                    <a href={document.fileUrl} target="_blank" >{document.fileUrl}</a>
                                </TableCell>
                                <TableCell>{document.version}</TableCell>
                                <TableCell>{document.issuingAuthority}</TableCell>
                                <TableCell>{document.field}</TableCell>
                                <TableCell>
                                <Button variant="contained" style={{margin: "10px"}} color="primary" size="small" onClick={() => handleVersion(document.symbolNumber)}>PHIÊN BẢN</Button>
                                  <Button variant="contained" style={{margin: "10px"}} color="secondary" size="small" onClick={() => handleDelete(document.idDocument)}>XÓA</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
          
            <Dialog
                open={confirmDelete}
                onClose={cancelDeleteHandler}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this document?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelDeleteHandler} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDeleteHandler} color="primary" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Document;
