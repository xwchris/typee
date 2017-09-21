import React, { Component } from 'react';
import { parseTime } from '../../mixins/helpers';

class timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currTime: 0,
    };
  }

  // 设置时间
  setTimer() {
    this.timer = setInterval(() => {
      this.setState({
        currTime: this.state.currTime + 1,
      });
    }, 1000);
  }

  // 获取时间
  getTime() {
    return this.state.currTime;
  }

  // 重置时间
  resetTime() {
    this.setState({
      currTime: 0,
    });
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
