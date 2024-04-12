import {useState,useEffect} from "react"; 
import React from "react";
function Document(){
    const [documents, setDocuments] = useState([]);


    useEffect(() => {
      fetch('http://localhost:8080/api/doc/getAll')
        .then(response => response.json())
        .then(data => setDocuments(data))
        .catch(error => console.error('Error fetching documents:', error));
    }, []);
  
    return (
      <div>
        <h1>List of Documents</h1>
        <table>
            <thead>
                <tr>
                    <th>Symbol Number</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Issuing Authority</th>
                    <th>Field</th>
                    <th>File URL</th>
                </tr>
            </thead>
            <tbody>
            {documents.map(document => (
                <tr  key={document.idDocument}>
                    <td>{document.symbolNumber}</td>
                    <td>{document.date}</td>
                    <td>{document.describeOfDoc}</td>
                    <td>{document.issuingAuthority}</td>
                    <td>{document.field}</td>
                    <td>{document.fileUrl}</td>
                </tr>
            )
            )}
            </tbody>
        </table>  
        <h3>the end</h3>
      </div>
    );
  }


export default Document;