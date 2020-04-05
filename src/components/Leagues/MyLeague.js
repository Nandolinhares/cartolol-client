import React from 'react';
import { Link } from 'react-router-dom';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
//Icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
//Redux Stuff
import { useDispatch } from 'react-redux';
import { removeUserFromLeague } from '../../redux/actions/leagueActions';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'transparent !important',
        color: '#fff'
    },
    points: {
        color: '#f9f911',
        fontFamily: 'Roboto Condensed',
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        marginLeft: 20,
        marginTop: 5
    }
});

export default function MyLeague(props) {
    const classes = useStyles();
    const friend = props.friend;
    const league = props.league;
    const dispatch = useDispatch();

    const handleDelete = (handle) => {
        dispatch(removeUserFromLeague(league.name, handle));
    }

    return (
        <div>
           <Grid container spacing={3}>
                <Grid item xs={1} sm={2}></Grid>
                <Grid item xs={8} sm={8}>
                    <List dense className={classes.root}>
                        <ListItem button component={Link} to={`/users/${friend.handle}`}>
                            <ListItemAvatar>
                            <Avatar
                                alt={`${friend.handle}`}
                                src={friend.imageUrl}
                            />
                            </ListItemAvatar>
                            <ListItemText  primary={friend.handle} />
                                <div className={classes.infos}>
                                    <span className={classes.points}>{friend.points}</span>     
                                </div> 
                        </ListItem> 
                    </List>
                </Grid>
                <Grid item xs={3} sm={2}>
                    <Tooltip title="Remover amigo" placement="top">
                        <IconButton color="secondary" onClick={() => handleDelete(friend.handle)} className={classes.button}>
                            <RemoveCircleIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
           </Grid>
        </div>
    )
}
