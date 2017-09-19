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
  getTimer() {
    return this.state.currTime;
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
