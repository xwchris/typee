import React from 'react';
import config from 'config';

const AboutUs = () => (
  <div className="about-us-container">
    <div className="about-us-content container">
      <div className="item">
        <h2 className="item-title">网站版本</h2>
        <p className="item-text">{config.version}</p>
      </div>
      <div className="item">
        <h2 className="item-title">联系邮箱</h2>
        <p className="item-text">xwchris.zhang@gmail.com</p>
      </div>
      <div className="item">
        <h2 className="item-title">开发者</h2>
        <p className="item-text">Chris Hank</p>
      </div>
    </div>
  </div>
);

export default AboutUs;
