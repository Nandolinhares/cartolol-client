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
    leagueWidthh: {
        width: '100%'
    }
});

export default function League(props) {
    const classes = useStyles();
    const friend = props.friend;
    const index = props.index;
    return (
        <div>
           <Grid container spacing={3}>
                <Grid item sm={12} className={classes.leagueWidthh}>
                    <List dense className={classes.root}>
                        <ListItem button component={Link} to={`/users/${friend.handle}`}>
                            <span className={classes.index}>{index + 1} &nbsp; &nbsp;</span>
                            <ListItemAvatar>
                                <Avatar
                                    alt={`${friend.handle}`}
                                    src={friend.imageUrl}
                                />
                            </ListItemAvatar>
                            <ListItemText  primary={friend.handle} />
                                <span className={classes.points}>{friend.points}</span>  
                        </ListItem> 
                    </List>
                </Grid>
           </Grid>
        </div>
    )
}
