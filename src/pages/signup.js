import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
//Redux Stuff
import { connect } from 'react-redux';  
import { signupUser } from '../redux/actions/userActions';

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
    }
  }
})(TextField);

const styles = {
  h1: {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 14
  },
  h2: {
    fontFamily: 'Roboto Condensed',
    fontWeight: 'bold',
    fontSize: 28,
    color: '#fff',
    marginLeft: 14
  },
  form: {
    textAlign: "center"
  },
  h3: {
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
    padding: 12 ,
    "&:hover": {
      background: "#00ff5b"
    }
  },
  paperForm: {
    padding: 20
  },
  loginDiv: {
    fontFamily: 'Roboto Condensed',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 26
  },
  fazerLogin: {
    color: '#fff'
  },
  Login: {
    color: '#f9f911', 
    textDecoration: 'none',
    '&:hover': {
      color: '#00ff5b'
    } 
  },
  paper: {
    padding: 20,
    color: '#fff',
    fontFamily: 'Roboto Condensed',
    textAlign: 'justify',
    lineHeight: '1.5'
  },
  color: {
    color: "#00ff5b"
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
      <Grid container spacing={3} className="container">
        <Grid item sm={6}>
          <Paper elevation={3} className="paperIntro">
            <h1 className={classes.h1}>Cadastrar</h1>
          </Paper>
          <Paper elevation={3} className={classes.paperForm}>
            <form
              noValidate
              onSubmit={this.handleSubmit}
              className={classes.form}
            >
              <CssTextField
                className={classes.TextField}
                id="name"
                type="text"
                name="name"
                label="Nome"
                helperText={errors.name}
                error={errors.name ? true : false}
                onChange={this.handleChange}
                value={this.state.name}
                variant="outlined"
                fullWidth
              />
              <CssTextField
                className={classes.TextField}
                id="email"
                type="email"
                name="email"
                label="Email"
                helperText={errors.email}
                error={errors.email ? true : false}
                onChange={this.handleChange}
                value={this.state.email}
                variant="outlined"
                fullWidth
              />
              <CssTextField
                className={classes.TextField}
                id="password"
                type="password"
                name="password"
                label="Senha"
                helperText={errors.password}
                error={errors.password ? true : false}
                onChange={this.handleChange}
                value={this.state.password}
                variant="outlined"
                fullWidth
              />
              <CssTextField
                className={classes.TextField}
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                label="Confirmar Senha"
                helperText={errors.confirmPassword}
                error={errors.confirmPassword ? true : false}
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                variant="outlined"
                fullWidth
              />
              <CssTextField
                className={classes.TextField}
                id="handle"
                type="text"
                name="handle"
                label="Username"
                helperText={errors.handle}
                error={errors.handle ? true : false}
                onChange={this.handleChange}
                value={this.state.handle}
                variant="outlined"
                fullWidth
              />
              {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                  {errors.general}
                </Typography>
              )}
              <Button
                className={classes.button}
                variant="contained"
                type="submit"
                fullWidth
              >
                Cadastrar
                {loading &&(
                  <CircularProgress className={classes.progress} />
                )}
              </Button>
              <div className={classes.loginDiv} >
              <span className={classes.fazerLogin} >Já tem cadastro? </span>
              <a className={classes.Login} href="/login">Login</a>
             </div>
            </form>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper elevation={3} className="paperIntro2">
            <h2 className={classes.h2}>O que é o Cartolol?</h2>
          </Paper>
          <Paper elevation={3} className={classes.paper}>
            O Cartolol é uma plataforma criada pelo grupo <strong className={classes.color}>Meta Esports</strong>.
            Nela, os membros podem escalar sua própria equipe para cada semana do CBLOL e concorrer a 
            <strong className={classes.color}> prêmios</strong> todo mês, tendo todos os jogadores participantes,
            que podem valorizar ou desvalorizar o preço a cada desempenho.
            <p>Por isso, é muito importante manter sua estratégia em dia para não ficar para trás. Convide seus amigos 
              e participem juntos da <strong className={classes.color}>liga nacional</strong> e também criem sua própria liga.
            </p>
          </Paper>
        </Grid>
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
