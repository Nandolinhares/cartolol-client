import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
//Menu
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
//Redux Stuff
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions/userActions";
//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonIcon from '@material-ui/icons/Person';

//Images
import metaLogo from '../images/metaLogo2.png';

const useStyles = makeStyles(theme => ({
  image: {
    width: 140,
    padding: 20,
    margin: '0 auto'
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
  },
  list: {
    width: 250,
  },
  IconList: {
    color: "#fff"
  },
  NameList: {
    color: "#fff"
  }
}));

function ListItemLink(props) {
  return <ListItem button component={Link} {...props} />;
}

const Navbar = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  //Menu lateral mobilw
  const toggleDrawer = (open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(open);
  };

  const dispatch = useDispatch();
  const {
    authenticated,
    credentials: { administrator, handle, money }
  } = useSelector(state => state.user);

  function handleLogout() {
    window.location.href = "/login";
    dispatch(logoutUser());
  }

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {authenticated ? (administrator ? (
        <div>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon className={classes.IconList} />
              </ListItemIcon>
              <ListItemLink to="/">
                <ListItemText className={classes.NameList} primary="Home" />
              </ListItemLink>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <SupervisorAccountIcon className={classes.IconList} />
              </ListItemIcon>
              <ListItemLink to="/secretAdmin">
                <ListItemText className={classes.NameList} primary="Admin" />
              </ListItemLink>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon className={classes.IconList} />
              </ListItemIcon>
                <ListItemText className={classes.NameList} primary="Logout" onClick={handleLogout} />  
            </ListItem>
          </List>
          <Divider />
        </div>
      ) : (
        <div>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon className={classes.IconList} />
              </ListItemIcon>
              <ListItemLink to="/">
                <ListItemText className={classes.NameList} primary="Home" />
              </ListItemLink>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon className={classes.IconList} />
              </ListItemIcon>
                <ListItemText className={classes.NameList} primary="Logout" onClick={handleLogout} />  
            </ListItem>
          </List>
          <Divider />
        </div>)
      ) : (
        <div>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon className={classes.IconList} />
              </ListItemIcon>
              <ListItemLink to="/">
                <ListItemText className={classes.NameList} primary="Home" />
              </ListItemLink>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <AccountCircleIcon className={classes.IconList} />
              </ListItemIcon>
              <ListItemLink to="/login">
                <ListItemText className={classes.NameList} primary="Login" />
              </ListItemLink>
            </ListItem>
            <Divider />
            <ListItem button>
              <ListItemIcon>
                <PersonIcon className={classes.IconList} />
              </ListItemIcon>
              <ListItemLink to="/signup">
                <ListItemText className={classes.NameList} primary="Cadastrar" />
              </ListItemLink>
            </ListItem>
          </List>
          <Divider />
        </div>
      )}
    </div>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <div>
      <AppBar position="fixed">    
        {authenticated ? (
          <Toolbar className={classes.root}>
            <img src={metaLogo} className={classes.image} alt="Meta Esports Logo" />
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
                  <li><Button color="inherit" className="activeButton" component={Link} to={`/${handle}/ligas`} >
                    Minhas Ligas  
                  </Button></li>
                  <li><Button color="inherit" onClick={handleLogout}>
                    Sair
                  </Button></li>
                  <li id="barrinha">/ </li>
                  <li className="robotoFont">BEM VINDO</li>
                  <li className="robotoFontBold"> {handle}</li>
                  <li id="barrinha"> / &nbsp; </li>
                </ul>
                <span className="icones">
                  <a className="individualIcon" href="https://www.facebook.com/metaesportsbr" target="_blank" rel="noopener noreferrer"><FacebookIcon style={{ fontSize: 20 }} /></a>   
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
                  aria-label="veja mais"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={toggleDrawer(true)}
                  color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {list()}
                </Drawer>
              </div>        
          </Toolbar>) 
            : (
            <Toolbar className={classes.root}>
              <img src={metaLogo} className={classes.image} alt="Meta Esports Logo" />
              <section className={classes.menuNavigation}>
                <ul>
                  <li><Button color="inherit" component={Link} to="/signup">
                        Cadastrar
                      </Button>
                  </li>
                  <li>
                    <Button color="inherit" component={Link} to="/">
                       Home
                    </Button>
                  </li>
                  <li>
                    <Button color="inherit" component={Link} to="/login">
                      Login
                    </Button>
                  </li>
                  <li id="barrinha">/ &nbsp;</li>
                </ul>
                  <span className="icones">
                    <a className="individualIcon" href="https://www.facebook.com/metaesportsbr" target="_blank" rel="noopener noreferrer"><FacebookIcon style={{ fontSize: 20 }} /></a>   
                    <TwitterIcon style={{ fontSize: 20 }}  className="individualIcon"/>              
                  </span>  
              </section>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="veja mais"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={toggleDrawer(true)}
                  color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Drawer open={open} onClose={toggleDrawer(false)}>
                  {list()}
                </Drawer>
              </div> 
            </Toolbar>
          )}
      </AppBar>
    </div>
  );
};

export default Navbar;