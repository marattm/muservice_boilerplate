import React, { Component } from 'react';
import axios from 'axios';
import { Switch, Route } from 'react-router-dom'

import UsersList from './components/UsersList';
import About from './components/About';
import NavBar from './components/NavBar';
import Form from './components/Form';
import Logout from './components/Logout';
import UserStatus from './components/UserStatus';

class App extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            username: '',
            email: '',
            active: '',
            admin:'',
            title: 'muServices',
            formData: {
                username: '', 
                email: '', 
                password: ''
            },
            isAuthenticated: false,
            healthData: {
                message:'click on the button',
                status:'waiting for a message..'
            }
        };
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.handleFormChange = this.handleFormChange.bind(this);
        this.health = this.health.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
    };
    
    componentDidMount() {
        this.getUsers();
        // this.health();
        console.log(`${process.env.REACT_APP_USERS_SERVICE_URL}`);
        console.log(`${process.env.REACT_APP_TRAINERS_SERVICE_URL}`);
    };

    getUsers() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/api/v0/users`)
            .then((res) => { this.setState({ users: res.data.data.users }); })
            .catch((err) => { console.log(err); });
    };
    addUser(event) {
        event.preventDefault();
        const data = {
            username: this.state.username,
            email: this.state.email
        };
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/api/v0/users`, data)
            .then((res) => {
                this.getUsers();
                this.setState({ 
                    formData: { username: '', email: '', password: '' },
                    username: '',
                    email: '',
                });
            })
            .catch((err) => { console.log(err); });
    };
    handleSubmitForm(event) {
        event.preventDefault();
        const formType = window.location.href.split('/').reverse()[0];
        let data = {
            email: this.state.formData.email,
            password: this.state.formData.password,
            };
            if (formType === 'register') {
                data.username = this.state.formData.username;
            }
        axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/api/v0/users/auth/${formType}`, data)
            .then((res) => {
                this.getUsers();
                this.setState({
                    formData: { username: '', email: '', password: '' },
                    username: '',
                    email: '',
                    isAuthenticated: true
                });
                // console.log(res.data);
                localStorage.setItem("auth_token", res.data.auth_token);
                // console.log("isAuthenticated: " + this.state.isAuthenticated);
            })
            .catch((err) => { console.log(err); });
    };
    health() {
        axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/api/v0/users/health`)
            .then((res) => {
                if (this.state.healthData.status === "success") {
                   this.setState({
                       healthData: {
                           message: 'click on the button',
                           status: 'waiting for a message..'
                       }
                   })
               } else {
                   this.setState({
                       healthData: {
                           message: res.data.message,
                           status: res.data.status
                       }
                   })
               }
            })
            .catch((err) => { console.log(err); });
    };
    logoutUser() {
        window.localStorage.clear();
        this.setState({isAuthenticated: false});
        // console.log("isAuthenticated: " + this.state.isAuthenticated);
    }
    handleChange(event) {
        const obj = {};
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };
    handleFormChange(event) {
        const obj = this.state.formData;
        obj[event.target.name] = event.target.value;
        this.setState(obj);
    };
    render() {
        return (
            <div>
                <NavBar
                    title={this.state.title}
                    isAuthenticated={this.state.isAuthenticated}
                />
                <div className="container"> 
                    <div className="row">
                        <div className="col-md-6"> <br />
                            <Switch>

                                <Route exact path='/register' render={() => (
                                    <Form
                                        formType={'Register'} 
                                        formData={this.state.formData}
                                        isAuthenticated={this.state.isAuthenticated}
                                        handleFormChange={this.handleFormChange}
                                        handleSubmitForm={this.handleSubmitForm}
                                    />)} 
                                />

                                <Route exact path='/login' render={() => (
                                    <Form
                                        formType={'Login'} 
                                        formData={this.state.formData}
                                        isAuthenticated={this.state.isAuthenticated}
                                        handleFormChange={this.handleFormChange}
                                        handleSubmitForm={this.handleSubmitForm}
                                    />)} 
                                />

                                <Route exact path='/' render={() => (
                                    <div>
                                        <h1>Users List</h1> <hr /><br />
                                        <UsersList
                                            users={this.state.users}
                                        />
                                    </div>
                                )} />

                                <Route
                                    exact path='/about' render={() => (
                                        <About 
                                            healthData={this.state.healthData}
                                            health={this.health}
                                        />
                                    )}

                                />

                                <Route 
                                    exact path='/logout' render={() => (
                                        <Logout
                                            logoutUser={this.logoutUser}
                                            isAuthenticated={this.state.isAuthenticated}
                                        />)
                                    }
                                />

                                <Route exact path='/status' render={() => (
                                    <UserStatus
                                        isAuthenticated={this.state.isAuthenticated}
                                    />
                                )} />

                                

                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
};

export default App;