import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MuiLink from '@material-ui/core/Link';
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
        width:120,
        height: 200,   
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

class publicTeam extends Component {

    render() {
        const { classes, player: { name, position, team, price, imageUrl, points } } = this.props; //player que vem da props da home
        return (
            <Box className={classes.box}>
                <Paper className={classes.paper}>
                    <div className="image-wrapper">
                        <MuiLink component={Link} to={`/players/${name}`} variant="subtitle1" >
                            <img src={imageUrl} alt={name} className="image-profile"/>     
                        </MuiLink> 
                    </div> 
                    <div className="profile-details">
                        <span className="price">R$ {price}</span>
                        <hr/>
                        <div>
                            <span className={classes.name}>{name}</span> <p></p>
                        </div>
                        <hr/>
                        <span className="position">{position}</span>
                        <hr/>
                        <span>{team}</span>
                        <hr/>   
                        <hr/>
                        <h2 className={classes.points}>+{points}</h2>
                    </div> 
                </Paper>
            </Box>
        )
    }
}

export default (withStyles(styles)(publicTeam));
