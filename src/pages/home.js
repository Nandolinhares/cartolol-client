import React, { Component } from "react";
import PropTypes from 'prop-types';
import Profile from '../components/profile/Profile';
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
//Components
import Player from '../components/player/Player';
import Team from '../components/team/Team';
///Redux Stuff
import { connect } from 'react-redux';
import { getAllPlayers } from '../redux/actions/dataActions';
import { getUserTeam } from '../redux/actions/userActions';

const styles = {
	h3: {
		textAlign: 'center'
	}	
}

class home extends Component {

	componentDidMount(){
		this.props.getUserTeam();	
		this.props.getAllPlayers();
	}

    render() { 
      const { 
				classes,
				user: { 
						authenticated,
						userTeam
					},
				data: { players }
			} = this.props;
        return (
			<div>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={8}>
					<h2 className={classes.h2}>Meu time</h2>
					{authenticated ? (
						<Grid container spacing={2}>
							{userTeam.length > 0 ? (
								userTeam.map(myTeam => (
									<Grid key={myTeam.playerId} item>
										<Team team={myTeam} />
									</Grid>))
							) : <p>Você não tem jogadores</p>}
						</Grid>
						) : <h2>Criar conteúdo para quem não está logado</h2>}
					</Grid>
					<Grid item xs={12} sm={4}>
					<Profile />    
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item>
						<h3 className={classes.h3}>Mercado</h3>
						{authenticated ? (
							players.length > 0 ? (
							<Grid container spacing={2}>
								{players.map(player => (
								<Grid key={player.playerId} item>
									<Player player={player} />
								</Grid>))}	
							</Grid>
						) : <p>Não há jogadores</p>
							
						) : (<div>
							<p>Criar conteúdo pra quem não está logado</p>
						</div>)}
					</Grid>
				</Grid>
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
	getUserTeam
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
