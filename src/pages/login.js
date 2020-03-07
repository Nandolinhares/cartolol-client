import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { loginUser } from '../redux/actions/userActions';
import { connect } from 'react-redux';

const styles = {
  h3: {
    textAlign: "center"
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
        <Grid item sm></Grid>
        <Grid item sm>
          <Typography variant="h3" className={classes.h3}>
            Login
          </Typography>
          <form
            noValidate
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
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
            >
              Login
              {loading &&(
                <CircularProgress className={classes.progress} />
              )}
            </Button>
          </form>
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
