import React, { Component } from 'react';

class Tip extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      text: '这是默认提示',
    };
  }

  // 关闭提示框
  closeTip() {
    // 设置为false关闭
    this.setState({
      show: false,
    });
  }

  // 打开提示框
  showTip(text, type) {
    // 设置为true打开
    this.setState({
      show: true,
      text,
      type,
    }, () => {
      // 默认4s后关闭
      if (this.state.show) {
        setTimeout(() => {
          this.setState({
            show: false,
          });
        }, 4000);
      }
    });
  }

  render() {
    return (
      <div className={`component-tip ${this.state.type || ''}${this.state.show ? '' : ' hidden'}`}>
        <div className="tip-text">{this.state.text}</div>
        <span
          className="btn close-btn"
          role="button"
          onClick={() => { this.closeTip(); }}
        />
      </div>
    );
  }
}

export default Tip;
