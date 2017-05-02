import React, {Component} from "react";
import "./questionSelectPanel.css";
import * as utils from '../../../../../../common/utils';
import MarkdownIt from 'markdown-it';
import MarkdownItMathJax from 'markdown-it-mathjax';
let md = new MarkdownIt();
md.use(MarkdownItMathJax());
import { Tabs, Radio } from 'antd';
const RadioGroup = Radio.Group;
let TabPane = Tabs.TabPane;
import MathJax from 'MathJax';
import { Button, Select, message } from 'antd';
let Option = Select.Option;
let something = "some thing";


class QuestionSelectPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            questionSets: []
        }
    }

    componentDidMount() {
        fetch(`${utils.getPrefixUrl()}/admin/getQuestionSetList?teacher=${localStorage.getItem('userId')}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if(json.ret === 0) {
                    let questionSets = json.data.questionSets;
                    if(questionSets.length !== 0) {
                        this.setState({
                            questionSets: questionSets,
                            questionSetSelected: questionSets[0]._id
                        });
                        this.getQuestionSet(questionSets[0]._id);
                    } else {
                        this.setState({
                            questionSets: questionSets
                        })
                    }
                } else {
                    message.error(json.msg);
                }
            })
            .catch(error => {
                message.error(error);
            });
    }

    handleQuestionSetChange = (value) => {
        this.setState({
            questionSetSelected: value
        }, ()=> {
            this.getQuestionSet(value);
        })
    };

    getQuestionSet(questionSetId) {
        fetch(`${utils.getPrefixUrl()}/admin/getQuestionSet?questionSetId=${questionSetId}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if (json.ret === 0) {
                    let questionSet = json.data.questionSet;
                    this.setState({
                        questionSetDetail: {
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

    render() {
        let
            { questionSets, questionSetSelected, questionSetDetail } = this.state,
            A2ZArray = utils.getA2ZArray();
        return (
            <div className="assign-homework">
                <div className="header">
                    <Select value={questionSetSelected} style={{ width: 120 }} onChange={this.handleQuestionSetChange}>
                        {
                            questionSets.map((questionSet)=>{
                                return (
                                    <Option key={questionSet._id} value={questionSet._id}>{questionSet.setName}</Option>
                                )
                            })
                        }
                    </Select>
                    {/*{*/}
                        {/*questionSetSelected? (*/}
                                {/*<Previewer questionSet={questionSetDetail} questionTypes={{*/}
                                    {/*englishName: 'singleChoice',*/}
                                    {/*chineseName: '单选题'*/}
                                {/*}}/>*/}
                            {/*): null*/}
                    {/*}*/}
                    {
                        questionSetDetail && questionSetDetail.singleChoice &&
                            questionSetDetail.singleChoice.map((item, index) => {
                                return (
                                    <div className="height-level-preview" key={item._id}>
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
            </div>
        )
    }
}

export default QuestionSelectPanel;
