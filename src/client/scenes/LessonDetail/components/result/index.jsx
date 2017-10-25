import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Switch, Button, Progress } from 'antd';
import echarts from 'echarts';
import { calculateResult } from '../../mixins/helpers';

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // true为Wmp False为Kmp
      WmpOrKmp: true,
    };
  }

  componentDidMount() {
    // 结果对象
    // 基于准备好的dom，初始化echarts实例
    const errorCharChart = echarts.init(this.chartsArea);
    // 绘制图表
    errorCharChart.setOption({
      title: {
        text: '错误字符',
        subtext: 'Top 10',
      },
      color: ['#0e77ca'],
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
      yAxis: [
        {
          type: 'category',
          data: this.formatResult.errorArray.map(item => (item.key)).slice(0, 10).reverse(),
          axisTick: {
            alignWithLabel: true,
          },
          axisLabel: {
            color: 'rgba(0, 0, 0, 0.7)',
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
      ],
      xAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: '错误次数',
          type: 'bar',
          barWidth: '60%',
          data: this.formatResult.errorArray.map(item => (item.value)).slice(0, 10).reverse(),
        },
      ],
    });
  }

  handleChangeWmp(isWmp) {
    this.setState({
      WmpOrKmp: isWmp,
    });
  }

  render() {
    // 结果对象
    const { lessonResult = {}, last } = this.props;

    const NextBtnGroup = () => (
      <div>
        <Button type="primary" className="next-section-btn">
          {
            last ?
              <Link to="/">完成课程 返回列表</Link> :
              <Link to={`/lesson-detail/${lessonResult.fileId}/${lessonResult.pageId + 1}`}>
                下一节
              </Link>
          }
        </Button>
        <Button>
          同步数据
        </Button>
      </div>
    );
    this.formatResult = calculateResult(lessonResult);
    return (
      <div className="component-result">
        <Row className="mt-20" gutter={40}>
          <Col span={8}>
            <Card
              className="result-card"
              title={this.state.WmpOrKmp ? 'WMP' : 'KMP'}
              extra={
                <Switch
                  checkedChildren="wmp"
                  unCheckedChildren="kmp"
                  defaultChecked
                  onChange={isWmp => this.handleChangeWmp(isWmp)}
                />
              }
            >
              <p className="count-result">
                {this.state.WmpOrKmp ? this.formatResult.wpm : this.formatResult.wpm * 5}
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="result-card" title="退格次数">
              <p className="count-result">{this.formatResult.deleteCount || 0}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="result-card" title="无效输入比例">
              <Progress
                className="progress-circle"
                type="circle"
                percent={this.formatResult.invalidRate || 0}
              />
            </Card>
          </Col>
        </Row>
        <Row className="mt-20" gutter={40}>
          <Col span={8}>
            <Card className="result-card" title="应输入总字符数">
              <p className="count-result">{this.formatResult.totalCount || 0}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="result-card" title="输入总字符数">
              <p className="count-result">{this.formatResult.inputCount || 0}</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="result-card" title="错误总字符数">
              <p className="count-result">{this.formatResult.errorCount || 0}</p>
            </Card>
          </Col>
        </Row>
        <Row className="mt-20">
          <Col span={24}>
            <Card title="错误最多的字符" extra={<NextBtnGroup />}>
              <div className="chart-area" ref={(ele) => { this.chartsArea = ele; }} />
            </Card>
          </Col>
        </Row>
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
