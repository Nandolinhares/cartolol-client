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

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#00ff5b',
    },
    '& .MuiInputLabel-formControl': {
      color: '#fff'
    },
    '& .MuiInput-underline::before': {
      borderBottomColor: '#fff'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled)::before': {
      borderBottomColor: '#fff'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00ff5b',
    },
    '& .MuiInputBase-root': {
      color: '#fff'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
      '&:hover fieldset': {
        borderColor: '#00ff5b',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00ff5b',
      }
    },
  },
})(TextField);

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
    backgroundColor: "#1bd75e",
    color: "#fff",
    fontFamily: 'Roboto Condensed',
    fontWeight: 'bold',
    borderRadius: '22px',
    fontWeight: "bold",
    padding: 12 ,
    "&:hover": {
      background: "#00ff5b"
    }
  },
  paperForm: {
    padding: 20
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
          <Paper elevation={3} className={classes.paperForm}>
            <form
              noValidate
              onSubmit={this.handleSubmit}
              className={classes.form}
            >
              <CssTextField
                id="email"
                type="email"
                name="email"
                label="Email"
                helperText={errors.email}
                color="#00ff5b"
                error={errors.email ? true : false}
                onChange={this.handleChange}
                value={this.state.email}
                className={classes.TextField}
                variant="outlined"  
                fullWidth
              />
              <CssTextField
                id="password"
                type="password"
                name="password"
                label="Senha"
                color="#00ff5b"
                helperText={errors.password}
                error={errors.password ? true : false}
                onChange={this.handleChange}
                value={this.state.password}
                className={classes.TextField}
                variant="outlined"
                fullWidth
              /> 

              {errors.message && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.message}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                className={classes.button}
                fullWidth
              >
                Login
                {loading &&(
                  <CircularProgress className={classes.progress} />
                )}
              </Button>
            </form>
          </Paper>
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
