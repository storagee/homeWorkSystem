import React, {Component, PropTypes} from 'react';
import './editor.css';
import SingleChoice from './singleChoice'

class Editor extends Component {

    static propTypes = {
        questionTypes: PropTypes.shape({
            englishName: PropTypes.string.isRequired,
            chineseName: PropTypes.string.isRequired
        }),
        originalData: PropTypes.object,
        onChange: PropTypes.func.isRequired,
        updateIndex: PropTypes.number.isRequired // -1 代表非更新，0、正数代表更新的下标
    };

    render() {
        let {questionTypes, originalData, onChange, updateIndex} = this.props,
            questionEditor;
        switch (questionTypes.englishName) {
            case "singleChoice": {
                questionEditor = <SingleChoice 
                    originalData={originalData}
                    onChange={onChange}
                    updateIndex={updateIndex}
                    questionTypes={questionTypes}
                />;
                break;
            }
            default : {
                questionEditor = null;
            }
        }
        return (
            <div className="question-editor">
                {
                    questionEditor
                }
            </div>
        )
    }
}

export default Editor;