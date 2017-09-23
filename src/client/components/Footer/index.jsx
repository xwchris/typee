import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <div className="component-footer">
    <div className="container">
      <p className="copyright">© 2017 typee</p>
      <Link className="btn about-us" to="/about-us">关于我们</Link>
    </div>
  </div>
);

export default Footer;
