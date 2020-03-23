import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
//Menu
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
//Redux Stuff
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

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
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-end'
    },
  },
  lolzetas: {
    display: 'flex'
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  menuMobile: {
    fontFamily: 'Roboto Condensed',
    fontSize: 12,
    fontWeight: 700,
    color: '#fff',
    '&:hover': {
      backgroundColor: 'blue'
    }
  }
}));

const Navbar = () => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useDispatch();
  const {
    authenticated,
    credentials: { administrator, handle, money }
  } = useSelector(state => state.user);

  function handleLogout() {
    window.location.href = "/login";
    dispatch(logoutUser());
  }

  //Funções Menu mobile
  const handleMobileMenuOpen = event => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <span className="robotoFont">BEM VINDO &nbsp;</span>
        <span className="robotoFontBold"> {handle}</span>
      </MenuItem>
      <Divider />
      <MenuItem component={Link} to="/">
        <p className={classes.menuMobile}>Home</p>
      </MenuItem>
      <Divider />
      <MenuItem component={Link} to="/secretAdmin">
        <p className={classes.menuMobile}>Admin</p>
      </MenuItem>
      <Divider />
      <MenuItem>
        <p className={classes.menuMobile}>Logout</p>
      </MenuItem>
      <Divider />
      <MenuItem>
      <span className="icones">
        <a className="individualIcon" href="https://www.facebook.com/metaesportsbr" target="_blank"><FacebookIcon style={{ fontSize: 20 }} /></a>   
        <TwitterIcon style={{ fontSize: 20 }}  className="individualIcon"/>              
      </span>
      </MenuItem>
    </Menu>
  );

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
                  <li id="barrinha"> / &nbsp; </li>
                </ul>
                <span className="icones">
                  <a className="individualIcon" href="https://www.facebook.com/metaesportsbr" target="_blank"><FacebookIcon style={{ fontSize: 20 }} /></a>   
                  <TwitterIcon style={{ fontSize: 20 }}  className="individualIcon"/>              
                </span>
            </section>
            <section className={classes.lolzetas}>
              <ul className="lolzetas">
                  <li>Lolzetas: </li>
                  <li className="money">R$ {money}</li>
              </ul>
            </section>  
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
               <MenuIcon />
              </IconButton>
              {renderMobileMenu}
            </div>
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