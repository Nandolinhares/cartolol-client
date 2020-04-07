import React from 'react';
//MUI Stuff
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
//Icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';


const useStyles = makeStyles({
    root: {
        backgroundColor: '#303030',
        marginTop: 20
    },
    h2: {
        fontFamily: 'Roboto Condensed',
        fontStyle: 'italic',
        color: '#fff'
    },
    p: {
        fontFamily: 'Roboto Condensed',
        fontStyle: 'italic',
        color: '#fff',
        marginTop: -20
    },
    iconsImage: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    facebookName: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default function Footer() {
    const classes = useStyles();
    return (
        <Grid container spacing={2} className={classes.root}>
            <Grid item sm={4}>
                <Grid container spacing={2}>
                    <Grid item sm={2} className={classes.iconsImage}>
                        <FacebookIcon style={{ fontSize: 30 }} className="individualIcon" />
                    </Grid>
                    <Grid item sm={4} className={classes.facebookName}>
                        <h2 className={classes.h2}>Facebook</h2>
                        <p className={classes.p}>@metaesportsbr</p> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={4} className={classes.iconsImage}>
                <Grid container spacing={2}>
                    <Grid item sm={2} className={classes.iconsImage}>
                        <TwitterIcon style={{ fontSize: 30 }} className="individualIcon" />
                    </Grid>
                    <Grid item sm={4} className={classes.facebookName}>
                        <h2 className={classes.h2}>Twitter</h2>
                        <p className={classes.p}>@metaesportsbr</p> 
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sm={4} className={classes.iconsImage}>
                <Grid container spacing={2}>
                    <Grid item sm={2} className={classes.iconsImage}>
                        <InstagramIcon style={{ fontSize: 30 }} className="individualIcon" />
                    </Grid>
                    <Grid item sm={4} className={classes.facebookName}>
                        <h2 className={classes.h2}>Instagram</h2>
                        <p className={classes.p}>@metaesportsbr</p> 
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
