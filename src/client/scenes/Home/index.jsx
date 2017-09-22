import React from 'react';

const Home = () => (
  <div className="home-container">
    <div className="home-banner">
      <img className="banner-image" src="./static/images/home-banner.jpg" alt="banner图" />
      <h1 className="banner-desc">精于心 简于形</h1>
    </div>
    <div className="home-content container">
      <h2 className="content-title">Typee的三大优势</h2>
      <div className="part-list">
        <div className="part-item">
          <div className="item-image">
            <img className="image-src" src="./static/images/home-image-1.jpg" alt="展示图片1" />
          </div>
          <div className="item-text">
            <div className="text-title">详尽的练习报告</div>
            <div className="text-desc">
              在每课练习完毕后会根据您的练习情况给出详细的练习报告，帮助您对自己当前的水平进行定位，报告内容包括WPM、有效敲击比例、错误最多按键等项目。
            </div>
          </div>
        </div>
        <div className="part-item clearfix">
          <div className="item-text">
            <div className="text-title">科学的练习课程</div>
            <div className="text-desc">
              所有练习课程范围涵盖多种编程语言，包括Java、Python、JavaScript、C、CSS等热门编程语言，精选优秀代码。提高打字速度的同时助你养成良好的编程习惯。
            </div>
          </div>
          <div className="item-image pull-right">
            <img className="image-src" src="./static/images/home-image-2.jpg" alt="展示图片2" />
          </div>
        </div>
        <div className="part-item">
          <div className="item-image">
            <img className="image-src" src="./static/images/home-image-3.jpg" alt="展示图片3" />
          </div>
          <div className="item-text">
            <div className="text-title">高效的练习方法</div>
            <div className="text-desc">
              根据您的练习数据，进行数据分析，给出您易错标注以及正确的击键方式。帮助你在最短时间内稳步提升，不断进步。
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Home;
