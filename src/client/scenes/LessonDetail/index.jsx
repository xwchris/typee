import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './components/timer';
import Result from './components/result';
import { getClassName } from './mixins/helpers';
import getData from 'services/dataFuncs';
import result from './result';

class LessonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointer: 0,
      inputArray: [],
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;
    getData({
      url: `http://api.ustudents.cn/file?file_id=${id}`,
      callback: (data) => {
        this.props.dispatch({
          type: 'LESSON_DETAIL',
          key: 'lessonDetail',
          value: data,
        });
      },
    });
  }

  // 处理键盘输入
  componentDidMount() {
    window.onkeypress = e => this.handleKeyPress(e);
    window.onkeydown = e => this.handleKeyDown(e);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.lessonDetail && !this.textArr) {
      this.textArr = (nextProps.lessonDetail.file_msg || '').split('');
    }
  }

  // 键盘按下事件
  handleKeyPress(e) {
    e.preventDefault();
    if (this.textArr.length === 0) {
      return;
    }
    let inputChar = String.fromCharCode(e.charCode);
    const inputCode = e.keyCode;
    const arr = this.state.inputArray;
    const pointer = this.state.pointer;
    // 记录输入
    if (inputCode === 13) {
      inputChar = 'enter';
    } else if (inputCode === 32) {
      inputChar = 'space';
    }
    this.recordInput(inputChar);
    // 如果是第一次则开始计时
    if (pointer === 0 && this.timer) {
      this.timer.setTimer();
    }
    // 判断是否相同 相同则类设为pass否则设为error
    if ((inputChar === this.textArr[pointer]) || (inputCode === 13 && this.textArr[pointer] === '\n')) {
      arr.push('pass');
    } else {
      let errorChar = this.textArr[pointer];
      if (errorChar === '\n') {
        errorChar = 'enter';
      } else if (errorChar === ' ') {
        errorChar = 'space';
      }
      this.recordInput(errorChar, 'errorChars');
      arr.push('error');
    }
    this.setState({
      pointer: pointer + 1,
      inputArray: arr,
    });
  }

  // 处理退格事件
  handleKeyDown(e) {
    const arr = this.state.inputArray;
    const pointer = this.state.pointer;
    // 退格键
    if (e.keyCode === 8) {
      this.recordInput('delete');
      if (arr.length >= 0) {
        arr.pop();
      }
      this.setState({
        pointer: pointer > 0 ? pointer - 1 : pointer,
        inputArray: arr,
      });
    }
  }

  // 记录输入按键
  recordInput(inputChar, type) {
    // 如果file_id为空 则赋值
    if (result.fileId === '') {
      result.fileId = this.props.match.params.id;
    }
    // 记录输入的各字符次数
    const inputCount = (result[type || 'inputChars'][inputChar] || 0) + 1;
    result[type || 'inputChars'][inputChar] = inputCount;
  }

  // 输入完成事件
  handleInputEnd() {
    // 清除计时器
    this.timer.clearTimer();
    // 获取时间 秒为单位
    const time = this.timer.getTimer();
    // 设置时间
    result.time = time;
    // 设置总数
    result.totalCount = (this.props.lessonDetail.file_msg || '').length;
    // 设置file_id
    result.fileId = this.props.match.params.id;
  }

  render() {
    return (
      <div className="lesson-detail-container">
        <Result />
        <div className="lesson-detail-content container">
          <pre className="code-box">
            {this.textArr && this.textArr.map((item, index) => (<span key={`char_${index + 1}`} className={getClassName(index, item, this.state)}>{item}</span>)) }
          </pre>
        </div>
        <Timer ref={(ele) => { this.timer = ele; }} />
      </div>
    );
  }
}

export default connect(
  state => ({
    lessonDetail: state.lessonDetail,
  }),
)(LessonDetail);
