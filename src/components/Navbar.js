import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
//import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//import PropTypes from "prop-types";
//Redux Stuff
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";

//Images
import metaLogo from '../images/metaLogo2.png';

const useStyles = makeStyles(theme => ({
  image: {
    width: 140,
    padding: 20,
    flexGrow: 1
  },
  root: {
    flexGrow: 1
  },
  menuButtons: {
    
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    authenticated,
    credentials: { administrator }
  } = useSelector(state => state.user);

  function handleLogout() {
    window.location.href = "/login";
    dispatch(logoutUser());
  }

  return (
    <AppBar position="fixed" className={classes.root}>
      <Toolbar className="menu">
        {authenticated ? (
            <div>
              <img src={metaLogo} className={classes.image} />
                <Button color="inherit" className="activeButton" component={Link} to="/">
                  Home
                </Button>
                {administrator ? (
                  <Button color="inherit" className="activeButton" component={Link} to="/secretAdmin">
                    Admin
                  </Button>
                ) : (<span></span>)}
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
            </div>
          ) 
          : (
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
};

export default Navbar;