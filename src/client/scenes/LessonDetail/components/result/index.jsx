import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import echarts from 'echarts';
import { calculateResult } from '../../mixins/helpers';

class Result extends Component {
  componentDidMount() {
    // 结果对象
    // 基于准备好的dom，初始化echarts实例
    const errorCharChart = echarts.init(this.chartsArea);
    // 绘制图表
    errorCharChart.setOption({
      title: {
        text: '练习错误字符Top10',
      },
      color: ['#d73a49'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.formatResult.errorArray.map(item => (item.key)).slice(0, 10),
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '错误次数',
          type: 'bar',
          barWidth: '60%',
          data: this.formatResult.errorArray.map(item => (item.value)).slice(0, 10),
        },
      ],
    });
  }

  render() {
    // 结果对象
    const { lessonResult = {}, last } = this.props;
    this.formatResult = calculateResult(lessonResult);
    return (
      <div className="component-result">
        <h1 className="result-title">练习报告</h1>
        <div className="result-content clearfix">
          <div className="left-part pull-left">
            <div className="item item-wpm">WMP: {this.formatResult.wpm}</div>
            <div className="item">应输入总字符数: {this.formatResult.totalCount}</div>
            <div className="item">输入总字符数: {this.formatResult.inputCount}</div>
            <div className="item">错误总字符数: {this.formatResult.errorCount}</div>
            <div className="item">退格次数: {this.formatResult.deleteCount}</div>
            <div className="item">无效输入比例: {this.formatResult.invalidRate}</div>
          </div>
          <div className="right-part pull-left" ref={(ele) => { this.chartsArea = ele; }} />
        </div>
        {
          last ? <Link className="btn btn-next" to="/lesson-list">恭喜完成课程</Link>
            : <Link className="btn btn-next" to={`/lesson-detail/${lessonResult.fileId}/${lessonResult.pageId + 1}`}>再练一课</Link>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    lessonResult: state.lessonResult,
    showResult: state.showResult,
  }),
)(Result);
