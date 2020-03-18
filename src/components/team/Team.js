import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MUI Stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';

const styles = {
    box: {
        display: 'flex',
        alignItems: 'center'
    },
    paper: {
        padding: 20,
        width:200,
        height: 310,   
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
    }
}

export class Team extends Component {
    render() {
        const { classes, team: { name, position, price, imageUrl, team } } = this.props;
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
                    </div>
                </Paper>
            </Box>
        )
    }
}

Team.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Team);
