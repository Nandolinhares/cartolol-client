import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//MUI Stuff
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//Redux Stuff
import { createPlayer } from '../../redux/actions/dataActions';
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
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#00ff5b',
        }
      },
    },
  })(TextField);

const styles = {
    paper: {
        padding: 20
    },
    form: {
        textAlign: 'center'
    },
    h3: {
        textAlign: 'center',
        color: '#fff'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button:{
        marginTop: 20,
        backgroundColor: '#ffb74d',
        color: '#fff',
        fontWeight: 'bold',
        "&:hover": {
            background: "#ff9800"
          }
    }
}

export class addPlayer extends Component {

    state = {
        name: "",
        position: "",
        team: "",
        price: 0
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const playerData = {
            name: this.state.name,
            position: this.state.position,
            team: this.state.team,
            price: Number(this.state.price)
        }

        this.props.createPlayer(playerData);
    }

    render() {
        const { classes, ui: { errors } } = this.props;
        return (
            <div>
                <Paper className={classes.paper}>
                <h3 className={classes.h3}>Cadastrar Jogador</h3>
                <form noValidate className={classes.form} onSubmit={this.handleSubmit}>
                    <CssTextField 
                        type="text"
                        id="name"
                        name="name"
                        label="Nome"
                        helperText={errors.name}
                        error={errors.name ? true : false}
                        className={classes.textField}
                        color="#00ff5b"
                        onChange={this.handleChange}
                        value={this.state.name}
                        fullWidth
                    />
                    <CssTextField 
                        type="text"
                        id="position"
                        name="position"
                        label="Rota"
                        helperText={errors.position}
                        error={errors.position ? true : false}
                        placeholder="Top, JG, Mid, Adc ou Sup"
                        className={classes.textField}
                        onChange={this.handleChange}
                        value={this.state.position}
                        fullWidth
                    />
                    <CssTextField 
                        type="Text"
                        id="team"
                        name="team"
                        label="Time"
                        helperText={errors.team}
                        error={errors.team ? true : false}
                        className={classes.textField}
                        onChange={this.handleChange}
                        value={this.state.team}
                        fullWidth
                    />
                    <CssTextField 
                        type="number"
                        id="price"
                        name="price"
                        label="Preço em Lolzetas"
                        helperText={errors.price}
                        error={errors.price ? true : false}
                        placeholder="100, 200, 400, 800"
                        className={classes.textField}
                        onChange={this.handleChange}
                        value={this.state.price}
                        fullWidth
                    />
                    <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        className={classes.button}>
                            Cadastrar
                    </Button>
                        {errors ? (<h4>{errors.message}</h4>) : (<hr />)}
                </form>
                </Paper>
            </div>
        )
    }
}

addPlayer.propTypes = {
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
});

const mapActionsToProps = {
    createPlayer
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(addPlayer));
