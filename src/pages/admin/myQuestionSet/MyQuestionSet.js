import React, {Component} from "react";
import './myQuestionSet.css';
import {Breadcrumb, Button, Icon, Card, Modal, Input, message} from "antd";
import * as utils from '../../../common/utils';

class MyQuestionSet extends Component {

    colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548", "#9e9e9e", "#607d8b"];
    textColors = ["rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgba(255, 255, 255, 0.870588)", "rgba(255, 255, 255, 0.870588)", "rgba(255, 255, 255, 0.870588)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgb(255, 255, 255)", "rgba(0, 0, 0, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgb(255, 255, 255)", "rgba(255, 255, 255, 0.870588)", "rgba(0, 0, 0, 0.870588)", "rgb(255, 255, 255)"]

    state = {
        addQuestionSetModalVisible: false,
        addQuestionSetInputValue: '',
        questionSets: []
    };

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleAddQuestionSetBtnClick = (event) => {
        setTimeout(() => {
            this.addQuestionSetInput.focus();
        }, 0);
        this.setState({
            addQuestionSetModalVisible: true
        })
    };

    handleAddQuestionSetOk = () => {
        if(this.state.addQuestionSetInputValue.trim().length !== 0) {
            fetch(`${utils.getPrefixUrl()}/admin/createQuestionSet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    teacher: localStorage.getItem('userId'),
                    setName: this.state.addQuestionSetInputValue
                })
            }).then(response => {
                return response.json();
            }).then(json => {
                if(json.ret === 0) {
                    console.log('success', json);
                    this.setState({
                        addQuestionSetModalVisible: false
                    })
                    this.updateQuestionSet(json.data.questionSets);
                } else {
                    message.error(json.msg);
                }
            }).catch(error => {
                message.error(error);
                this.setState({
                    addQuestionSetModalVisible: false
                })
            });
        } else {
            message.error('请输入题库名称');
            this.addQuestionSetInput.focus();
        }
    };

    handleAddQuestionSetCancel = () => {
        this.setState({
            addQuestionSetModalVisible: false
        })
    };

    handleAddQuestionSetInputChange = (event) => {
        this.setState({
            addQuestionSetInputValue: event.target.value
        })
    };

    componentDidMount() {
        fetch(`${utils.getPrefixUrl()}/admin/getQuestionSetList?teacher=${localStorage.getItem('userId')}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if(json.ret === 0) {
                    this.updateQuestionSet(json.data.questionSets);
                } else {
                    message.error(json.msg);
                }
            })
            .catch(error => {
                message.error(error);
            });
    }

    updateQuestionSet(questionSets) {
        let backgroundColor = [],
            textColor = [];
        for(let i = 0; i < questionSets.length; i++) {
            let randomIndex = this.getRandomInt(0, this.colors.length - 1);
            backgroundColor.push(this.colors[randomIndex]);
            textColor.push(this.textColors[randomIndex]);
        }
        this.setState({
            questionSets: questionSets,
            randomColor: {
                backgroundColor: backgroundColor,
                textColor: textColor
            }
        })
    }

    handleAddQuestionSetInputKeyDown = (event) => {
        if(event.keyCode === 13) { // enter
            this.handleAddQuestionSetOk();
        }
    };


    render() {

        return (
            <div className="my-question-set">
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>我的题库</Breadcrumb.Item>
                </Breadcrumb>
                <div className="my-question-set-wrapper">
                    <div className="content-header">
                        <Button onClick={this.handleAddQuestionSetBtnClick} className="add-question-set" type="primary">
                            <Icon type="plus"/>
                            增加题库</Button>
                        <Modal title="增加题库"
                               visible={this.state.addQuestionSetModalVisible}
                               onOk={this.handleAddQuestionSetOk}
                               onCancel={this.handleAddQuestionSetCancel}
                        >
                            <Input onKeyDown={this.handleAddQuestionSetInputKeyDown} ref={(input) => {this.addQuestionSetInput = input}} placeholder="请输入题库名称" type="text" value={this.state.addQuestionSetInputValue} onChange={this.handleAddQuestionSetInputChange}/>
                        </Modal>
                    </div>
                    <div className="content">
                        {
                            this.state.questionSets.map((item, index) => {

                                return (
                                    <a key={item.setName} href={`#/admin/myQuestionSetDetail/${item._id}/${item.setName}`}>
                                        <Card key={item.setName} style={{
                                            backgroundColor: this.state.randomColor.backgroundColor[index],
                                            color: this.state.randomColor.textColor[index]
                                        }}>
                                            <p>{item.setName}</p>
                                        </Card>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MyQuestionSet;