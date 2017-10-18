import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import Tip from '../../components/Tip';

class Admin extends Component {
  componentDidMount() {
    // 如果window存在
    if (document) {
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
      <div className="admin-container">
        <Tip />
        <main className="main">
          {renderRoutes(this.props.route.routes)}
        </main>
      </div>
    );
  }
}

export default Admin;
