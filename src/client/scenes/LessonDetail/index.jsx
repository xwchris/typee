import React, { Component } from 'react';
import Timer from './components/timer';

const strArr = '.container { width: 1170px };'.split('');

class LessonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointer: 0,
      inputArray: [],
    };
  }

  // 处理键盘输入
  componentDidMount() {
    window.onkeypress = e => this.handleKeyPress(e);
  }

  // 键盘按下事件
  handleKeyPress(e) {
    e.preventDefault();
    const inputChar = String.fromCharCode(e.charCode);
    const arr = this.state.inputArray;
    const pointer = this.state.pointer;
    if (pointer === 0) {
      // this.startTimer();
    }
    if (inputChar === strArr[pointer]) {
      arr.push('pass');
    } else {
      arr.push('error');
    }
    this.setState({
      pointer: pointer + 1,
      inputArray: arr,
    });
  }


  render() {
    return (
      <div className="lesson-detail-container">
        <Timer />
        <div className="code-box">
          {
            strArr.map((item, index) => (
              <span className={`c ${this.state.inputArray[index] || ''}${index === this.state.pointer ? 'active' : ''}`} key={`c_${index + 1}`}>{item}</span>
            ))
          }
        </div>
      </div>
    );
  }
}

export default LessonDetail;
