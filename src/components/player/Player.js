import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
//MUI Stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
//Redux Stuff
import { connect } from 'react-redux';
import { updatePlayerImage } from '../../redux/actions/dataActions';

const styles = {
    paper: {
        padding: 20,
        width:200,
        height: 280,   
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
        color: '#fff',
        backgroundColor: '#4caf50',
        '&:hover': {
            backgroundColor: '#388e3c'
        }
    }  
}

class Player extends Component {

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

    render() {
        const { classes, credentials: { administrator }, data: { loading }, player: { name, position, team, price, imageUrl } } = this.props; //player que vem da props da home
        return (
            <Box>
                <Paper className={classes.paper}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt={name} className="image-profile"/> 
                        <input 
                            type="file"
                            id={name}
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />
                        {administrator ? 
                        <Tooltip title="Alterar foto do jogador">
                            <IconButton onClick={() => this.handleEditPicture(name)} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip> : <div></div>}
                    </div> 
                    <div className="profile-details">
                        <span className="price">R$ {price}</span>
                        <hr/>
                        <span className="name">{name}</span>
                        <hr/>
                        <span className="position">{position}</span>
                        <hr/>
                        <span>{team}</span>
                        <hr/>
                        <Button variant="contained" color="inherit" className={classes.button}>Comprar</Button>
                    </div>
                </Paper>
            </Box>
        )
    }
}

Player.propTypes ={
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    updatePlayerImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    data: state.data
});

const mapActionToProps = {
    updatePlayerImage
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Player));
