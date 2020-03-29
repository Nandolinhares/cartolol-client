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
        backgroundColor: 'rgb(245,245,245) !important'
    }
});

export default function League(props) {
    const classes = useStyles();
    const friend = props.friend
    return (
        <div>
           <Grid container spacing={3}>
                <Grid item sm={2}></Grid>
                <Grid item sm={8}>
                    <List dense className={classes.root}>
                        <ListItem button component={Link} to={`/${friend.handle}`}>
                            <ListItemAvatar>
                            <Avatar
                                alt={`${friend.handle}`}
                                src={friend.imageUrl}
                            />
                            </ListItemAvatar>
                            <ListItemText  primary={friend.handle} />
                                <span>{friend.points}</span>  
                        </ListItem> 
                    </List>
                </Grid>
                <Grid item sm={2}></Grid>
           </Grid>
        </div>
    )
}
