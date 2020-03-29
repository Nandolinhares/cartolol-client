import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import EditProfile from './EditProfile';
//MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';
//Icons
import CalendarToday from '@material-ui/icons/CalendarToday';

import EditIcon from '@material-ui/icons/Edit';
import MailOutlineIcon from '@material-ui/icons/MailOutline';

//Redux Stuff
import { connect } from 'react-redux';
import { uploadImage } from '../../redux/actions/userActions';


const styles = {
    paper: {
        padding: 20,
        marginTop: 14
    },
    profile: {
        '& .image-wrapper': {
            textAlign: 'center',
            position: 'relative',
            '& .button': {
                position: 'absolute',
                top: '80%',
                left: '70%'
            }
        },
        '& .profile-image': {
            width: 100,
            height: 100,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            fontSize: '12px',
            color: '#fff',
            '& .span, svg': {
                verticalAlign: 'middle'        
            },
            '& .muiColor': {
                color: '#fff'
            }
        },
        '& hr': {
            border: 'none',
            margin: '0 0 10px 0'
        },
        '& svg.button': {
            '&:hover': {
                cursor: 'pointer'
            }
        },
        '& .money': {
            color: '#4caf50',
            fontWeight: 'bold'
        }
    },
    buttons: {
        textAlign: 'center',
        '& a': {
            margin: '20px 10px'
        }
    },
    editIcon: {
        cursor: 'pointer',
    },
    actions: {
        margin: '0 auto'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    points: {
        fontWeight: 'bold',
        color: "#f9f911",
        fontFamily: 'Roboto condensed, san-serif',
        fontSize: 25
    }
};

class Profile extends Component {
    
    //Lidar com editar imagem
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
      };

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    render() {
        dayjs.extend(relativeTime);
        dayjs.locale('pt-br')
        const { classes, 
                user: { 
                    credentials: { email, handle, createdAt, imageUrl, money, points },
                    authenticated,
                    loading
                }
            } = this.props;
        
        let profileMarkup =  authenticated ? ( 
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        {!loading ? (
                            <div>
                                <img src={imageUrl} alt="Imagem de Perfil" className="profile-image" />
                                <input
                                    type="file"
                                    id="imageInput"
                                    hidden="hidden"
                                    onChange={this.handleImageChange}
                                />
                                <Tooltip title="Alterar foto de perfil" placement="top">
                                    <IconButton onClick={this.handleEditPicture} className="button">
                                        <EditIcon className="editIcon" />
                                    </IconButton>
                                </Tooltip>
                            </div>
                        ) : (<CircularProgress />)}
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5" className="muiColor">
                            @{handle}
                        </MuiLink>
                        <hr/>

                        <EditProfile />

                        <hr/>
                        <Fragment>
                            <MailOutlineIcon className="iconesProfile" /> <span>{email}</span>
                        </Fragment>
                        <hr/>
                        <CalendarToday className="iconesProfile" /> {' '}
                        <span>Membro {dayjs(createdAt).fromNow()}</span>
                       <hr />
                       <h3 className="money">R${money}</h3>
                       <h3>Pontuação Total</h3>
                       <h2 className={classes.points}>{points}</h2>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">Você não está logado! Faça login ou se cadastre</Typography>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">Login</Button>
                    <Button variant="contained" color="secondary" component={Link} to="/signup">Signup</Button>
                </div>
            </Paper>
        )

        return profileMarkup; 
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    uploadImage
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
