import React, {Component} from 'react';
import './addLesson.css';
    import {Breadcrumb, message, Input, Icon, Pagination} from 'antd';
import addIcon from './add.svg';
var lessons = [
    {
        "id": 1,
        "name": "计算机组成原理",
        "description": "《计算机组成原理试题解析（第五版）》是《计算机组成原理（第五版·立体化教材）》的配套教材，提供了“计算机组成原理”课程的典型题解800余题，分为选择、填空、计算、证明、分析、设计六大类型，以及硕士生入学考试辅导。所选习题少而精，具有概念性、思考性、启发性，并给出参考答案。",
        "newHomeWork": 2,
        "feedback": 3,
        "imagePath": require('../../temp/cs.jpg'),
        "teacher": "张三丰"
    },
    {
        "id": 2,
        "name": "数据结构",
        "description": "本课程的前半部分从抽象数据类型的角度讨论各种基本类型的数据结构及其应用；后半部分主要讨论查找和排序的各种实现方法及其综合分析比较。其内容和章节编排与1992年4月出版的《数据结构》（第二版）基本一致，但在本书中更突出了抽象数据类型的概念。全书采用类C语言作为数据结构和算法的描述语言。",
        "imagePath": require("../../temp/DataStructure.jpg"),
        "feedback": 1,
        "teacher": "李四"
    },
    {
        "id": 3,
        "name": "高等数学",
        "description": "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。主要内容包括：极限、微积分、空间解析几何与向量代数、级数、常微分方程。",
        "imagePath": require("../../temp/math.jpg"),
        "teacher": "张三",
    },
    {
        "id": 4,
        "name": "计算机网络",
        "description": "计算机网络，是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和[1]  信息传递的计算机系统。",
        "imagePath": require("../../temp/network.jpg"),
        "newHomeWork": 2,
        "teacher": "马云"
    },
    {
        "id": 5,
        "name": "面向对象分析与设计",
        "description": "面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构。OOP 的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。OOP 达到了软件工程的三个主要目标：重用性、灵活性和扩展性。为了实现整体运算，每个对象都能够接收信息、处理数据和向其它对象发送信息。",
        "newHomeWork": 2,
        "feedback": 1,
        "imagePath": require("../../temp/OO.jpg"),
        "teacher": "曾玲"
    },
    {
        "id": 6,
        "name": "数据结构",
        "description": "本课程的前半部分从抽象数据类型的角度讨论各种基本类型的数据结构及其应用；后半部分主要讨论查找和排序的各种实现方法及其综合分析比较。其内容和章节编排与1992年4月出版的《数据结构》（第二版）基本一致，但在本书中更突出了抽象数据类型的概念。全书采用类C语言作为数据结构和算法的描述语言。",
        "imagePath": require("../../temp/DataStructure.jpg"),
        "feedback": 1,
        "teacher": "李彦宏"
    },
    {
        "id": 7,
        "name": "高等数学",
        "description": "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。主要内容包括：极限、微积分、空间解析几何与向量代数、级数、常微分方程。",
        "imagePath": require("../../temp/math.jpg"),
        "teacher": "张小龙"
    },
    {
        "id": 8,
        "name": "计算机网络",
        "description": "计算机网络，是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和[1]  信息传递的计算机系统。",
        "imagePath": require("../../temp/network.jpg"),
        "newHomeWork": 2,
        "teacher": "马化腾"
    },
    {
        "id": 9,
        "name": "面向对象分析与设计",
        "description": "面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构。OOP 的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。OOP 达到了软件工程的三个主要目标：重用性、灵活性和扩展性。为了实现整体运算，每个对象都能够接收信息、处理数据和向其它对象发送信息。",
        "newHomeWork": 2,
        "feedback": 1,
        "imagePath": require("../../temp/OO.jpg"),
        "teacher": "曾玲"
    },
    {
        "id": 10,
        "name": "计算机组成原理",
        "description": "《计算机组成原理试题解析（第五版）》是《计算机组成原理（第五版·立体化教材）》的配套教材，提供了“计算机组成原理”课程的典型题解800余题，分为选择、填空、计算、证明、分析、设计六大类型，以及硕士生入学考试辅导。所选习题少而精，具有概念性、思考性、启发性，并给出参考答案。",
        "newHomeWork": 2,
        "feedback": 3,
        "imagePath": require('../../temp/cs.jpg'),
        "teacher": "张三丰"
    },
    {
        "id": 11,
        "name": "数据结构",
        "description": "本课程的前半部分从抽象数据类型的角度讨论各种基本类型的数据结构及其应用；后半部分主要讨论查找和排序的各种实现方法及其综合分析比较。其内容和章节编排与1992年4月出版的《数据结构》（第二版）基本一致，但在本书中更突出了抽象数据类型的概念。全书采用类C语言作为数据结构和算法的描述语言。",
        "imagePath": require("../../temp/DataStructure.jpg"),
        "feedback": 1,
        "teacher": "李四"
    },
    {
        "id": 12,
        "name": "高等数学",
        "description": "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。主要内容包括：极限、微积分、空间解析几何与向量代数、级数、常微分方程。",
        "imagePath": require("../../temp/math.jpg"),
        "teacher": "张三",
    },
    {
        "id": 13,
        "name": "计算机网络",
        "description": "计算机网络，是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和[1]  信息传递的计算机系统。",
        "imagePath": require("../../temp/network.jpg"),
        "newHomeWork": 2,
        "teacher": "马云"
    },
    {
        "id": 14,
        "name": "数据结构",
        "description": "本课程的前半部分从抽象数据类型的角度讨论各种基本类型的数据结构及其应用；后半部分主要讨论查找和排序的各种实现方法及其综合分析比较。其内容和章节编排与1992年4月出版的《数据结构》（第二版）基本一致，但在本书中更突出了抽象数据类型的概念。全书采用类C语言作为数据结构和算法的描述语言。",
        "imagePath": require("../../temp/DataStructure.jpg"),
        "feedback": 1,
        "teacher": "李彦宏"
    },
    {
        "id": 15,
        "name": "高等数学",
        "description": "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。主要内容包括：极限、微积分、空间解析几何与向量代数、级数、常微分方程。",
        "imagePath": require("../../temp/math.jpg"),
        "teacher": "张小龙"
    },
    {
        "id": 16,
        "name": "计算机网络",
        "description": "计算机网络，是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和[1]  信息传递的计算机系统。",
        "imagePath": require("../../temp/network.jpg"),
        "newHomeWork": 2,
        "teacher": "马化腾"
    },
    {
        "id": 17,
        "name": "面向对象分析与设计",
        "description": "面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构。OOP 的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。OOP 达到了软件工程的三个主要目标：重用性、灵活性和扩展性。为了实现整体运算，每个对象都能够接收信息、处理数据和向其它对象发送信息。",
        "newHomeWork": 2,
        "feedback": 1,
        "imagePath": require("../../temp/OO.jpg"),
        "teacher": "曾玲"
    },
    {
        "id": 18,
        "name": "高等数学",
        "description": "高等数学是由微积分学，较深入的代数学、几何学以及它们之间的交叉内容所形成的一门基础学科。主要内容包括：极限、微积分、空间解析几何与向量代数、级数、常微分方程。",
        "imagePath": require("../../temp/math.jpg"),
        "teacher": "张小龙"
    },
    {
        "id": 19,
        "name": "计算机网络",
        "description": "计算机网络，是指将地理位置不同的具有独立功能的多台计算机及其外部设备，通过通信线路连接起来，在网络操作系统，网络管理软件及网络通信协议的管理和协调下，实现资源共享和[1]  信息传递的计算机系统。",
        "imagePath": require("../../temp/network.jpg"),
        "newHomeWork": 2,
        "teacher": "马化腾"
    },
    {
        "id": 20,
        "name": "面向对象分析与设计",
        "description": "面向对象编程（Object Oriented Programming，OOP，面向对象程序设计）是一种计算机编程架构。OOP 的一条基本原则是计算机程序是由单个能够起到子程序作用的单元或对象组合而成。OOP 达到了软件工程的三个主要目标：重用性、灵活性和扩展性。为了实现整体运算，每个对象都能够接收信息、处理数据和向其它对象发送信息。",
        "newHomeWork": 2,
        "feedback": 1,
        "imagePath": require("../../temp/OO.jpg"),
        "teacher": "曾玲"
    }
];
import LessonPreview from '../../components/lessonPreview/LessonPreview';


class AddLesson extends Component {

    showInfo = (e) => {
        message.info("添加成功!");
    };

    render() {
        let lessonsHtml = lessons.map((item)=> {
            return (
                <div onClick={this.showInfo} className="add-icon-wrapper" key={item.id}>
                    <div className="mask"></div>
                    <img className="add-icon" src={addIcon} alt="增加"/>
                    <LessonPreview key={item.id} lesson={item}/>
                </div>
            )
        });

        return (
            <div>
                <Breadcrumb style={{margin: '12px 0'}}>
                    <Breadcrumb.Item>添加课程</Breadcrumb.Item>
                </Breadcrumb>
                <div className="content-wrapper add-lesson">
                    <Input.Search
                        className="lesson-search-input"
                        placeholder="课程 id、课程名称、任课老师"
                        style={{width: 200}}
                        onSearch={value => console.log(value)}
                    />
                    <div className="all-lessons">
                        {lessonsHtml}
                    </div>
                    <Pagination className="add-lesson-pagination" defaultCurrent={1} total={500}/>
                </div>
            </div>
        );
    }
}

export default AddLesson;
