import React, { Component } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from "axios";

import { domain, API, endpoint } from '../../config/app.json'
import { AUTH_TOKEN } from '../../helper';

class LoginForm extends Component {
  state = {
    validate: false,
    loading: false,
    username: '',
    password: '',
    error: '',
  }

  handleLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.setState({ loading: true, validate: true, error: '' });
    axios.post(domain.env.siteUrl + API.WP + API.JWT + endpoint.token, {
      username,
      password
    })
    .then(user => this.handleLoginSuccess(user.data))
    .catch(error => this.handleLoginFail(error))
  }

  handleLoginSuccess = user => {
    localStorage.setItem(AUTH_TOKEN, JSON.stringify(user));
    console.log('user', user)
    this.setState({
      validate: false,
      loading: false,
      username: '',
      password: '',
      error: ''
    });
    this.props.history.push('/coding');
  }

  handleLoginFail = error => {
    this.setState({ validate: true, loading: false, error: 'Invalid username / password' });
  }

  handleUsername = username => {
    this.setState({ username });
  }

  handlePassword = password => {
    this.setState({ password });
  }

  renderError() {
    if (this.state.error) {
      return (
        <Alert variant="danger">
          {this.state.error}
        </Alert>
      )
    } else if (this.state.loading) {
      return (
        <Alert variant="primary">
          Loading...
        </Alert>
      )
    }
  }

  render() {
    const { validate } = this.state;
    return (
      <div className="container">
        <Form 
          method="POST" 
          noValidate
          validated={validate}
          onSubmit={this.handleLogin}
        >
          <h2>coding.toekomstshool</h2>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label><br />
            <Form.Control 
              type="text" 
              required 
              placeholder="Username / Email"
              onChange={event => this.handleUsername(event.target.value)}
              value={this.state.username}
            />
          </Form.Group>

          <br />

          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label><br />
            <Form.Control 
              type="password" 
              required 
              placeholder="Password"
              onChange={event => this.handlePassword(event.target.value)}
              value={this.state.password}
            />
          </Form.Group>
          <br />
          {this.renderError()}
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    )
  }
}

export default LoginForm;
