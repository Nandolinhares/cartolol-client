import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
//MUI Stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//Icons
import CalendarToday from '@material-ui/icons/CalendarToday';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
//Redux Stuff
import { connect } from 'react-redux';
import { uploadImage, updateUserDetails } from '../redux/actions/userActions';


const styles = {
    paper: {
        padding: 20
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
            width: 200,
            height: 200,
            objectFit: 'cover',
            maxWidth: '100%',
            borderRadius: '50%'
        },
        '& .profile-details': {
            textAlign: 'center',
            '& .span, svg': {
                verticalAlign: 'middle'        
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
    }
};

class Profile extends Component {
    state = {
        nameState: "",
        open: false
    }
    
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

    //Editar nome
     handleClickOpen = () => {
        this.setState({ open: true });
        this.mapCredentialsToState(this.props.user.credentials.name)
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleUserDetails = () => {
        const userData = {
            name: document.querySelector('#name').value
        }
        this.props.updateUserDetails(userData);  
        this.handleClose();
    }
    
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
          });
    }

    mapCredentialsToState = (name) => {
        this.setState({
            nameState: name ? name : ''
        })
    }

    componentDidMount() {
        const { user: { credentials: { name } } } = this.props;
        this.mapCredentialsToState(name);
      }

    render() {
        dayjs.extend(relativeTime);
        dayjs.locale('pt-br')
        const { classes, 
                user: { 
                    credentials: { name, email, handle, createdAt, imageUrl },
                    authenticated,
                    loading
                }
            } = this.props;
        
        let profileMarkup = !loading ? (authenticated ? ( 
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                    <img src={imageUrl} alt="profile" className="profile-image" />
                        <input
                            type="file"
                            id="imageInput"
                            hidden="hidden"
                            onChange={this.handleImageChange}
                        />
                        <Tooltip title="Alterar foto de perfil" placement="top">
                            <IconButton onClick={this.handleEditPicture} className="button">
                                <EditIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h5">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        <Fragment>
                            <PersonIcon color="primary" /> <span>{name}</span> &nbsp;
                            <Tooltip title="Alterar nome" placement="top">
                                <IconButton onClick={this.handleClickOpen} className="button">
                                    <EditOutlinedIcon color="primary" className={classes.editIcon} />
                                </IconButton>
                            </Tooltip>
                        </Fragment>
                        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Alterar informações do perfil</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    O email e nome de usuário não podem ser alterados.
                                </DialogContentText>
                                    <form noValidate>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        name="nameState"
                                        label="Nome"
                                        type="text"
                                        className={classes.textField}
                                        onChange={this.handleChange}
                                        value={this.state.nameState}
                                        fullWidth
                                    />
                                    <TextField  disabled id="email" label="Email" className={classes.textField} defaultValue={email} fullWidth />
                                    <TextField  disabled id="handle" label="Username" className={classes.textField} defaultValue={handle} fullWidth />
                                    </form>
                            </DialogContent>
                            <DialogActions className={classes.actions}>
                                <Button variant="contained" onClick={this.handleClose} color="secondary">
                                    Cancelar
                                </Button>
                                <Button variant="contained" onClick={this.handleUserDetails} color="primary">
                                    Atualizar
                                </Button>
                            </DialogActions>
                        </Dialog>
                        <hr/>
                        <Fragment>
                            <MailOutlineIcon /> <span>{email}</span>
                        </Fragment>
                        <hr/>
                        <CalendarToday color="primary" /> {' '}
                        <span>Membro {dayjs(createdAt).fromNow()}</span>
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
        )) : (<p>Carregando...</p>)

        return profileMarkup; 
    }
}

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    uploadImage: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    ui: state.ui
});

const mapActionsToProps = {
    uploadImage,
    updateUserDetails
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
