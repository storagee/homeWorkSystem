import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import './myHomeWork.css';

class MyHomeWork extends Component {
    render() {
        return (

            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>我的作业</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    我的作业
                </div>
            </div>
        );
    }
}

export default MyHomeWork;
