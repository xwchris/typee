import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

const Admin = () => (
  <div className="admin-container">
    <main className="main">
      {renderRoutes(this.props.route.routes)}
    </main>
  </div>
);

export default Admin;
