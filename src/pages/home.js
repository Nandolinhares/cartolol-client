import React, { Component } from "react";
import PropTypes from 'prop-types';
import Profile from '../components/profile/Profile';
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
//Components
import Player from '../components/player/Player';
import Team from '../components/team/Team';
import Users from '../components/users/Users';
///Redux Stuff
import { connect } from 'react-redux';
import { getAllPlayers } from '../redux/actions/dataActions';
import { getUserTeam, getUserByPoints } from '../redux/actions/userActions';

const styles = {
	h3: {
		marginLeft: '14px'
	}
}

class home extends Component {

	componentDidMount(){
		this.props.getUserTeam();	
		this.props.getAllPlayers();
		this.props.getUserByPoints();
	}

    render() { 
      const { 
				classes,
				user: { 
						authenticated,
						userTeam,
						users
					},
				data: { players },
				ui: { loading }
			} = this.props;
        return (
			<div>
				{!loading ? (
					authenticated && (
						/*Primeira parte */
					<Grid container spacing={3}>
						<Grid item xs={12} sm={9}>
							<Paper elevation={3} className="paperIntro">
								<h2 className="h2">Meu time</h2>
							</Paper>
							<Grid container spacing={2}>
								{userTeam.length > 0 ? (
									userTeam.map(myTeam => (
										<Grid key={myTeam.playerId} item>
											<Team team={myTeam} />
										</Grid>))
								) : <p>Você não tem jogadores</p>}
							</Grid>
						</Grid>
						<Grid item xs={12} sm={3}>
							<Profile />    
						</Grid>
					</Grid>)
				) : <CircularProgress />}
				{!loading ? (
					authenticated && (
						/* Mercado */
					<Grid container spacing={3}>
					<Grid item>
						<Paper elevation={3} className="paperIntro">
							<h3 className={classes.h3} id="mercado" >Mercado</h3>
						</Paper>
						{players.length > 0 ? (
							<Grid container spacing={2}>
								{players.map(player => (
								<Grid key={player.playerId} item>
									<Player player={player} />
								</Grid>))}	
							</Grid>
						) : <p>Não há jogadores</p>}
					</Grid>
				</Grid>
					)
				) : <CircularProgress />}
			{!loading ? (
				authenticated === false && (
					<Grid container spacing={3}>
						<Grid item xs={12} sm={4}>
							{users.length > 0 ? (
								users.map(user => (
									<Grid key={user.userId}>
										<Users user={user} />
									</Grid>
								))
							) : (<p>Não há jogadores com pontuações</p>)}	
						</Grid>
					</Grid>
				)
			) : <CircularProgress />}

			</div>	
        )
    }
}

home.propTypes = {
	classes: PropTypes.object.isRequired,
  	user: PropTypes.object.isRequired,
  	data: PropTypes.object.isRequired,
	getAllPlayers: PropTypes.func.isRequired,
	getUserTeam: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user,
  data: state.data,
  ui: state.ui
});

const mapActionsToProps = {
	getAllPlayers,
	getUserTeam,
	getUserByPoints
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
