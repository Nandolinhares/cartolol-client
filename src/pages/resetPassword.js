import React, { useState } from 'react';
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { resetUserPassword } from '../redux/actions/userActions';

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

  const useStyles = makeStyles({
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
        padding: 12 ,
        "&:hover": {
          background: "#00ff5b"
        }
      },
      paperForm: {
        padding: 20
      }
  })

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ResetPassword() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);

  const { errors, messages, loading } = useSelector(state => state.ui);
  const dispatch = useDispatch();

  const handleMessageOpen = () => {
    setOpen(true);
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const emailToSend = {
      email
    }
    dispatch(resetUserPassword(emailToSend));
    handleMessageOpen();
  }

  const handleChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
      <div className="container">
        <Grid container>
          <Grid item sm={5}>
            <Paper elevation={3} className="paperIntro">
              <h1 className={classes.h1}>Recuperar senha</h1>
            </Paper>
            <Paper elevation={3} className={classes.paperForm}>
              <form
                noValidate
                onSubmit={handleSubmit}
                className={classes.form}
              >
                <CssTextField
                  id="email"
                  type="email"
                  name="email"
                  label="Email"
                  helperText={errors.email}         
                  error={errors.email ? true : false}
                  onChange={handleChange}
                  value={email}
                  className={classes.TextField}
                  variant="outlined"  
                  fullWidth
                />

                <Button
                  type="submit"
                  variant="contained"
                  className={classes.button}
                  fullWidth
                >
                  Enviar
                  {loading &&(
                    <CircularProgress className={classes.progress} />
                  )}
                </Button>
              </form>
            </Paper>
            {errors.message && (
              <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                  {errors.message}
                </Alert>
              </Snackbar>
            )} 
            {messages.message ? (
              <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                  {messages.message}
                </Alert>
              </Snackbar>
            ) : <div></div>}       
          </Grid>
          <Grid item sm>
            
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </div>
    )
}

export default ResetPassword;
