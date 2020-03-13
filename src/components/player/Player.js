import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MUI Stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
//Redux Stuff
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

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
        backgroundColor: '#4caf50'
    }  
}

class Player extends Component {
    render() {
        const { classes, player: { name, position, team, price, imageUrl } } = this.props;
        return (
            <Box>
                <Paper className={classes.paper}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt={name} className="image-profile" />
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
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps)(withStyles(styles)(Player));
