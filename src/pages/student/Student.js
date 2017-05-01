import React, {Component} from 'react';
import portrait from '../temp/portrait.jpg';
import {Layout, Menu, Button} from 'antd';
const { Header, Content, Footer } = Layout;
import './Student.css';
import { Link } from 'react-router';


class Student extends Component {
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="main-logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        className="header-menu"
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1"><a href="#student/myHomeWork">我的作业</a></Menu.Item>
                        <Menu.Item key="2"><a href="#student/addLesson">加入课程</a></Menu.Item>
                    </Menu>
                    <div className="portrait-logout">
                        <a href="#userInfo" className="portrait-wrap">
                            <img src={portrait} alt="头像"/>
                            <span className="user-name">{localStorage.getItem("userName")? localStorage.getItem("userName"): localStorage.getItem("email")}</span>
                        </a>
                        <Link to="login"><Button className="logout-btn" type="primary">注销</Button></Link>
                    </div>
                </Header>
                <Content style={{padding: '0 50px'}}>
                    {this.props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    home work system ©2017 Created by zhihuilai
                </Footer>
            </Layout>
        );
    }
}

export default Student;
