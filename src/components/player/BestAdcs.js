import React from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//Redux Stuff
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
    paper: {
        padding: 20,
        width:120,
        height: 220,
        marginLeft: 4,   
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
    }  
});

export default function BestAdcs() {
    const classes = useStyles();
    const { bestAdcs } = useSelector(state => state.data);

    return (
        <div>
            {bestAdcs.map(adc => (
                <Paper key={adc.playerId} className={classes.paper}>
                    <div className="image-wrapper">
                        <img src={adc.imageUrl} alt={adc.name} className="image-profile"/>     
                    </div> 
                    <div className="profile-details">
                        <span className="price">R$ {adc.price}</span>
                        <hr/>
                        <p className={classes.name}>{adc.name}</p>
                        <p className="position">{adc.position}</p>
                        <hr/>
                        <span>{adc.team}</span>
                        <hr/>
                        <h2 className={classes.points}>+{adc.points}</h2>
                    </div> 
                </Paper>
            ))}
        </div>
    )
}
