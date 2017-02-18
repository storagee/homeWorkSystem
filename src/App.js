import React, {Component} from 'react';
import './App.css';
import {Router, Route, hashHistory} from 'react-router'
import Login from './Login';
import Student from './Student';
import Admin from './Admin'
import MyHomeWork from './pages/myHomeWork/MyHomeWork';
import AddLesson from './pages/addLesson/AddLesson';
import LessonDetail from './pages/lessonDetail/LessonDetail';

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
                <Route path="login" component={Login}>

                </Route>
                <Route path="student" component={Student}>
                    <Route path="myHomeWork" component={MyHomeWork}/>
                    <Route path="addLesson" component={AddLesson}/>
                    <Route path="lessonDetail/:lessonId/:lessonName" component={LessonDetail}/>
                </Route>
                <Route path="admin" component={Admin}>

                </Route>
            </Router>
        );
    }
}

export default App;
