import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
//Redux Stuff
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';
import store from '../redux/store';

export function Navbar({ user: { authenticated, credentials: { administrator } } }) {

  function handleLogout(){
    window.location.href = "/login";
    store.dispatch(logoutUser());
  }

  return (
    <AppBar position="fixed">
      <Toolbar className="menu">
        {authenticated ? (administrator ? (<div>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/secretAdmin">Admin</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div>) : ( 
        <div>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </div>)) : (
          <div>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
