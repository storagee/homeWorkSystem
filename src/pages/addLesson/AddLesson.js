import React, { Component } from 'react';
import './addLesson.css';
import { Breadcrumb } from 'antd';

class AddLesson extends Component {
    render() {
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    <Breadcrumb.Item>添加课程</Breadcrumb.Item>
                </Breadcrumb>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                </div>
            </div>
        );
    }
}

export default AddLesson;
