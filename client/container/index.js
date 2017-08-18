import React, { Component } from 'react';
import Header from '../component/header';
import { Route } from 'react-router-dom';

import Lessons from './lessons';
import LessonDetail from './lesson-detail';

class Index extends Component {
  render() {
    return (
      <div className="index-container">
        <Header />
        <h1>首页</h1>
        
        <Route exact path="/" component={Index} />
        <Route path="/lessons" component={Lessons} />
        <Route path="/lesson-detail" component={LessonDetail} />
      </div>
    );
  }
}

export default Index;