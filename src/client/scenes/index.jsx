import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Tip from '../components/Tip';

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

export default App;
