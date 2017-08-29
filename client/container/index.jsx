import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '../component/header';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="index-container">
        <Header />
        <h1>首页</h1>
        <main className="main">
          {renderRoutes(this.props.route.routes)}
        </main>
      </div>
    );
  }
}

export default App;
