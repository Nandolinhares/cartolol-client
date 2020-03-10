import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PersonIcon from '@material-ui/icons/Person';
import { IconButton } from '@material-ui/core';
//Redux Stuff
import { connect } from 'react-redux';
import { updateUserDetails } from '../../redux/actions/userActions';

const styles = {
    textField: {
        margin: '10px auto 10px auto'
    },
    editIcon: {
        cursor: 'pointer',
    }
}

export class EditProfile extends Component {
    state = {
        nameState: "",
        open: false
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
        const { classes, 
                user: {
                    credentials: { name, email, handle }
                }} = this.props;
        return (
            <section>
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
            </section>
        )
    }
}

EditProfile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    updateUserDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditProfile));
