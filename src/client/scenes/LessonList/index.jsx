import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Card, Row, Col } from 'antd';
import { connect } from 'react-redux';
import getData from './services/lessonListService';

class LessonList extends Component {
  componentWillMount() {
    // 请求数据
    getData(this.props);
  }

  render() {
    // 课程列表
    const { lessonList = [] } = this.props;
    return (
      <Layout className="lesson-list-container">
        <Row gutter={16}>
          {
            lessonList.map((item, index) => (
              <Col className="lesson-card" span={8} key={`lesson_${item.lesson_id || index + 1}`}>
                <Link to={`/lesson-detail/${item.file_id}/0`}>
                  <Card title={item.name} bordered={false}>{item.notes || ''}</Card>
                </Link>
              </Col>
            ))
          }
        </Row>
      </Layout>
    );
  }
}

export default connect(
  state => ({
    lessonList: state.lessonList,
  }),
)(LessonList);
