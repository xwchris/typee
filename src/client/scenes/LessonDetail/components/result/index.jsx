import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { calculateResult } from '../../mixins/helpers';

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  // 显示结果面板
  showResult() {
    this.setState({
      show: true,
    });
  }

  render() {
    // 结果对象
    const { result = {} } = this.props;
    const formatResult = calculateResult(result);
    return (
      <div className={`component-result clearfix${this.state.show ? '' : ' hidden'}`}>
        <div className="result-content">
          <div className="left-part pull-left">
            <div className="item item-wpm">WMP: {formatResult.wpm}</div>
            <div className="item">总字符数：{formatResult.totalCount}</div>
            <div className="item">输入的总字符数：{formatResult.inputCount}</div>
            <div className="item">退格次数：{formatResult.deleteCount}</div>
          </div>
          <div className="right-part pull-left">
            <div className="item item-top">
              Top One Error: {formatResult.errorArray[0] && formatResult.errorArray[0].key}
            </div>
            <div className="item">
              Top Two Error: {formatResult.errorArray[1] && formatResult.errorArray[1].key}
            </div>
            <div className="item">
              Top Three Error: {formatResult.errorArray[2] && formatResult.errorArray[2].key}
            </div>
          </div>
        </div>
        <Link className="btn btn-next" to={`/lesson-detail/${result.lessonId}/${result.fileIndex + 1}`}>下一课</Link>
      </div>
    );
  }
}

export default connect(
  state => ({
    result: state.result,
  }),
)(Result);
