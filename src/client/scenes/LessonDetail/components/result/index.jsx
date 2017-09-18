import React, { Component } from 'react';

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true,
      result: {},
    };
    // wmp
    // 输入总数
    // 有效输入数
    // 退格次数
    // 错误最多次按键
    // 错误第二多次按键
    // 错误第三多次按键
    // 下一课
  }

  render() {
    return (
      <div className="component-result clearfix">
        <div className="result-content">
          <div className="left-part pull-left">
            <div className="item item-wpm">38</div>
            <div className="item">输入的总字符数：300</div>
            <div className="item">退格次数：300</div>
          </div>
          <div className="right-part pull-left">
            <div className="item item-top">Enter</div>
            <div className="item">错误第二多的按键：B</div>
            <div className="item">错误第二多的按键：A</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Result;
