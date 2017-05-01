import React, { Component } from 'react';
import './login.css';
import { Link } from 'react-router';
import * as utils from '../../common/utils';
import { message } from 'antd';

class Login extends Component {
    render() {
        return (
            <NormalLoginForm />
        )
    }
}

export default Login;

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const NormalLoginForm = Form.create()(React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                localStorage.setItem('isAdmin', values.isAdmin);
                fetch(`${utils.getPrefixUrl()}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(response => {
                    return response.json();
                }).then(json => {
                    if(json.ret === 0) {
                        localStorage.setItem('email', values.email);
                        localStorage.setItem('userId', json.data.userId);
                        if(values.isAdmin) {
                            location.hash = 'admin/myLessons'
                        } else {
                            location.hash = "student/myHomeWork"
                        }
                    } else {
                        message.error(json.msg);
                    }
                }).catch(error => {
                    message.error(''+error);
                });
            }
        });
    },
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('isAdmin', {
                        valuePropName: 'checked',
                        initialValue: localStorage.getItem('isAdmin') === 'true',
                    })(
                        <Checkbox>我是教师</Checkbox>
                    )}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        立即登录
                    </Button>
                    <Link to="register">立即注册</Link>
                </FormItem>
            </Form>
        );
    },
}));