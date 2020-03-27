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
        backgroundColor: 'rgb(245,245,245) !important'
    }
});

//Lista de jogadores com mais pontos, limitado a 10
export default function Users(props) {
    const classes = useStyles();
    const user = props.user;
    return (
        <List dense className={classes.root}>
          <ListItem button component={Link} to={`/users/${user.handle}`}>
            <ListItemAvatar>
              <Avatar
                alt={`${user.name}`}
                src={user.imageUrl}
              />
            </ListItemAvatar>
            <ListItemText  primary={user.name} />
                <span>{user.points}</span>  
          </ListItem> 
         </List>
    )
}
