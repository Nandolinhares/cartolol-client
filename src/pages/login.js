import React, { Component } from "react";
import { withStyles, createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
//Redux Stuff
import { loginUser } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const styles = {
  h1: {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 14
  },
  form: {
    textAlign: "center"
  },
  TextField: {
    margin: "10px auto 10px auto"
  },
  button: {
    marginTop: 20,
    position: "relative",
    backgroundColor: "#ffb74d",
    color: "#fff",
    fontWeight: "bold",
    "&:hover": {
      background: "#ff9800"
    }
  }
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#00ff5b'
    }
  },
});

export class login extends Component {
  state = {
    email: "",
    password: "",
    errors: {}
  };

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(userData, this.props.history);
    }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() { 
    const { classes, ui: { loading, errors } } = this.props;
    return (
      <Grid container>
        <Grid item sm={5}>
            <Paper elevation={3} className="paperIntro">
              <h1 className={classes.h1}>Login</h1>
						</Paper>
          <form
            noValidate
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
          <ThemeProvider theme={theme}>
            <TextField
              id="email"
              type="email"
              name="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              value={this.state.email}
              className={classes.TextField}
              variant="outlined"
                
              fullWidth
            />
            <TextField
              id="password"
              type="password"
              name="password"
              label="Senha"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
              value={this.state.password}
              className={classes.TextField}
              variant="outlined"
              fullWidth
            />
          </ThemeProvider>  

            {errors.message && (
              <Typography variant="body2" className={classes.customError}>
                {errors.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              className={classes.button}
            >
              Login
              {loading &&(
                <CircularProgress className={classes.progress} />
              )}
            </Button>
          </form>
        </Grid>
        <Grid item sm>
          
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
};

//O state mapeia o state global presente no combineReducers dentro da store
const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));
