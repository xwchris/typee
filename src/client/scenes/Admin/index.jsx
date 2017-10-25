import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="admin-container">
        <main className="main">
          {renderRoutes(this.props.route.routes)}
        </main>
      </div>
    );
  }
}

export default Admin;
