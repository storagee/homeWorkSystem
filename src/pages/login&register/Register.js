import React, { Component } from 'react';
import './register.css';
import { Link } from 'react-router';
import * as utils from '../../common/utils';
import { message } from 'antd';

class Register extends Component {
    render() {
        return (
            <NormalLoginForm />
        )
    }
}

export default Register;

import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;

const NormalLoginForm = Form.create()(React.createClass({
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                fetch(`${utils.getPrefixUrl()}/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                }).then(response => {
                    return response.json();
                }).then(json => {
                    if(json.ret === 0) {
                        message.info('注册成功，请登录');
                        location.hash = 'login';
                        sessionStorage.setItem('registerEmail', values.email);
                    } else {
                        message.info(json.msg);
                    }
                }).catch(error => {
                    console.log(error);
                    message.error(''+error);
                });
            }
        });
    },

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    },

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('email', {
                        validate: [{
                            rules: [
                                { required: true, message: "请输入邮箱地址" },
                            ],
                            trigger: 'onBlur',
                        }, {
                            rules: [
                                { type: 'email', message: '请输入正确的邮箱地址' },
                            ],
                            trigger: ['onBlur'],
                        }]
                    })(
                        <Input addonBefore={<Icon type="user" />} placeholder="邮箱" />
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
                    {getFieldDecorator('repassword', {
                        validate:[{
                            rules: [{ required: true, message: '请确认密码' }, {
                                validator: this.checkPass2,
                            }],
                            trigger: ['onBlur']
                        }]
                    })(
                        <Input addonBefore={<Icon type="lock" />} type="password" placeholder="确认密码" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('isAdmin', {
                        valuePropName: 'checked',
                        initialValue: false,
                    })(
                        <Checkbox>我是教师</Checkbox>
                    )}
                    {/*<a className="login-form-forgot">忘记密码</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        立即注册
                    </Button>
                    <Link to="login">已有账号，去登录</Link>
                </FormItem>
            </Form>
        );
    },
}));