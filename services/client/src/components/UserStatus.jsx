import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserStatus extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            id: "",
            username: ""
        };
    };

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.getUserStatus();
        }
    };

    getUserStatus() {
        const options = {
            url: `${process.env.REACT_APP_USERS_SERVICE_URL}/users/auth/status`,
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${window.localStorage.auth_token}`
            }
        };
        return axios(options)
            .then((res) => {
                // console.log(res);
                // console.log(res.data.data);
                this.setState({
                    email: res.data.data.email,
                    id: res.data.data.id,
                    username: res.data.data.username,
                    active: String(res.data.data.active),
                    admin: String(res.data.data.admin)
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    
    render() {
        if (this.props.isAuthenticated) {
            return (
                <div> <ul>
                    <li><strong>User ID:</strong> {this.state.id}</li>
                    <li><strong>Email:</strong> {this.state.email}</li>
                    <li><strong>Username:</strong> {this.state.username}</li>
                    <li><strong>Admin:</strong> {this.state.admin}</li>
                    <li><strong>Active:</strong> {this.state.active}</li>
                </ul> </div>
            )
        }
        return (
            <p>You must be logged in to view this. Click <Link to="/login">here</Link> to log back in.</p>
        ) 
    };
};

export default UserStatus;