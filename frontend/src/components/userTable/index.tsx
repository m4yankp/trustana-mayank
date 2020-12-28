import React from 'react';
import { Table } from 'react-bootstrap';

export default function UserTable(state: any): JSX.Element{
   
   return (
    <Table striped bordered hover>
        <thead>
            <tr>
            <th colSpan={2}>User's Detail</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>First Name</td>
            <td>{state.state.firstName}</td>
            
            </tr>
            <tr>
            <td>Last Name</td>
            <td>{state.state.lastName}</td>
            
            </tr>
            <tr>
            <td>Address</td>
            <td>{state.state.address}</td>
            </tr>
            <tr>
            <td>Date Of Birth</td>
            <td>{state.state.dateOfBirth}</td>
            </tr>
            <tr>
            <td>CV Link</td>
            <td><a href={`http://localhost:4000/api/decryptedFilePublic/${state.state.filePath}`}>Download File</a></td>
            </tr>
        </tbody>
    </Table>
     )
}