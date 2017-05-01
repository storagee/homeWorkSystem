import React, {Component} from 'react';
import {Breadcrumb, Card, Col, Row} from 'antd';
import './lessonDetail.css';

class LessonDetail extends Component {
    render() {

        return (
            <div>
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>我的作业</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.params.lessonName}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-wrapper lesson-detail">
                    <h2>你有 5 个作业未提交</h2>

                    <Row>
                        <Col span="8">
                            <a href={`#homeWorkDetail/homeWorkId/极限存在准则`}>
                                <Card title="极限存在准则" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                            </a>
                        </Col>
                        <Col span="8">
                            <a href={`#homeWorkDetail/homeWorkId/闭区间上连续函数的性质`}>
                                <Card title="闭区间上连续函数的性质" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                            </a>
                        </Col>
                        <Col span="8">
                            <a href={`#homeWorkDetail/homeWorkId/导数概念`}>
                                <Card title="导数概念" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                            </a>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <a href={`#homeWorkDetail/homeWorkId/泰勒公式`}>
                                <Card title="泰勒公式" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                            </a>
                        </Col>
                        <Col span="8">
                            <a href={`#homeWorkDetail/homeWorkId/反常积分`}>
                                <Card title="反常积分" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                            </a>
                        </Col>
                    </Row>

                    <h2>已提交的作业</h2>

                    <Row>
                        <Col span="8">
                            <Card title="映射与函数" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                        </Col>
                        <Col span="8">
                            <Card title="数列的极限" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                        </Col>
                        <Col span="8">
                            <Card title="函数的极限" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col span="8">
                            <Card title="无穷小与无穷大" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                        </Col>
                        <Col span="8">
                            <Card title="极限运算法则" bordered={false}>截止时间：2017年2月31日23:59:59</Card>
                        </Col>
                    </Row>

                </div>
            </div>
        );
    }
}

export default LessonDetail;
