import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tip from '../components/Tip';
import Login from '../components/Login';
import Regist from '../components/Regist';

class App extends Component {
  componentDidMount() {
    // 如果window存在
    if (window) {
      // 设置提示框函数
      window.createTip = (text, type) => { this.createTip(text, type); };
    }
  }

  // 展示提示框
  createTip(text, type) {
    this.tip.showTip(text, type);
  }

  render() {
    return (
      <div className="index-container">
        <Login />
        <Regist />
        <Tip ref={(ele) => { this.tip = ele; }} />
        <Header />
        <main className="main">
          {renderRoutes(this.props.route.routes)}
        </main>
        <Footer />
      </div>
    );
  }
}

export default connect()(App);
