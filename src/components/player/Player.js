import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
import EditPlayer from './EditPlayer';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
//MUI Stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
//Redux Stuff
import { connect } from 'react-redux';
import { updatePlayerImage } from '../../redux/actions/dataActions';
import { buyPlayer } from '../../redux/actions/userActions';

const styles = {
    box: {
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
        padding: 20,
        width:120,
        height: 240,   
        '& .image-profile':{
            width: 50,
            height: 50,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .image-wrapper':{
            textAlign: 'center',
            position: 'relative',
            '& .button': {
                position: 'absolute',
                top: '52%',
                left: '70%'
            }
        },
        '& .profile-details': {
            marginTop: 10,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto Condensed',
            color: "#fff" ,
            '& .span, svg': {
                verticalAlign: 'middle'        
            },
            '& hr': {
                border: 'none',
                //margin: '0 0 10px 0'
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
    Mui: {
        textDecoration: 'none !important',
        color: "#000",
        fontWeight: 'bold' 
    },
    button: {
        color: '#fff',
        backgroundColor: '#4caf50',
        '&:hover': {
            backgroundColor: '#388e3c'
        },
        fontSize: 10,
    },
    points: {
        color: "#f9f911",
        fontWeight: 'bold',
        fontSize: 30,
        margin: 0,
        textAlign: 'center'
    },
    name: {
        fontWeight: 'bold'
    }  
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Player extends Component {

    state = {
        open: false
    }

    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        const { player: { name } } = this.props;
        this.props.updatePlayerImage(formData, name);
    }

    handleEditPicture = (name) => {
        const fileInput = document.getElementById(name);
        fileInput.click();
    }

    //Comprar um player
    handleBuyPlayer = (name) => {
        this.props.buyPlayer(name);
        this.setState({ open: true })
    }

    //Fechar notificação
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({ open: false })
      };

    render() {
        const { classes, credentials: { administrator }, player: { name, position, team, price, imageUrl, points }, ui: { errors, messages } } = this.props; //player que vem da props da home
        return (
            <Box className={classes.box}>
                <Paper className={classes.paper}>
                    <div className="image-wrapper">
                        <MuiLink component={Link} to={`/players/${name}`} variant="subtitle1" >
                            <img src={imageUrl} alt={name} className="image-profile"/>     
                        </MuiLink> 
                        <input 
                            type="file"
                            id={name}
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />
                        {administrator ? 
                        <Tooltip title="Alterar foto do jogador">
                            <IconButton onClick={() => this.handleEditPicture(name)} className="button">
                                <EditIcon className="editIcon" />
                            </IconButton>
                        </Tooltip> : <div></div>}
                    </div> 
                    <div className="profile-details">
                        <span className="price">R$ {price}</span>
                        <hr/>
                        {administrator ? 
                            <EditPlayer player={this.props.player} /> :
                            <div>
                                <span className={classes.name}>{name}</span> <p></p>
                            </div>
                        }
                        <hr/>
                        <span className="position">{position}</span>
                        <hr/>
                        <span>{team}</span>
                        <hr/>
                        <Button variant="contained" color="inherit" className={classes.button} onClick={() => this.handleBuyPlayer(name)}>Comprar</Button>   
                        <hr/>
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

Player.propTypes ={
    classes: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    updatePlayerImage: PropTypes.func.isRequired,
    buyPlayer: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    data: state.data,
    ui: state.ui
});

const mapActionToProps = {
    updatePlayerImage,
    buyPlayer
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Player));
