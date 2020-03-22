import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MUI Stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//Redux Stuff
import { connect } from 'react-redux';
import { removePlayerFromUserTeam } from '../../redux/actions/userActions';

const styles = {
    box: {
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
        padding: 20,
        width:200,
        height: 380,   
        '& .image-profile':{
            width: 100,
            height: 100,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .image-wrapper':{
            textAlign: 'center',
            position: 'relative',
            '& .button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-details': {
            marginTop: 20,
            textAlign: 'center',
            '& .span, svg': {
                verticalAlign: 'middle'        
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& .price': {
                color: '#4caf50',
                fontWeight: 'bold'
            },
            '& .name': {
                fontWeight: 'bold'
            },
            '& .position': {
                fontStyle: 'italic',
            }
        } 
    },
    button: {
        backgroundColor: '#d32f2f',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#ba2020'
        }
    },
    points: {
        color: "#037ffc",
        fontWeight: 'bold',
        marginTop: 20,
        fontSize: 40,
        margin: 0,
        textAlign: 'center'
    } 
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export class Team extends Component {

    state = {
        open: false
    }

    //Remover player
    removePlayer = (playerName) => {
        this.props.removePlayerFromUserTeam(playerName);
        this.setState({ open: true })
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false })
      };

    render() {
        const { classes, team: { name, position, price, imageUrl, team, points }, ui: { errors, messages }  } = this.props;
        return (
            <Box className={classes.box}>
                <Paper className={classes.paper}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt={name} className="image-profile"/>          
                    </div> 
                    <div className="profile-details">
                        <span className="price">R$ {price}</span>
                        <hr/>
                        <span>{name}</span>
                        <hr/>
                        <span className="position">{position}</span>
                        <hr/>
                        <span>{team}</span>
                        <hr/>
                        <Button variant="contained" className={classes.button} onClick={() => this.removePlayer(name)}>Remover</Button>
                        <h2 className={classes.points}>+{points}</h2>
                        {errors.message ? 
                        <Snackbar open={this.state.open} autoHideDuration={3500} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="error">
                                {errors.message}
                            </Alert>
                        </Snackbar> : messages.message ? <Snackbar open={this.state.open} autoHideDuration={3500} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="success">
                                {messages.message}
                            </Alert>
                        </Snackbar> : <div></div> }
                    </div>
                </Paper>
            </Box>
        )
    }
}

Team.propTypes = {
    classes: PropTypes.object.isRequired,
    removePlayerFromUserTeam: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    ui: state.ui
});

const mapActionsToProps = {
    removePlayerFromUserTeam
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Team));
