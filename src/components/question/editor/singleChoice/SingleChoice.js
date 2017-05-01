import React, {Component, PropTypes} from 'react';
import {Button, Icon, Radio, message} from "antd";
const RadioGroup = Radio.Group;
// const RadioButton = Radio.Button;
import * as utils from '../../../../common/utils';
import Unit from '../../unit/editorInput/EditorInput';
import _ from 'lodash';

class SingleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            originalData: this.props.originalData
        }
    }

    static defaultProps = {
        originalData: {
            title: "",
            option: [{
                optionValue: "",
                updated: Date.now(),
            }, {
                optionValue: "",
                updated: Date.now() + 1
            }],
            correctIndex: 0,
        }
    };

    static propTypes = {
        originalData: PropTypes.object,
        onChange: PropTypes.func.isRequired
    };

    handleChange = (key, value, index) => {
        let data = this.state.originalData,
            { title, option } = data,
            newData;
        // this.setState({
        //     [key]: value
        // }, () => {
        //     console.log(Object.keys(this.state));
        // })
        switch (key) {
            case 'title': {
                newData = _.merge({}, data, {
                    title: value
                });
                break;
            }
            case 'option': {
                let newOption = option.slice();
                newOption[index].optionValue = value;
                newData = _.merge({}, data, {
                    option: newOption
                });
                break;
            }
            case 'correctIndex': {
                newData = _.merge({}, data, {
                    correctIndex: value.target.value
                });
                break;
            }
            default: {
                throw new Error("请指 key 为 title、option、correctIndex 中的一个")
            }
        }
        this.setState({
            originalData: newData
        }, ()=> {
            this.props.onChange(this.state.originalData, this.props.questionTypes, this.props.updateIndex);
        })
    };

    handleAddOption = (event) => {
        let { originalData } = this.state;
        let newOption = [].concat(originalData.option),
            title = originalData.title,
            correctIndex = originalData.correctIndex;
        if(newOption.length < 26) {
            newOption.push({
                optionValue: "",
                updated: Date.now()
            });
            let newData = {
                title: title,
                option: newOption,
                correctIndex: correctIndex
            };
            if(originalData._id !== undefined) {
                newData._id = originalData._id
            }
            this.setState({
                originalData: newData
            }, ()=> {
                this.props.onChange(this.state.originalData, this.props.questionTypes, this.props.updateIndex);
            })
        }
    };

    handleUnitDelete = (index) => {
        let { originalData } = this.state;
        let newOption = [].concat(originalData.option),
            title = originalData.title,
            correctIndex = originalData.correctIndex;
        if(newOption.length > 2) {
            // 删除之前判断该选项是不是正确答案，如果是，则将正确答案置为 -1，否则找到正确答案重新勾选
            if(correctIndex === index) {
                correctIndex = -1;
                message.info("参考答案被删除，请重新确认答案")
            } else if(index < correctIndex) {
                correctIndex--;
            }
            newOption.splice(index, 1);
            let newData = {
                title: title,
                option: newOption,
                correctIndex: correctIndex
            };
            if(originalData._id !== undefined) {
                newData._id = originalData._id
            }
            this.setState({
                originalData: newData
            }, ()=> {
                this.props.onChange(this.state.originalData, this.props.questionTypes, this.props.updateIndex);
            })
        }
    };

    render() {
        let { originalData } = this.state,
            A2ZArray = utils.getA2ZArray();
        return (
            <div>
                <Unit cantDelete={true} onDelete={this.handleUnitDelete} index={-1} title={`请输入题干`} initValue={originalData.title} onChange={(value) => {
                    this.handleChange(`title`, value)
                }}/>
                {
                    originalData.option.map((item, index, array) => {
                        return (
                            <Unit cantDelete={array.length <= 2} key={item.updated} onDelete={this.handleUnitDelete} title={`请输入 ${A2ZArray[index]} 选项`} initValue={item.optionValue} index={index} onChange={(value) => {
                                this.handleChange(`option`, value, index)
                            }}/>
                        )
                    })
                }
                <div className="correct-answer">
                    <label className="correct-answer-tip">请输入正确答案：</label>
                    <RadioGroup className="answer-group" value={originalData.correctIndex} onChange={(value) => (this.handleChange("correctIndex", value))}>
                        {
                            originalData.option.map((item, index) => {
                                return (
                                    <Radio key={item.updated} value={index}>{A2ZArray[index]}</Radio>
                                )
                            })
                        }
                    </RadioGroup>
                </div>
                <div className={`editor-operate-btn-wrapper`}>
                    <Button onClick={this.handleAddOption} className={`editor-operate-btn`} type={`default`}><Icon type="plus"/>增加选项</Button>
                    {/*<Button className={`editor-operate-btn`} type={`default`}><Icon type="eye-o"/>预览题目</Button>*/}
                </div>
            </div>
        )
    }
}

export default SingleChoice;