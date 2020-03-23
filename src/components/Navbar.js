import React, { Fragment } from "react";
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
//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
//Images
import metaLogo from '../images/metaLogo2.png';

const useStyles = makeStyles(theme => ({
  image: {
    width: 140,
    padding: 20
  },
  root: {
    display: 'flex',
  },
  menuNavigation :{
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end'
  }
}));

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    authenticated,
    credentials: { administrator, handle }
  } = useSelector(state => state.user);

  function handleLogout() {
    window.location.href = "/login";
    dispatch(logoutUser());
  }

  return (
    <div>
      <AppBar position="fixed">    
        {authenticated ? (
          <Toolbar className={classes.root}>
            <img src={metaLogo} className={classes.image} />
            <section className={classes.menuNavigation}>
                <ul>
                  <li><Button color="inherit" className="activeButton" component={Link} to="/">
                    Home
                  </Button></li>
                  {administrator ? (
                    <li><Button color="inherit" className="activeButton" component={Link} to="/secretAdmin">
                      Admin
                    </Button></li>
                  ) : (<span></span>)}
                  <li><Button color="inherit" onClick={handleLogout}>
                    Logout
                  </Button></li>
                  <li id="barrinha">/ </li>
                  <li className="robotoFont">BEM VINDO</li>
                  <li className="robotoFontBold"> {handle}</li>
                </ul>
            </section>  
          </Toolbar>) 
            : (
            <Toolbar className={classes.root}>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            </Toolbar>
          )}
      </AppBar>
    </div>
  );
};

export default Navbar;