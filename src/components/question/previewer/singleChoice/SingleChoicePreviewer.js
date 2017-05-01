import React, {Component} from 'react';
import './singleChoicePreviewer.css';
import * as utils from '../../../../common/utils';
import MarkdownIt from 'markdown-it';
import MarkdownItMathJax from 'markdown-it-mathjax';
import { Popconfirm } from 'antd';
let md = new MarkdownIt();
md.use(MarkdownItMathJax());
import MathJax from 'MathJax';
import {Radio, Icon, Tooltip, Modal} from 'antd';
const RadioGroup = Radio.Group;
import Editor from '../../../../components/question/editor/Editor'

class SingleChoicePreviewer extends Component {

    componentDidMount() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.questionSetHtml]);
    }

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    handleModifyClick = (question) => {
        this.setState({
            [`modifyModalVisible${question._id}`]: true
        })
    };

    handleDeleteClick = (question, questionTypes, updateIndex) => {
        this.props.onChange(question, questionTypes, updateIndex);
        this.props.deleteQuestion(question, questionTypes, updateIndex);
    };

    handleModifyModalOk = (question, updateIndex) => {
        this.setState({
            [`modifyModalVisible${question._id}`]: false
        });
        console.log(question);
        let { onChange, questionTypes} = this.props;
        this.props.modifyQuestion();
    };

    handleModifyModalCancel = (question) => {
        this.setState({
            [`modifyModalVisible${question._id}`]: false
        });
        console.log(question);
    };

    render() {
        let {onChange, questionSet, questionTypes} = this.props,
            A2ZArray = utils.getA2ZArray();
        return (
            <div id="questionSetHtml" ref={(questionSetHtml) => {
                this.questionSetHtml = questionSetHtml
            }}>
                {
                    questionSet.map((item, index) => {
                        return (
                            <div key={item._id} className="height-level-preview">
                                <Tooltip title={`修改题目`}>
                                    <i onClick={()=>{this.handleModifyClick(item)}} className="fa fa-pencil-square-o preview-modify"
                                       aria-hidden="true"></i>
                                </Tooltip>
                                <Modal style={{ top: 10 }} className="my-question-set-modal" title={`修改题目`}
                                       visible={this.state[`modifyModalVisible${item._id}`]}
                                       onOk={()=>{this.handleModifyModalOk(item, index)}}
                                       onCancel={()=>{this.handleModifyModalCancel(item)}}
                                >
                                    <Editor originalData={item} onChange={onChange} questionTypes={questionTypes} updateIndex={index}/>
                                </Modal>
                                <Tooltip placement="bottom" className="preview-delete" title={`删除题目`}>
                                    <Popconfirm title="确定要删除该题目吗？" onConfirm={()=>{this.handleDeleteClick(item, questionTypes, index)}} okText="是" cancelText="否">
                                        <i className="fa fa-trash preview-delete" aria-hidden="true"></i>
                                    </Popconfirm>
                                </Tooltip>
                                <div className="markdown-body preview-header"
                                     dangerouslySetInnerHTML={{__html: md.render(`${index + 1} . ${item.title}`)}}></div>
                                {
                                    <ul className="preview-ul">
                                        <RadioGroup value={item.correctIndex}>
                                            {
                                                item.option.map((content, i) => {
                                                    return (
                                                        <Radio disabled className="preview-li" key={content._id}
                                                               value={i}>
                                                            <div className="option-alphabet">{`${A2ZArray[i]}.`}</div>
                                                            <div
                                                                dangerouslySetInnerHTML={{__html: md.render(content.optionValue)}}
                                                                className="option-content markdown-body"></div>
                                                        </Radio>
                                                    )
                                                })
                                            }
                                        </RadioGroup>
                                    </ul>
                                }
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default SingleChoicePreviewer;