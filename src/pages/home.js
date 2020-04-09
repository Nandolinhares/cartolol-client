import React, { Component } from "react";
import PropTypes from 'prop-types';
import Profile from '../components/profile/Profile';
//MUI Stuff
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
//Components
import Player from '../components/player/Player';
import Team from '../components/team/Team';
import Users from '../components/users/Users';
import BestSups from '../components/player/BestSups';
import BestAdcs from '../components/player/BestAdcs';
import BestMids from '../components/player/BestMids';
import BestJgs from '../components/player/BestJgs';
import BestTops from '../components/player/BestTops';
import RankingTeams from '../components/team/RankingTeams';
//Images
import Banner from '../images/BannerSite.jpg';
import Pain from '../images/pain.png';
import Prodigy from '../images/prodigy.png';
import VKD from '../images/vivoKeyd.png';
import Redemption from '../images/redemption.png';
import INTZ from '../images/intz.png';
import Furia from '../images/furia.png';
import Flamengo from '../images/flamengo.png';
import Kabum from '../images/kabum.png';
///Redux Stuff
import { connect } from 'react-redux';
import { getAllPlayers, getSups, getAdcs, getJgs, getMids, getTops, getTeamsByPoints } from '../redux/actions/dataActions';
import { getUserTeam, getUserByPoints } from '../redux/actions/userActions';

const styles = theme => ({
	h3: {
		marginLeft: '14px'
	},
	bestPlayers: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		zIndex: 2
	},
	bestOfWeek: {
		textAlign: 'center',
		fontFamily: 'Roboto Condensed',
		color: '#fff'
	},
	paperUsers: {
		padding: 20
	},
	paperRanking: {
		padding: 10
	},
	rankingName: {
		textAlign: 'center',
		color: '#fff'
	},
	firstPart: {
		marginTop: '4px'
	},
	bannerGrid: {
		padding: '0px !important'
	},
	banner: {
		width: '100%',
	},
	loading: {
		margin: '0 auto',
		display: 'table'
	},
	teamsImages: {
		width: 30,
		borderRadius: 18
	},
	teamsName: {
		fontFamily: 'Roboto Condensed',
		fontWeight: 'bold'
	},
	table: {
		marginTop: '-14px'
	},
	hourLeague: {
		fontFamily: 'Roboto Condensed',
		fontWeight: 'bold'
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	}
});

class home extends Component {

	state = {
		open: false
	}

	handleClose = () => {
		this.setState({
			open: false
		});
	};

	handleToggle = () => {
		this.setState({
			open: true
		})
	};

	componentDidMount(){
		this.props.getUserTeam();	
		this.props.getAllPlayers();
		this.props.getUserByPoints();
		this.props.getSups();
		this.props.getAdcs();
		this.props.getMids();
		this.props.getJgs();
		this.props.getTops();
		this.props.getTeamsByPoints();
	}

    render() { 
      const { 
				classes,
				user: { 
						authenticated,
						userTeam,
						users,
						loadingPoints,
						loadingUserTeam,
						loading
					},
				data: { players, loadingPlayers, loadingRankingTeams, teams }
			} = this.props;
        return (
			<div>
				<section className="container">
						{/* Autenticated */}

					{loading && (
						<Backdrop className={classes.backdrop} open={this.state.open} onClick={this.handleClose}>
							<CircularProgress color="inherit" />
					  	</Backdrop>
					)}

					{!loadingUserTeam ? (
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
					) : <div className={classes.loading}><CircularProgress /></div>}
					{!loadingPlayers ? (
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
				</section>

				{/* Não autenticado */}
				{authenticated === false && (
					<div>
						
							
						
						<Grid container spacing={3}>
							<Grid item xs={12} sm={12} className={classes.bannerGrid}>
								<img src={Banner} alt="banner site" className={classes.banner} />
							</Grid>
						</Grid>
						<Grid container className={classes.table}>
								<Grid item xs={3} sm={3}>
									<p className={classes.hourLeague}>13:00</p>
									<span><p><img src={Prodigy} alt="PRG" className={classes.teamsImages} /> <span className={classes.teamsName}>PRG</span></p></span>
									<span><p><img src={Pain} alt="Paing Gaming" className={classes.teamsImages} /> <span className={classes.teamsName}>PNG</span></p></span>
								</Grid>
								<Grid item xs={3} sm={3}>
									<p className={classes.hourLeague}>14:00</p>
									<p><img src={VKD} alt="VivoKeyd" className={classes.teamsImages} /> <span className={classes.teamsName}>VKD</span></p>
									<p><img src={Redemption} alt="Redemption" className={classes.teamsImages} /> <span className={classes.teamsName}>RDP</span></p>
								</Grid>
								<Grid item xs={3} sm={3}>
									<p className={classes.hourLeague}>15:00</p>
									<p><img src={INTZ} alt="INTZ" className={classes.teamsImages} /> <span className={classes.teamsName}>ITZ</span></p>
									<p><img src={Furia} alt="Furia" className={classes.teamsImages} /> <span className={classes.teamsName}>FUR</span></p>
								</Grid>
								<Grid item xs={3} sm={3}>
									<p className={classes.hourLeague}>16:00</p>
									<p><img src={Flamengo} alt="Flamengo" className={classes.teamsImages} /> <span className={classes.teamsName}>FLA</span></p>
									<p><img src={Kabum} alt="Kabum" className={classes.teamsImages} /> <span className={classes.teamsName}>KBM</span></p>
								</Grid>
							</Grid>
						<section>
							<Grid container spacing={3} className="containerAfterBanner">
							
								<Grid item sm={12} className="containerAfterBannerRanking"><h2 className={classes.bestOfWeek}>Destaques da Semana</h2></Grid>
								<Grid item sm={12} md={12} lg={12} className={classes.bestPlayers}>
									<BestSups />	
									<BestAdcs />
									<BestMids />
									<BestJgs />
									<BestTops />			
								</Grid>
								
								<Grid container spacing={3} className="container">
									<Grid item sm={4} className="containerAfterBannerRanking">
										{/* Classificação dos melhores membros */}
										{!loadingPoints ? (					
											<div className="containerAfterBannerBeforeRanking">
												{users.length > 0 ? (
												<Paper elevation={3} className={classes.paperUsers}>
													<h5 className={classes.rankingName}>Ranking de membros</h5>
													{users.map((user, index) => (
														<Grid key={user.userId}>
															<Users user={user} index={index} />
														</Grid> 
													))}
												</Paper>
											) : (<p>Não há jogadores com pontuações</p>)}	
											</div>	
										) : <div className={classes.loading}><CircularProgress /></div>}
									</Grid>
									{!loadingRankingTeams ? (
										<Grid item sm={4} className="containerAfterBannerTeams">
											{teams.length > 0 && (
												<Paper elevation={3} className={classes.paperRanking}>
													<h5 className={classes.rankingName}>CBLOL - 2020</h5>
													{teams.map((team, index) => (
														<div key={Math.random() * 10000}>
															<RankingTeams team={team} index={index} />
														</div>
													))}
												</Paper>
											)}
										</Grid>
									) : <div className={classes.loading}><CircularProgress /></div>}
									<Grid item sm></Grid>
								</Grid>
							</Grid>
						</section>
					</div>
				)}

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
	getUserByPoints,
	getSups,
	getAdcs,
	getMids,
	getJgs,
	getTops,
	getTeamsByPoints
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(home));
