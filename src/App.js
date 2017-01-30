import React, { Component } from 'react';
import portrait from './temp/portrait.jpg';
import './App.css';
import { Layout, Menu, Button } from 'antd';
const { Header, Content, Footer } = Layout;
import { Router, Route, hashHistory } from 'react-router'
import MyHomeWork from './pages/myHomeWork/MyHomeWork';
import AddLesson from './pages/addLesson/AddLesson';

class App extends Component {
  render() {
    return (
        <Layout className="layout">
            <Header>
                <div className="main-logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    className="header-menu"
                    style={{ lineHeight: '64px' }}
                >
                    <Menu.Item key="1"><a href="#myHomeWork">我的作业</a></Menu.Item>
                    <Menu.Item key="2"><a href="#addLesson">添加课程</a></Menu.Item>
                </Menu>
                <div className="portrait-logout">
                    <a href="#userInfo" className="portrait-wrap">
                        <img src={portrait} alt="头像"/>
                        <span className="user-name">赖智辉</span>
                    </a>
                    <Button className="logout-btn" type="primary">注销</Button>
                </div>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Router history={hashHistory}>
                    <Route path="/" component={MyHomeWork} />
                    <Route path="myHomeWork" component={MyHomeWork} />
                    <Route path="addLesson" component={AddLesson} />
                </Router>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                home work system ©2017 Created by zhihuilai
            </Footer>
        </Layout>
    );
  }
}

export default App;
