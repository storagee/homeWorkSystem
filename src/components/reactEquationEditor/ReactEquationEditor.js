import React, {Component} from 'react';
import './css/react-equation-editor.css';
import MathJax from "MathJax";
import * as EquationPredefined from './EquationPredefined';

class ReactEquationEditor extends Component {
    mathObj = EquationPredefined.mathObj; // 基础数学
    greekAlphabet = EquationPredefined.greekAlphabet; // 希腊字母
    handwritting = EquationPredefined.handwritting; // 手写体
    mathConstructor = EquationPredefined.mathConstructor; // 数学结构
    align = EquationPredefined.align; // 数学公式对齐

    /**
     * 点击公式输入帮助面板中的某个图标，向输入框插入 latex 公式，并更新预览界面
     * @param event click 传进来的事件对象
     */
    handleLatexClick = (event) => {
        // 事件代理，提高性能
        let target = event.target,
            className = target.getAttribute("class");
        if (className.indexOf("single-wrapper") !== -1 || className === "latex-image") { // 如果点击的是帮助图标
            let inputValue = this.state.inputValue;
            // console.log(this.getCursorPos(this.reeInput));
            if (typeof this.selectStart !== "undefined" && typeof this.selectEnd !== "undefined") { // 处理光标，在光标出插入
                let before = inputValue.slice(0, this.selectStart);
                let after = inputValue.slice(this.selectEnd);
                let latex = target.getAttribute("data-latex");
                inputValue = before + latex + after;
                this.selectStart = this.selectEnd += latex.length
            } else { // 直接在输入框后插入
                inputValue += target.getAttribute("data-latex");
            }
            this.setState({ // 更新输入框的值
                inputValue: inputValue
            }, () => {
                this.props.onChange(this.state.inputValue); // 给外部传递公式 change 事件
                this.updatePreview();
                setTimeout(() => {
                    this.reeInput.focus(); // 将光标重新设置会公式输入框
                    if (typeof this.selectStart !== "undefined" && typeof this.selectEnd !== "undefined") {
                        this.setCursorPos(this.reeInput, this.selectStart, this.selectEnd); // 设置光标位置到适当的位置
                    } else {
                        let len = this.reeInput.value.length;
                        this.setCursorPos(this.reeInput, len, len); // 设置光标位置到输入框的值的末尾
                    }
                }, 100);
            })
        }
    };

    getCursorPos = (input) => {
        if ("selectionStart" in input && document.activeElement == input) {
            return {
                start: input.selectionStart,
                end: input.selectionEnd
            };
        }
        else if (input.createTextRange) {
            let sel = document.selection.createRange();
            if (sel.parentElement() === input) {
                let rng = input.createTextRange();
                rng.moveToBookmark(sel.getBookmark());
                let len;
                for (len = 0;
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                    len++;
                }
                rng.setEndPoint("StartToStart", input.createTextRange());
                let pos;
                for (pos = {start: 0, end: len};
                     rng.compareEndPoints("EndToStart", rng) > 0;
                     rng.moveEnd("character", -1)) {
                    pos.start++;
                    pos.end++;
                }
                return pos;
            }
        }
        return -1;
    };

    setCursorPos = (input, start, end) => {
        if (arguments.length < 3) end = start;
        if ("selectionStart" in input) {
            setTimeout(function () {
                input.selectionStart = start;
                input.selectionEnd = end;
            }, 1);
        }
        else if (input.createTextRange) {
            let rng = input.createTextRange();
            rng.moveStart("character", start);
            rng.collapse();
            rng.moveEnd("character", end - start);
            rng.select();
        }
    };

    handleInputKeyUp = (event) => {
        this.setPos(event.target);
    };

    handleInputClick = (event) => {
        this.setPos(event.target);
    };

    setPos(input) {
        let pos = this.getCursorPos(input);
        this.selectStart = pos.start;
        this.selectEnd = pos.end;
    }

    state = {
        inputValue: "",
        latexType: "基础数学"
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        }, () => {
            this.props.onChange(this.state.inputValue);
            this.updatePreview();
        })
    };

    updatePreview = () => {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.reeOutput]);
    };

    componentDidMount() {
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.reeOutput]);
    }

    handleLatexTypeChange = (event) => {
        this.setState({
            latexType: event.target.value
        })
    };

    render() {
        let latexArray;
        let baseObj;
        let adjustClass = "";
        switch (this.state.latexType) { // 用户选择公式编辑器中的某个帮助面板
            case "基础数学": {
                baseObj = this.mathObj;
                latexArray = Object.keys(this.mathObj);
                break;
            }
            case "希腊字母": {
                baseObj = this.greekAlphabet;
                latexArray = Object.keys(this.greekAlphabet);
                break;
            }
            case "手写体": {
                baseObj = this.handwritting;
                latexArray = Object.keys(this.handwritting);
                break;
            }
            case "数学结构": {
                baseObj = this.mathConstructor;
                latexArray = Object.keys(this.mathConstructor).reverse();
                adjustClass = "to115";
                break;
            }
            case "对齐": {
                baseObj = this.align;
                latexArray = Object.keys(this.align);
                adjustClass = "to200";
            }
            default: {

            }
        }

        return (
            <div className="ree">
                <div className="ree-header">
                    <select value={this.state.latexType} onChange={this.handleLatexTypeChange} className="ree-type"
                            name="ree-type" id="ree-type">
                        <option value="基础数学">基础数学</option>
                        <option value="希腊字母">希腊字母</option>
                        <option value="手写体">手写体</option>
                        <option value="数学结构">数学结构</option>
                        <option value="对齐">对齐</option>
                    </select>
                </div>
                <div className="latex-wrapper" onClick={this.handleLatexClick}>
                    {
                        latexArray.map(item => {
                            return <div className={`single-wrapper ${adjustClass}`} title={`${baseObj[item]}`}
                                        key={`${item}`}
                                        data-latex={`${baseObj[item]}`}><img className="latex-image"
                                                                             src={`./image/${item}.png`}
                                                                             data-latex={`${baseObj[item]}`}/>
                            </div>
                        })
                    }
                </div>
                <textarea onKeyUp={this.handleInputKeyUp} onClick={this.handleInputClick} className="ree-input"
                          ref={(reeInput) => {
                              this.reeInput = reeInput
                          }} value={this.state.inputValue} onChange={this.handleInputChange} name="ree-input"
                          id="ree-input"
                          cols="30" rows="10">

                </textarea>
                <div ref={(reeOutput)=>{this.reeOutput = reeOutput}} className="ree-output">
                    {
                        `\$\$\{${this.state.inputValue}\}\$\$`
                    }
                </div>
            </div>
        )
    }
}

export default ReactEquationEditor;