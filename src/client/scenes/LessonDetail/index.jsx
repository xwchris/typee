import React, { Component } from 'react';
import { connect } from 'react-redux';
import Timer from './components/timer';
import Result from './components/result';
import { getClassName } from './mixins/helpers';
import getData from './services/lessonDetailService';
import result from './result';

// 记录输入按键
function recordInput(inputChar, type) {
  // 记录输入的各字符次数
  const inputCount = (result[type || 'inputChars'][inputChar] || 0) + 1;
  result[type || 'inputChars'][inputChar] = inputCount;
}

class LessonDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pointer: 0,
      inputArray: [],
    };
  }

  componentWillMount() {
    // 每行空格数
    this.rowInitSpace = 0;
    this.start = true;
    // 请求数据
    getData(this.props);
  }

  componentDidMount() {
    if (document) {
      // 处理键盘输入
      window.onkeypress = e => this.handleKeyPress(e);
      window.onkeydown = e => this.handleKeyDown(e);
    }
  }

  componentWillReceiveProps(nextProps) {
    // 页面初始化
    if (this.start) {
      this.init(nextProps.lessonDetail.textArr);
      this.start = false;
    }
    // 页面变更
    if (this.props.match.params.pageId !== nextProps.match.params.pageId) {
      this.start = true;
      // 请求数据
      getData(nextProps);
    }
  }

  // 初始化state
  init(textArr) {
    // 初始化各元素
    this.rowInitSpace = 0;
    const pointer = 0;
    const inputArray = [];
    result.inputChars = {};
    result.errorChars = {};
    // 初始化首部空格
    for (let i = 0; i < textArr.length; i += 1) {
      if (textArr[i] === ' ' || textArr[i] === '\n') {
        this.rowInitSpace += 1;
        inputArray.push('pass');
      } else {
        break;
      }
    }
    // 设置state
    this.setState({
      pointer: this.rowInitSpace + pointer,
      inputArray,
    });
    // 隐藏结果面板
    this.props.dispatch({
      type: 'LESSON_RESULT_PANEL',
      key: 'showResult',
      value: false,
    });
    // 重置时间
    this.timer.resetTime();
  }

  // 键盘按下事件
  handleKeyPress(e) {
    // 阻止浏览器默认按键事件
    e.preventDefault();
    const textArr = this.props.lessonDetail.textArr;
    const inputChar = String.fromCharCode(e.charCode);
    const inputCode = e.keyCode;
    const arr = this.state.inputArray;
    const pointer = this.state.pointer;
    let tempChar = inputChar;
    let countInitialSpace = 0;
    if (textArr.length === 0 || pointer >= textArr.length) {
      return;
    }
    // 记录输入
    if (inputCode === 13) {
      tempChar = 'enter';
    } else if (inputCode === 32) {
      tempChar = 'space';
    }
    recordInput(tempChar);
    // 如果是第一次则开始计时
    if (pointer === this.rowInitSpace && this.timer) {
      this.timer.setTimer();
    }
    countInitialSpace = pointer + 1;
    // 判断是否相同 相同则类设为pass否则设为error
    if ((inputChar === textArr[pointer])) {
      arr.push('pass');
    } else if (inputCode === 13 && textArr[pointer] === '\n') {
      arr.push('pass');
      while (textArr[countInitialSpace] === ' ' || textArr[countInitialSpace] === '\n') {
        arr.push('pass');
        countInitialSpace += 1;
        this.rowInitSpace += 1;
      }
    } else {
      let errorChar = textArr[pointer];
      if (errorChar === '\n') {
        errorChar = 'enter';
      } else if (errorChar === ' ') {
        errorChar = 'space';
      }
      recordInput(errorChar, 'errorChars');
      arr.push('error');
      if (textArr[pointer] === '\n') {
        while (textArr[countInitialSpace] === ' ' || textArr[countInitialSpace] === '\n') {
          arr.push('pass');
          countInitialSpace += 1;
          this.rowInitSpace += 1;
        }
      }
    }
    // 更新state
    this.setState({
      pointer: countInitialSpace,
      inputArray: arr,
    }, () => {
      // 如果是最后一个字符则显示处理结果
      if (this.state.pointer === textArr.length) {
        this.handleInputEnd();
      }
    });
  }

  // 处理退格事件
  handleKeyDown(e) {
    const textArr = this.props.lessonDetail.textArr;
    const arr = this.state.inputArray;
    const pointer = this.state.pointer;
    let countSpace = 1;
    // 退格键
    if (e.keyCode === 8) {
      // 首行头部禁止继续退格
      if (pointer - this.rowInitSpace <= 0) {
        return;
      }
      // 记录删除键
      recordInput('delete');
      while (pointer - countSpace >= 0 && (textArr[pointer - countSpace] === ' ' || textArr[pointer - countSpace] === '\n')) {
        countSpace += 1;
        this.rowInitSpace -= 1;
      }
      if (countSpace !== 1) {
        countSpace -= 1;
        this.rowInitSpace += 1;
      }
      while (arr.length > pointer - countSpace) {
        arr.pop();
      }
      this.setState({
        pointer: pointer - countSpace > 0 ? pointer - countSpace : 0,
        inputArray: arr,
      });
    }
  }

  // 输入完成事件
  handleInputEnd() {
    const { fileId, pageId } = this.props.match.params;
    const textArr = this.props.lessonDetail.textArr;
    // 清除计时器
    this.timer.clearTimer();
    // 获取时间 秒为单位
    const time = this.timer.getTime();
    // 设置时间
    result.time = time;
    // 设置总数
    result.totalCount = textArr.length - this.rowInitSpace;
    // 设置fileId
    result.fileId = fileId;
    // 设置pageId
    result.pageId = parseInt(pageId, 10);
    this.props.dispatch({
      type: 'LESSON_RESULT',
      key: 'lessonResult',
      value: result,
    });
    // 显示结果面板
    this.props.dispatch({
      type: 'LESSON_RESULT_PANEL',
      key: 'showResult',
      value: true,
    });
  }

  render() {
    const lessonDetail = this.props.lessonDetail || {};
    const { textArr = [], page = 0, totalPage = 0 } = lessonDetail;
    const last = (page + 1 === totalPage);
    return (
      <div className="lesson-detail-container">
        <Timer ref={(ele) => { this.timer = ele; }} />
        <div className="lesson-detail-content container">
          <pre className="code-box">
            <code>
              {textArr && textArr.map((item, index) => (<span key={`char_${index + 1}`} className={getClassName(index, item, this.state)}>{item}</span>))}
            </code>
          </pre>
          {
            this.props.showResult ? <Result last={last} /> : <div />
          }
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    lessonDetail: state.lessonDetail,
    showResult: state.showResult,
  }),
)(LessonDetail);
