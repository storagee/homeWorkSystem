import React, {Component} from 'react';
import './App.css';
import 'github-markdown-css'
import {Router, Route, hashHistory} from 'react-router'
import Login from './pages/login&register/Login';
import Register from './pages/login&register/Register';
import Student from './pages/student/Student';
import Admin from './pages/admin/Admin'
import MyHomeWork from './pages/student/myHomeWork/MyHomeWork';
import AddLesson from './pages/student/addLesson/AddLesson';
import LessonDetail from './pages/student/lessonDetail/LessonDetail';
import MyLessons from './pages/admin/myLessons/MyLessons';
import MyLessonDetail from './pages/admin/myLessons/myLessonDetail/MyLessonDetail';
import MyQuestionSet from './pages/admin/myQuestionSet/MyQuestionSet';
import MyQuestionSetDetail from './pages/admin/myQuestionSet/myQuestionSetDetail/myQuestionSetDetail';
import 'whatwg-fetch'

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="login" component={Login}>
                </Route>
                <Route path="register" component={Register}>
                </Route>
                <Route path="student" component={Student}>
                    <Route path="myHomeWork" component={MyHomeWork}/>
                    <Route path="addLesson" component={AddLesson}/>
                    <Route path="lessonDetail/:lessonId/:lessonName" component={LessonDetail}/>
                </Route>
                <Route path="admin" component={Admin}>
                    <Route path="myLessons" component={MyLessons} />
                    <Route path="myLessonDetail/:lessonId/:lessonName" component={MyLessonDetail} />
                    <Route path="myQuestionSet" component={MyQuestionSet} />
                    <Route path="myQuestionSetDetail/:questionSetId/:questionSetName" component={MyQuestionSetDetail} />
                </Route>
            </Router>
        );
    }
}

export default App;
