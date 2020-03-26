import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
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
  forgotPassword: {
    margin: 8,
    textAlign: 'left',
    fontSize: 14
  },
  forgot: {
    color: "#f9f911",
    fontFamily: 'Roboto Condensed',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textDecoration: 'none',
    '&:hover': {
      color: '#00ff5b'
    }
  },
  password: {
    color: "#fff",
    fontFamily: 'Roboto Condensed',
    textTransform: 'uppercase'
  },
  signup: {
    fontFamily: 'Roboto Condensed',
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: -26
  },
  facaSeu: {
    color: '#fff'
  },
  cadastro: {
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
      <Grid container spacing={3}>
        <Grid item sm={6}>
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
             <div className={classes.forgotPassword}>
              <a className={classes.forgot} href="/resetPassword">Recuperar </a>
              <span className={classes.password}>Senha</span>
             </div> 
             <div className={classes.signup}>
              <span className={classes.facaSeu}>Faça seu </span>
              <a className={classes.cadastro} href="/signup">Cadastro</a>
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
