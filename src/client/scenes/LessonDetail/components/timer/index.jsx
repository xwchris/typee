import React, { Component } from 'react';

// 格式化时间
function parseTime(seconds) {
  const minute = (seconds - (seconds % 60)) / 60;
  const second = seconds - (minute * 60);
  return `${minute < 10 ? `0${minute}` : minute}:${second < 10 ? `0${second}` : second}`;
}

class timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTime: 0,
    };
  }

  // 设置定时器
  setTimer() {
    this.timer = setInterval(() => {
      this.setState({
        currTime: this.state.currTime + 1,
      });
    }, 1000);
  }

  // 清除定时器
  clearTimer() {
    clearInterval(this.timer);
  }

  // 渲染函数
  render() {
    return (
      <div className="component-timer">{parseTime(this.state.currTime)}</div>
    );
  }
}

export default timer;
