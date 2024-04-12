import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import axios from 'axios';

function Document() {
    const [documents, setDocuments] = useState([]);
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

    const handleSearch = () => {
        // Your search logic here
    };
    const handleDetail = (documentId) => {
    
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

    return (
        <div>
            <h3>Search Documents</h3>
            <Grid container spacing={1} alignItems="center" style={{ marginBottom: "20px", background: "#f9f9f9", height: "70%" }}>
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <p>Search by Symbol Number</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Symbol Number"
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
                            <p>Search by Field</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Field"
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
                            <p>Search by Date</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Date"
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
                <Grid item xs={12} sm={6}>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <p>Search by Keyword</p>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Keyword"
                                variant="outlined"
                                fullWidth
                                size="small"
                                sx={{ width: "50%" }} // Adjust width here
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </Grid>
            </Grid>
            <h2>All Documents</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong style={{ color: 'blue' }}>Symbol Number</strong></TableCell>
                            <TableCell><strong style={{ color: 'green' }}>Date</strong></TableCell>
                            <TableCell><strong style={{ color: 'red' }}>Description</strong></TableCell>
                            <TableCell><strong style={{ color: 'purple' }}>Issuing Authority</strong></TableCell>
                            <TableCell><strong style={{ color: 'orange' }}>Field</strong></TableCell>
                            <TableCell><strong style={{ color: 'teal' }}>File URL</strong></TableCell>
                            <TableCell><strong>Action</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document, index) => (
                            <TableRow key={document.idDocument} style={{ background: index % 2 === 0 ? '#f5f5f5' : 'white' }}>
                                <TableCell>{document.symbolNumber}</TableCell>
                                <TableCell>{document.date}</TableCell>
                                <TableCell>{document.describeOfDoc}</TableCell>
                                <TableCell>{document.issuingAuthority}</TableCell>
                                <TableCell>{document.field}</TableCell>
                                <TableCell>
                                    <a href={document.fileUrl} target="_blank" rel="noopener noreferrer">{document.fileUrl}</a>
                                </TableCell>
                                <TableCell>
                                  <Button variant="contained" color="primary" size="small" sx={{ marginRight: '5px' }} onClick={() => handleDetail(document.idDocument)}>Detail</Button>
                                  <Button variant="contained" color="secondary" size="small" onClick={() => handleDelete(document.idDocument)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <h3>the end</h3>
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
