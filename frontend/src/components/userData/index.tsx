import React from 'react'
import { Table } from 'react-bootstrap'

export default function UserData(userData: any): JSX.Element {
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
            <td>Mark</td>
            
            </tr>
            <tr>
            <td>Last Name</td>
            <td>Jacob</td>
            
            </tr>
            <tr>
            <td>Address</td>
            <td></td>
            </tr>
            <tr>
            <td>Date Of Birth</td>
            <td></td>
            </tr>
            <tr>
            <td>CV Link</td>
            <td></td>
            </tr>
            <tr>
            <td>Date Created</td>
            <td></td>
            </tr>
        </tbody>
    </Table>
  )
}
