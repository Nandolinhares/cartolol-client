import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { connect } from 'react-redux';  
import { signupUser } from '../redux/actions/userActions';

const styles = {
  form: {
    textAlign: "center"
  },
  h3: {
    textAlign: "center"
  },
  TextField: {
    margin: "10px auto 10px auto"
  },
  Button: {
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

export class signup extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    handle: ""
  };

  handleSubmit = event => {
    event.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };

    this.props.signupUser(newUser, this.props.history);
  };

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
            Signup
          </Typography>
          <form
            noValidate
            onSubmit={this.handleSubmit}
            className={classes.form}
          >
            <TextField
              className={classes.TextField}
              id="name"
              type="text"
              name="name"
              label="Nome"
              helperText={errors.name}
              error={errors.name ? true : false}
              onChange={this.handleChange}
              value={this.state.name}
              fullWidth
            />
            <TextField
              className={classes.TextField}
              id="email"
              type="email"
              name="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              onChange={this.handleChange}
              value={this.state.email}
              fullWidth
            />
            <TextField
              className={classes.TextField}
              id="password"
              type="password"
              name="password"
              label="Senha"
              helperText={errors.password}
              error={errors.password ? true : false}
              onChange={this.handleChange}
              value={this.state.password}
              fullWidth
            />
            <TextField
              className={classes.TextField}
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              label="Confirmar Senha"
              helperText={errors.confirmPassword}
              error={errors.confirmPassword ? true : false}
              onChange={this.handleChange}
              value={this.state.confirmPassword}
              fullWidth
            />
            <TextField
              className={classes.TextField}
              id="handle"
              type="text"
              name="handle"
              label="Username"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              onChange={this.handleChange}
              value={this.state.handle}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              className={classes.Button}
              variant="contained"
              type="submit"
            >
              Cadastrar
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

signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  ui: state.ui
});

const mapActionsToProps = {
  signupUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(signup));
