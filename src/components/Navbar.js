import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";

export function Navbar({ authenticated }) {
  const logout = () => {
    localStorage.clear();
    window.location.reload(false);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className="menu">
        {authenticated ? (
          <div>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </div>
        ) : (
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

export default Navbar;
