import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = {
    form: {
        textAlign: 'center'
    },
    TextField: {
        margin: '10px auto 10px auto'
    },
    Button: {
        marginTop: 20,
        position: 'relative',
        backgroundColor: '#ffb74d',
        color: '#fff',
        fontWeight: 'bold',
        '&:hover': {
            background: "#ff9800",
         },
    }
}

export class signup extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Grid container>
                <Grid item sm></Grid>
                <Grid item sm>
                    <form noValidate className={classes.form}>
                        <TextField 
                            className={classes.TextField}
                            id="name"
                            type="text"
                            name="name"
                            label="Nome"
                            fullWidth
                        />
                        <TextField 
                            className={classes.TextField}
                            id="email"
                            type="email"
                            name="email"
                            label="Email"
                            fullWidth
                        />
                        <TextField 
                            className={classes.TextField}
                            id="password"
                            type="password"
                            name="password"
                            label="Senha"
                            fullWidth
                        />
                        <TextField 
                            className={classes.TextField}
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            label="Confirmar Senha"
                            fullWidth
                        />
                        <TextField 
                            className={classes.TextField}
                            id="handle"
                            type="text"
                            name="handle"
                            label="Username"
                            fullWidth
                        />
                        <Button 
                            className={classes.Button}
                            variant="contained" 
                            type="submit"     
                        >Cadastrar</Button>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(signup);
