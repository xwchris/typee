import React, { Component } from 'react';
import { storage } from 'mixins';
import { Link } from 'react-router-dom';
import { Layout, Card, Row, Col, Progress } from 'antd';
import { connect } from 'react-redux';
import getData from './services/lessonListService';

// 计算进度
function calcLessonProgress(fileId) {
  // 获取储存的数据
  const lessonData = storage.getItem(`typee_lesson_${fileId}`);
  const { pageId = 0, totalPage = 0 } = JSON.parse(lessonData || '{}');
  if (totalPage === 0) {
    return 0;
  }
  return ((pageId + 1) / totalPage) * 100;
}

// 获取课程当前页数
function getCurrentPage(fileId) {
  // 获取储存的数据
  const lessonData = storage.getItem(`typee_lesson_${fileId}`);
  const { pageId = 0, totalPage = 0 } = JSON.parse(lessonData || '{}');
  if (totalPage <= pageId + 1) {
    return 0;
  }
  return pageId + 1;
}

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
                <Link to={`/lesson-detail/${item.file_id}/${getCurrentPage(item.file_id)}`}>
                  <Card title={item.name} bordered={false}>
                    <p className="card-body-title">描述：</p>
                    <p>{item.notes || ''}</p>
                    <p className="card-body-title">进度：</p>
                    <Progress percent={calcLessonProgress(item.file_id)} />
                  </Card>
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
