import React from 'react';
import { Table } from 'react-bootstrap';

const UsersList = (props) => {
    return (
        <div>
            <Table striped bordered condensed hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.users.map((user) => {
                            return (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{String(user.admin)}</td>
                                        <td>{String(user.active)}</td>
                                    </tr>
                                    )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
};

export default UsersList;


// <h4
//     key={user.id}
//     className="well" >{user.username}
// </h4>