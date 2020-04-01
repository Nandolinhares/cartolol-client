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
import { Button, ListItemSecondaryAction } from '@material-ui/core';
//Redux Stuff
import { useDispatch } from 'react-redux';
import { removeUserFromLeague } from '../../redux/actions/leagueActions';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'rgb(245,245,245) !important'
    },
    infos: {
      
    },
    button: {
        marginLeft: 20
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
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
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
                                    <span>{friend.points}</span>     
                                </div> 
                        </ListItem> 
                    </List>
                </Grid>
                <Grid item sm={2}>
                    <Button variant="contained" color="secondary" onClick={() => handleDelete(friend.handle)} className={classes.button}>Remover</Button>
                </Grid>
           </Grid>
        </div>
    )
}
