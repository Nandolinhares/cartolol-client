import React from 'react';
import { Link } from 'react-router-dom';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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
    }
});

//Lista de jogadores com mais pontos, limitado a 10
export default function Users(props) {
    const classes = useStyles();
    const user = props.user;
    return (
        <List dense className={classes.root}>
          <ListItem button component={Link} to={`/users/${user.handle}`}>
            <span className={classes.index}>{props.index + 1} &nbsp; &nbsp;</span>
            <ListItemAvatar>
              <Avatar
                alt={`${user.name}`}
                src={user.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText  primary={user.name} />
                <span className={classes.points}>{user.points}</span>  
          </ListItem> 
         </List>
    )
}
