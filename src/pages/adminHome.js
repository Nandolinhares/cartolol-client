import React, { Component } from 'react';
import PropTypes from 'prop-types';
//MUI Stuff
import Grid from '@material-ui/core/Grid';
//Redux Stuff
import { connect } from 'react-redux';


//Components
import AddPlayer from '../components/player/AddPlayer';
import PlayerPoints from '../components/points/PlayerPoints';
import ResetPoints from '../components/points/ResetPoints';

export class adminHome extends Component {
    render() {
        const { 
                user: { 
                    credentials: { 
                        administrator 
                    } 
                } 
            } = this.props;

        let adminProfile = administrator ? (
            <div className="container">
                <Grid container spacing={3} className="marginComponents">
                    <Grid item sm>
                        <ResetPoints />
                    </Grid>
                    <Grid item sm>
                        <AddPlayer />
                    </Grid>
                    <Grid item sm>
                        <PlayerPoints />
                    </Grid>
                </Grid>
            </div>
        ) : (
            <div>
                <h2>Você não tem permissão</h2>
            </div>
        )

        return adminProfile;
    }
}

adminHome.propTypes ={
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

export default connect(mapStateToProps)(adminHome);
