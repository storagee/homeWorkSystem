import React, { Component } from 'react';
import './previewer.css';
import * as utils from '../../../common/utils';
import SingleChoicePreviewer from './singleChoice';


class Previewer extends Component {

    conf = utils.conf;

    render() {
        let { onChange, questionSet, questionTypes, modifyQuestion, deleteQuestion} = this.props,
            previewer;
        switch (questionTypes.englishName) {
            case "singleChoice": {
                previewer = <SingleChoicePreviewer
                    onChange={onChange}
                    questionSet={questionSet}
                    questionTypes={questionTypes}
                    modifyQuestion={modifyQuestion}
                    deleteQuestion={deleteQuestion}
                />;
                break;
            }
        }
        return(
            <div>
                {
                    previewer
                }
            </div>
        )
    }
}

export default Previewer;