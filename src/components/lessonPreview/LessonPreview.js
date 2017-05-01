import React, { Component } from 'react';
import { Badge } from 'antd';
import './lessonPreview.css';
import * as utils from '../../common/utils';


class MyHomeWork extends Component {
    render() {
        let lesson = this.props.lesson;
        return (
            <div className="lesson-preview">
                <img src={`${utils.getPrefixUrl()}/getImage?imageId=${lesson.imageId}`} alt="课程图片"/>
                <div className="info-wrapper">
                    {this.props.showBadge?(
                            <div className="badge-wrapper">
                                <Badge className="preview-badge new-home-work-badge" count={lesson.newHomeWork} />
                                <Badge className="preview-badge feedback-badge" count={lesson.feedback} style={{ backgroundColor: '#87d068' }} />
                            </div>
                        ):null}
                    <h2>{lesson.name}</h2>
                    <p className="description">{lesson.description}</p>
                </div>
                <div className="teacher-wrapper">
                    <span className="lesson-id">课程 id: {lesson._id}</span>
                    {
                        this.props.showTeacher? (<span className="teacher">任课老师: {lesson.teacher}</span>) : null
                    }
                </div>
            </div>
        );
    }
}

export default MyHomeWork;
