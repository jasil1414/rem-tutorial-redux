import React from 'react';
import {Link} from 'react-router';

export default () => {
  return (
    <nav className="navbar navbar-default">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <Link to='/' className="navbar-brand">Redux Tutorial</Link>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/signup">Sign-Up</Link></li>
      </ul>
    </div>
  </div>
</nav>
  );
}
