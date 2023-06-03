import React, { useState } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const LoginForm = ({ onLogin }) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = values => {
    setLoading(true);
    const loginRequest = { ...values };
    login(loginRequest)
      .then(response => {
        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        onLogin();
      })
      .catch(error => {
        if (error.status === 401) {
          notification.error({
            message: 'Restaurant App',
            description: 'Your Username or Password is incorrect. Please try again!',
          });
        } else {
          notification.error({
            message: 'Restaurant App',
            description: error.message || 'Sorry! Something went wrong. Please try again!',
          });
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form onFinish={handleSubmit} onFinishFailed={onFinishFailed} className="login-form">
      <Form.Item
        name="usernameOrEmail"
        rules={[{ required: true, message: 'Please input your username or email!' }]}
      >
        <Input prefix={<UserOutlined />} size="large" name="usernameOrEmail" placeholder="Username or Email" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password!' }]}>
        <Input
          prefix={<LockOutlined />}
          size="large"
          name="password"
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="login-form-button"
          loading={loading}
        >
          Login
        </Button>
        Or <Link to="/signup">register now!</Link>
      </Form.Item>
    </Form>
  );
};

const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      <h1 className="page-title">Login</h1>
      <div className="login-content">
        <LoginForm onLogin={onLogin} />
      </div>
    </div>
  );
};

export default Login;
