import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

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
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        loading: false,
        errors: {}
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        })

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        axios.post('/signup', newUser)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                this.setState({
                    loading: false
                })
                this.props.history.push('/');
                console.log(res.data.token)
            })
            .catch(err => {
                this.setState({
                    errors: err.response.data,
                    loading: false
                })
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <Grid container>
                <Grid item sm></Grid>
                <Grid item sm>
                    <form noValidate onSubmit={this.handleSubmit} className={classes.form}>
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
                        {errors.general &&(
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
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
