import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

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

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/login", userData)
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.token}`;
        //this.props.history.push('/');
        window.location.reload(false);
      })
      .catch(err => {
        this.setState({
          errors: err.response.data
        });
      });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;
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
            </Button>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(login);
