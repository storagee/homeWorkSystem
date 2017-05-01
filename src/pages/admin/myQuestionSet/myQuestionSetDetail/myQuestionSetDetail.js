import React, {Component} from "react";
import './myQuestionSetDetail.css';
import {Breadcrumb, Tabs, Button, Icon, Modal, message} from "antd";
import * as utils from '../../../../common/utils';
import Editor from '../../../../components/question/editor/Editor';
import Previewer from '../../../../components/question/previewer';
let TabPane = Tabs.TabPane;
import MathJax from 'MathJax';


class MyQuestionSetDetail extends Component {

    conf = utils.conf

    state = {
        questionSet: {
            singleChoice: [],
            multipleChoice: [],
            judgment: [],
            fillBlank: [],
            subjectiveQuestions: []
        }
    };

    showModal = (questionType) => {
        this.setState({
            [`addQuestionSetModalVisible${questionType.englishName}`]: true,
        });
    };

    handleAddQuestionSetModalOk = (questionType) => {
        this.setState({
            [`addQuestionSetModalVisible${questionType.englishName}`]: false,
        });
        if(this.onEditoring.updateIndex === -1) {
            // 增加 question set 中的某个题型中的题目
            this.addQuestion();
        } else {
            // 修改 question set 中的某个题型中的题目
        }
    };

    addQuestion() {
        fetch(`${utils.getPrefixUrl()}/admin/addQuestionSet`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionSetId: this.props.params.questionSetId,
                questionType: this.onEditoring.questionTypes,
                question: this.onEditoring.data
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            if(json.ret === 0) {
                console.log('success', json);
                message.info("增加成功");
                this.getQuestionSet();
            } else {
                message.error(json.msg);
            }
        }).catch(error => {
            message.error(error);
        });
    }

    modifyQuestion = () => {
        console.log(JSON.stringify(this.onEditoring));
        if(this.onEditoring !== undefined) {
            fetch(`${utils.getPrefixUrl()}/admin/modifyQuestion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionSetId: this.props.params.questionSetId,
                    questionType: this.onEditoring.questionTypes,
                    question: this.onEditoring.data
                })
            }).then(response => {
                return response.json();
            }).then(json => {
                if(json.ret === 0) {
                    console.log('success', json);
                    this.getQuestionSet();
                } else {
                    message.error(json.msg);
                }
            }).catch(error => {
                message.error(error);
            });
        }
    };

    deleteQuestion = () => {
        fetch(`${utils.getPrefixUrl()}/admin/deleteQuestion`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                questionSetId: this.props.params.questionSetId,
                questionType: this.onEditoring.questionTypes,
                question: this.onEditoring.data
            })
        }).then(response => {
            return response.json();
        }).then(json => {
            if(json.ret === 0) {
                console.log('success', json);
                this.getQuestionSet();
            } else {
                message.error(json.msg);
            }
        }).catch(error => {
            message.error(error);
        });
    };

    getQuestionSet() {
        fetch(`${utils.getPrefixUrl()}/admin/getQuestionSet?questionSetId=${this.props.params.questionSetId}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.ret === 0) {
                    let questionSet = json.data.questionSet;
                    this.setState({
                        questionSet: {
                            singleChoice: questionSet.singleChoice.reverse(),
                            multipleChoice: questionSet.multipleChoice.reverse(),
                            judgment: questionSet.judgment.reverse(),
                            fillBlank: questionSet.fillBlank.reverse(),
                            subjectiveQuestions: questionSet.subjectiveQuestions.reverse()
                        }
                    }, ()=>{
                        MathJax.Hub.Queue(["Typeset", MathJax.Hub, "questionSetHtml"]);
                    })
                } else {
                    message.error(json.msg);
                }
            })
            .catch(error => {
                message.error(error);
            });
    }

    handleAddQuestionSetModalCancel = (questionType) => {
        console.log(questionType);
        this.setState({
            [`addQuestionSetModalVisible${questionType.englishName}`]: false,
        });
    };


    componentDidMount() {

        // ant design bug:
        document.querySelector(".ant-tabs-tab:nth-child(2)").click();

        this.getQuestionSet();

    }

    handleAddQuestionClick = (questionType) => {
        console.log(questionType);
        this.showModal(questionType);
    };

    handleEditorChange = (data, questionTypes, updateIndex) => {
        this.onEditoring = {
            data: data,
            questionTypes: questionTypes,
            updateIndex: updateIndex
        }
        console.log(JSON.stringify(this.onEditoring));
    };

    render() {
        let emptyTip = "还没有题目哦，点击“增加题目”按钮添加吧";
        return (
            <div className="my-question-set">
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>我的题库</Breadcrumb.Item>
                    <Breadcrumb.Item>{this.props.params.questionSetName}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="common background">
                    <Tabs className={`my-lessons-tab`} defaultActiveKey="1">
                        {
                            this.conf.questionType.map(item => {
                                return (
                                    <TabPane tab={item.chineseName} key={item.chineseName}>
                                        <div className="question-set-header">
                                            <Button onClick={() => {
                                                this.handleAddQuestionClick(item)
                                            }} className="add-button" type="primary"><Icon type="plus"/>增加题目</Button>
                                            <Modal style={{ top: 10 }} className="my-question-set-modal" title={`创建${item.chineseName}，请按要求填写内容`}
                                                   visible={this.state[`addQuestionSetModalVisible${item.englishName}`]}
                                                   onOk={() => {this.handleAddQuestionSetModalOk(item)}}
                                                   onCancel={() => {this.handleAddQuestionSetModalCancel(item)}}
                                            >
                                                <Editor onChange={this.handleEditorChange} questionTypes={item} updateIndex={-1} />
                                            </Modal>
                                        </div>
                                        <div className="question-set-content">
                                            {
                                                this.state.questionSet[item.englishName].length === 0 ? emptyTip : (
                                                        <div>
                                                            {
                                                                <Previewer deleteQuestion={this.deleteQuestion} modifyQuestion={this.modifyQuestion} onChange={this.handleEditorChange} questionSet={this.state.questionSet[item.englishName]} questionTypes={item} />
                                                            }
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </TabPane>
                                )
                            })
                        }
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default MyQuestionSetDetail;