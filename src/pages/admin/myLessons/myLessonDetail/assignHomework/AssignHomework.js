import React, {Component} from "react";
import "./assignHomework.css";
import { Button, Modal } from 'antd';
import QuestionSelectPanel from './questionSelectPanel/QuestionSelectPanel';


class AssignHomework extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    handleChooseFromQuestionSet = () => {
        this.setState({
            questionSelectPanelModalVisible: true
        })
    };

    questionSelectPanelModalOk = () => {
        this.setState({
            questionSelectPanelModalVisible: false
        })
    };

    questionSelectPanelModalCancel = () => {
        this.setState({
            questionSelectPanelModalVisible: false
        })
    };

    addQuestionsToHomeWork = (homeWork) => {
        this.setState({
            homeWork: homeWork
        })
    };
    render() {
        return (
            <div className="question-select-panel">
                <div className="header">
                    <Button type="primary" onClick={this.handleChooseFromQuestionSet}>从题库中选择题目</Button>
                    <Modal style={{ top: 10 }} className="my-question-set-modal" title={`选择题目`}
                           visible={this.state.questionSelectPanelModalVisible}
                           onOk={this.questionSelectPanelModalOk}
                           onCancel={this.questionSelectPanelModalCancel}
                    >
                        <QuestionSelectPanel onSelectFinish={this.addQuestionsToHomeWork}/>
                    </Modal>
                    <Button type="primary">增加题目描述</Button>
                </div>
            </div>
        )
    }
}

export default AssignHomework;