import React from 'react';
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

export default function RankingTeams(props) {
    const classes = useStyles();
    const team = props.team;
    return (
        <div>
            <List dense className={classes.root}>
                <ListItem button>
                    <span className={classes.index}>{props.index + 1} &nbsp; &nbsp;</span>
                    <ListItemAvatar>
                    <Avatar
                        alt={`${team.name}`}
                        src={team.imageUrl}
                    />
                    </ListItemAvatar>
                    <ListItemText  primary={team.name} />
                        <span className={classes.points}>{team.wins} - {team.defeats}</span>  
                </ListItem> 
            </List>
        </div>
    )
}
