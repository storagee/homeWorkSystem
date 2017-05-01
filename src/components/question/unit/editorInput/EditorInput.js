import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import './editorInput.css'
import {Button, Tooltip, Icon, Modal, Input, message} from "antd";
import MarkdownIt from 'markdown-it';
import MarkdownItMathJax from 'markdown-it-mathjax';
let md = new MarkdownIt();
md.use(MarkdownItMathJax());
import * as utils from '../../../../common/utils';
import ReactEquationEditor from '../../../reactEquationEditor/ReactEquationEditor';
import MathJax from 'MathJax';

class Unit extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        onDelete: PropTypes.func.isRequired,
        onChange: PropTypes.func.isRequired,
        initValue: PropTypes.string.isRequired,
        index: PropTypes.number.isRequired
    };

    state = {
        questionContent: "",
        questionContentHtml: ""
    };

    constructor(props) {
        super(props);
        this.state = {
            questionContent: this.props.initValue,
            questionContentHtml: md.render(this.props.initValue)
        };
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.previewer]);
    }

    handleQuestionContentChange = (event) => {
        let markdown = event.target.value,
            html = md.render(markdown),
            { onChange } = this.props;
        this.setState({
            questionContent: markdown,
            questionContentHtml: html
        }, ()=>{
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.previewer]);
        });
        onChange(markdown);
    };

    insertEquationClick = (event) => {
        this.setState({
            insertEquationModalVisible: true
        })
    };

    handleInsertEquationModalOk = (type) => {
        this.setState({
            insertEquationModalVisible: false
        });
        if(type === "block") {
            this.insertToUnitInput(`\\\\[${this.equation}\\\\]`);
        } else {
            this.insertToUnitInput(`\\\\(${this.equation}\\\\)`);
        }

    };

    handleInsertEquationModalCancel = () => {
        this.setState({
            insertEquationModalVisible: false
        })
    };

    onEquationChange = (value) => {
        this.equation = value;
    };

    // 更新光标的位置
    handleInputKeyUp = (event) => {
        this.setPos(event.target);
    };

    // 更新光标的位置
    handleInputClick = (event) => {
        this.setPos(event.target);
    };

    selectStart = 0;
    selectEnd = 0;
    // 记录光标的位置
    setPos(input) {
        let pos = utils.getCursorPos(input);
        this.selectStart = pos.start;
        this.selectEnd = pos.end;
    }

    /**
     * 往 unit 的 input 中插入内容
     * @param content 需要插入的内容
     * @param cursorDirection left/middle/right，光标重新设置
     */
    insertToUnitInput = (content, cursorDirection) => {
        let questionContent = this.state.questionContent;
        let newQuestionContent = questionContent
            .slice(0, this.selectStart)
            .concat(content)
            .concat(questionContent.slice(this.selectEnd));
        this.handleQuestionContentChange({
            target: {
                value: newQuestionContent
            }
        });
        // 恢复 cursor 光标

        let cursorOffset;
        switch (cursorDirection) {
            case 'right': {
                cursorOffset = content.length;
                break;
            }
            case 'middle': {
                cursorOffset = Math.floor(content.length / 2);
                break;
            }
            case 'left': {
                cursorOffset = 0;
                break;
            }
            default: {
                cursorOffset = content.length;
            }
        }
        this.selectStart = this.selectEnd = this.selectStart + cursorOffset;
        this.questionUnitInput.focus();
        utils.setCursorPos(ReactDOM.findDOMNode(this.questionUnitInput), this.selectStart);
    };

    render() {
        let { title, index, onDelete, cantDelete } = this.props,
            A2ZArray = utils.getA2ZArray();
        return (
            <div>
                <div ref={(escapeNode) => {this.escapeNode = escapeNode}}></div>
                <div className="question-unit">
                    <div className="unit-header">
                        <label className="question-tip">{title}</label>
                        {
                            cantDelete? null: (
                                    <Tooltip title={`删除 ${A2ZArray[index]} 选项`}>
                                        <label onClick={()=>{onDelete(index)}} className="unit-delete"><Icon type="delete"/></label>
                                    </Tooltip>
                                )
                        }
                        <Button className="question-operate-btn" onClick={this.insertEquationClick}>插入公式</Button>
                        <Modal style={{ top: 10 }} className="insert-equation-modal" title={`请输入公式`}
                               visible={this.state.insertEquationModalVisible}
                               onCancel={this.handleInsertEquationModalCancel}
                               footer={
                                   <div>
                                       <Button onClick={this.handleInsertEquationModalCancel}>取消</Button>
                                       <Button onClick={(event)=>{this.handleInsertEquationModalOk("block")}} type="primary">块级(block)公式</Button>
                                       <Button onClick={(event)=>{this.handleInsertEquationModalOk("inline")}} type="primary">行内(inline)公式</Button>
                                   </div>
                               }
                        >
                            <ReactEquationEditor onChange={this.onEquationChange}/>
                        </Modal>
                    </div>
                    <div className="question-wrapper">
                        <Input onKeyUp={this.handleInputKeyUp}
                               onClick={this.handleInputClick}
                               onChange={this.handleQuestionContentChange}
                               value={this.state.questionContent}
                               ref={(questionUnitInput)=>{this.questionUnitInput = questionUnitInput}}
                               className="question-input" type="textarea"
                               placeholder={`${title}...`}/>
                        <div
                            ref={(previewer) => {this.previewer = previewer}}
                            dangerouslySetInnerHTML={{__html: this.state.questionContentHtml}}
                            className="question-preview markdown-body">

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Unit;