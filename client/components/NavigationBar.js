import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';

class NavigationBar extends React.Component {
  logout(e){
    e.preventDefault();
    this.props.logout();
  }

  render(){
    const { isAuthenticated } = this.props.auth;
    const userLinks= (
        <ul className="nav navbar-nav navbar-right">
          <li><a href='#' onClick ={this.logout.bind(this)}>Logout</a></li>
        </ul>
    );
    const guestLinks =(
        <div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/login">Login</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </div>
    );
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
      { isAuthenticated ? userLinks : guestLinks}
    </div>
  </div>
  </nav>
    );
  }
}

NavigationBar.propTypes = {
  auth:React.PropTypes.object.isRequired,
  logout: React.PropTypes.func.isRequired
};
function mapStateToProps(state){
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps,{logout})(NavigationBar);
