import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import './Login.css';

//const api = require('../../api/Api')
import {instanceAxs, checkLogin} from '../../api/Api'
axios.defaults.withCredentials = true;

class Login extends React.Component{ 
    constructor(props){
        super(props);
        this.state = {
            user: {
                email: '',
                password: ''
            },
            message: 'Login message here',
            checklog: 'Check login message here',
            logout: 'Logout message here'
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    

    handleChange = (event) => {
        let user = this.state.user
        if (event.target.name === 'email') {
            user.email = event.target.value;
        } else if (event.target.name === 'pass') {
            user.password = event.target.value;
        } 
        this.setState({ user });
    }

    handleSubmit(event){
        event.preventDefault();

        /*axios.post('http://localhost:3080/user/login', this.state.user)
            .then(response => {
                console.log(response);
                console.log(response.data);
                //console.log(response.data.sessUser)
                this.setState({ message: response.data.message });
        });*/
        instanceAxs.post('/login', this.state.user)
            .then(response => {
                console.log(response)
                this.setState({ message: response.data.message});
                this.props.history.push('/');
            })    
    }

    checklogin = async () => {
        checkLogin();
    }

    logout = () => {
        axios.get('http://localhost:3080/user/logout')
            .then(response => {
                console.log(response);
                this.setState({ 
                    logout: response.data.message
                });
            })
    }


    
    render(){
        return(
            <form id="login-form" onSubmit={this.handleSubmit}>
                <div class="mb-3">
                    <label class="form-label">Email address</label>
                    <input type="email" className="email form-control" name="email" required onChange={this.handleChange}></input>
                </div>
                <div class="mb-3">
                    <label for="inputPassword5" className="form-label">Password</label>
                    <input type="text" className="pass form-control" name="pass" required onChange={this.handleChange}></input>
                </div>
                
                <button type="submit" class="btn btn-primary d-block">Login</button>
                <p>{this.state.message}</p>
                <hr/>              
                <button type='button' className="btn btn-primary d-block" onClick={this.checklogin}>Check Login</button>
                <p>{this.state.checklog}</p>
                <hr/>
                <button type='button' className="btn btn-primary d-block" onClick={this.logout}>Logout</button>
                <p>{this.state.logout}</p>
                <hr/>
                <Link to="/register">Register</Link>
            </form>
        )
    }
}

export default Login;