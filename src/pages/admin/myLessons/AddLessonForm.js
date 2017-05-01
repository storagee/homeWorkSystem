import React, {Component} from 'react';
import {Form, Input, Switch, Upload, Icon, message, Button} from 'antd';
const FormItem = Form.Item;
import './addLessonForm.css';
import * as utils from '../../../common/utils';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    let isJPG = file.type === 'image/jpeg',
        isPNG = file.type === 'image/png',
        isTypeValid = true;
    if (!isJPG && !isPNG) {
        message.error('请上传 PNG 或 JPG 格式的图片');
        isTypeValid = false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isTypeValid && isLt2M;
}


class AddLessonForm extends Component {

    state = {};

    handleChange = (info) => {
        if(info.file.response && info.file.response.data){
            this.imageId = info.file.response.data.imageId;
            console.log(this.imageId);
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({imageUrl}));
        }
    };


    handleSubmit = (e) => {
        e.preventDefault();
        let formValue = this.props.form.getFieldsValue();
        formValue.imageId = this.imageId;
        formValue.teacher = localStorage.getItem('userId');
        fetch(`${utils.getPrefixUrl()}/admin/createLesson`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValue)
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log('success', json);
            if(json.ret === 0) {
                this.props.onOk();
                this.getLessons();
            } else {
                message.error(json.msg);
            }
        }).catch(error => {
            message.error(error);
            this.props.onOk();
        });

    };

    getLessons = () => {
        fetch(`${utils.getPrefixUrl()}/admin/getLessonList?teacher=${encodeURIComponent(localStorage.getItem('userId'))}`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                if(json.ret === 0) {
                    this.props.updateLessons(json.data.lessons);
                } else {
                    message.error(json.msg);
                }
            })
            .catch(error => {
                message.error(error);
            });
    };

    render() {
        const {getFieldProps} = this.props.form;

        const imageUrl = this.state.imageUrl;

        return (
            <Form horizontal onSubmit={this.handleSubmit}>
                <FormItem
                    label="课程名称"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}>
                    <Input type="text" {...getFieldProps('name')} placeholder="请输入课程名称"/>
                </FormItem>
                <FormItem
                    label="课程描述"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                >
                    <Input className={`lesson-description`} type="textarea"
                           placeholder="请输入课程描述" {...getFieldProps('description')} />
                </FormItem>
                <FormItem
                    label="上传课程图片"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                >
                    <Upload
                        className="avatar-uploader"
                        name="avatar"
                        showUploadList={false}
                        action={`${utils.getPrefixUrl()}/imageUpload`}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {
                            imageUrl ?
                                <img src={imageUrl} alt="" className="avatar"/> :
                                <Icon type="plus" className="avatar-uploader-trigger"/>
                        }
                    </Upload>
                </FormItem>
                <FormItem
                    label="加入需审批"
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                >
                    <Switch checkedChildren={'是'} unCheckedChildren={'否'} {...getFieldProps('isNeedApply')}/>
                </FormItem>
                <div className="add-lesson-form-footer">
                    <Button type="primary" htmlType="submit" className="add-lesson-from-submit">
                        确定
                    </Button>
                    <Button className="add-lesson-from-submit" onClick={this.props.onCancel}>
                        取消
                    </Button>
                </div>
            </Form>
        );
    }
}

AddLessonForm = Form.create()(AddLessonForm);

export default AddLessonForm
