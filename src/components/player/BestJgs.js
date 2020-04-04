import React from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//Redux Stuff
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
    paper: {
        padding: 20,
        width:120,
        height: 220,
        marginLeft: 14,   
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
    points: {
        color: "#f9f911",
        fontWeight: 'bold',
        fontSize: 30,
        margin: 0,
        textAlign: 'center'
    },
    name: {
        fontWeight: 'bold'
    },
    [theme.breakpoints.down('sm')]: {
        paper: {
            width: 68,
            height: 150,
            marginLeft: 8,
            marginTop: 10,
            '& .image-profile':{
                width: 26,
                height: 26,
            },
            '& .profile-details': {
                fontSize: 10,
            }
        },
        points: {
            fontSize: 18
        }
    },       
}));

export default function BestJgs() {
    const classes = useStyles();
    const { bestJgs } = useSelector(state => state.data);

    return (
        <div>
            {bestJgs.map(jg => (
                <Paper key={jg.playerId} className={classes.paper}>
                    <div className="image-wrapper">
                        <img src={jg.imageUrl} alt={jg.name} className="image-profile"/>     
                    </div> 
                    <div className="profile-details">
                        <span className="price">R$ {jg.price}</span>
                        <hr/>
                        <p className={classes.name}>{jg.name}</p>
                        <p className="position">{jg.position}</p>
                        <hr/>
                        <span>{jg.team}</span>
                        <hr/>
                        <h2 className={classes.points}>+{jg.points}</h2>
                    </div> 
                </Paper>
            ))}
        </div>
    )
}
