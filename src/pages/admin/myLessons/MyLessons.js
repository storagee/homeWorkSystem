import React, {Component} from 'react';
import {Breadcrumb, Input, Button, Icon, Modal, message} from 'antd';
import './myLessons.css'
import LessonPreview from '../../../components/lessonPreview/LessonPreview';
import AddLessonForm from './AddLessonForm';
import * as utils from '../../../common/utils';


class MyLessons extends Component {

    handleAddLesson = (event) => { // 点击创建课程按钮
        this.setState({
            addLessonModalVisible: true
        })
    };

    state = {
        lessons: [],
        addLessonModalVisible: false
    };

    componentDidMount() {
        fetch(`${utils.getPrefixUrl()}/admin/getLessonList?teacher=${encodeURIComponent(localStorage.getItem('userId'))}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if(json.ret === 0) {
                    this.setState({
                        lessons: json.data.lessons
                    })
                } else {
                    message.error(json.msg);
                }
            })
            .catch(error => {
                message.error(error);
            });
    }

    handleAddLessonModalOk = () => {
        this.setState({
            addLessonModalVisible: false,
            addLessonConfirmLoading: false
        });
    };

    handleAddLessonCancel = () => {
        console.log('点击了取消');
        this.setState({
            addLessonModalVisible: false
        });
    };

    updateLessons = (lessons) => {
        this.setState({
            lessons: lessons
        })
    };

    render() {

        let lessonsHtml = this.state.lessons.map((item) => {
            return (
                <a key={item._id} href={`#admin/myLessonDetail/${item._id}/${item.name}`}>
                    <LessonPreview key={item._id}
                                   lesson={item}
                                   showBadge={true}
                                   showTeacher={false}
                    />
                </a>
            )

        });

        return (
            <div className="add-lesson">
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>我的课程</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-wrapper my-home-work">
                    <div className="content-header">
                        <Button onClick={this.handleAddLesson} className="add-lesson-btn" type="primary"><Icon
                            type="plus"/>添加课程</Button>
                        <Modal title="添加课程"
                               visible={this.state.addLessonModalVisible}
                               confirmLoading={this.state.addLessonConfirmLoading}
                               onCancel={this.handleAddLessonCancel}
                               footer={null}
                        >
                            <div className="add-lesson-modal-content">
                                <AddLessonForm
                                    onOk={this.handleAddLessonModalOk}
                                    onCancel={this.handleAddLessonCancel}
                                    updateLessons={(lessons) => {this.updateLessons(lessons)}}
                                />
                            </div>
                        </Modal>
                        <Input.Search
                            placeholder="课程 id 或课程名称"
                            style={{width: 200}}
                            onSearch={value => console.log(value)}
                        />
                    </div>
                    <div className="lesson-wrapper">
                        {lessonsHtml}
                    </div>
                </div>
            </div>
        );
    }
}

export default MyLessons;