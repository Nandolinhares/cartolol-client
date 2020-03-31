import React, { useEffect, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
//Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
//Redux Stuff
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile } from '../../redux/actions/userActions';

const useStyles = makeStyles({
    paper: {
        padding: 20,
        marginTop: 14
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& .button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 100,
            height: 100,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            fontSize: '12px',
            color: '#fff',
            '& .span, svg': {
                verticalAlign: 'middle'        
            },
            '& .muiColor': {
                color: '#fff'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        }
    },
    points: {
        fontWeight: 'bold',
        color: "#f9f911",
        fontFamily: 'Roboto condensed, san-serif',
        fontSize: 25
    }    
});

export default function PublicProfile(props) {
    const classes = useStyles();
    const { user } = useSelector(state => state.user);
    const { loading } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    dayjs.extend(relativeTime);
    dayjs.locale('pt-br')

    const handle = props.handle;

    useEffect(() => {
        dispatch(getUserProfile(handle));
    }, [dispatch, handle])

    return (
        <div>
            <Paper className={classes.paper}>
                {user.map(u => (
                    <div className={classes.profile}>
                        <div className="image-wrapper">
                            <div>
                                <img src={u.imageUrl} alt="Imagem de Perfil" className="profile-image" />
                            </div>
                        </div>
                        <hr/>
                        <div className="profile-details">
                            <h2>{u.name}</h2>
                            <h3>{u.handle}</h3>
                            <hr/>
                            <CalendarToday className="iconesProfile" /> {' '}
                            <span>Membro {dayjs(u.createdAt).fromNow()}</span>
                        <hr />
                        <h3>Pontuação Total</h3>
                        <h2 className={classes.points}>{u.points}</h2>
                        </div>
                    </div>
                ))}
            </Paper>
        </div>
    )
}
