import React, { useContext } from 'react';
import { Table } from 'react-bootstrap';
import { Store } from '../../Store';

export default function UserData(): JSX.Element {
  const { state, dispatch } = useContext(Store);
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
            <td>{state.firstName}</td>
            
            </tr>
            <tr>
            <td>Last Name</td>
            <td>{state.lastName}</td>
            
            </tr>
            <tr>
            <td>Address</td>
            <td>{state.address}</td>
            </tr>
            <tr>
            <td>Date Of Birth</td>
            <td>{state.dateOfBirth}</td>
            </tr>
            <tr>
            <td>CV Link</td>
            <td>{state.filePath}</td>
            </tr>
            <tr>
            <td>Date Created</td>
            <td>{state.dateCreated}</td>
            </tr>
        </tbody>
    </Table>
  )
}
