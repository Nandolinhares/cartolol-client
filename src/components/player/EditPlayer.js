import React, { Component, Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
//Icons
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
//Redux
import { connect } from 'react-redux';
import { updatePlayerDetails } from '../../redux/actions/dataActions';

const styles = {
    name: {
        textAlign: 'center',
        marginLeft: '10%'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    editIcon: {
        cursor: 'pointer',
        top: '50%',
        color: '#00ff5b',
        fontSize: 20
    }
}

export class EditPlayer extends Component {

    state = {
        nameState: "",
        positionState: "",
        teamState: "",
        priceState: 0,
        pointsState: 0,
        open: false
    }

    componentDidMount() {
        const { player: { name, position, team, price, points } } = this.props;
        this.setState({
            nameState: name,
            positionState: position,
            teamState: team,
            priceState: price,
            pointsState: points
        })
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlePlayerDetails = (playerName) => {

        const playerDetails = {
            name: this.state.nameState,
            position: this.state.positionState,
            team: this.state.teamState,
            price: Number(this.state.priceState),
            points: Number(this.state.pointsState)
        }

        this.props.updatePlayerDetails(playerDetails, playerName);
        this.handleClose();
    }

    render() {
        const { classes, player: { name } } = this.props;
        return (
            <div>
                <Fragment>
                    <span className={classes.name}>{name}</span> &nbsp; 
                    <Tooltip title="Alterar informações" placement="top">   
                        <IconButton onClick={this.handleClickOpen} className="button">
                            <EditOutlinedIcon  className={classes.editIcon} />
                        </IconButton>
                    </Tooltip>
                </Fragment>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Alterar informações do jogador {name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Aqui você pode atualizar as informações dos jogadores.
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
                            <TextField 
                                id="position"
                                placeholder="Top, Jungler, Mid, Adc ou Sup"
                                margin="dense"
                                name="positionState"
                                label="Rota"
                                type="text"
                                className={classes.textField}
                                onChange={this.handleChange}
                                value={this.state.positionState}
                                fullWidth
                            />
                            <TextField 
                                id="team"
                                name="teamState"
                                label="Time"
                                type="text"
                                className={classes.textField}
                                onChange={this.handleChange}
                                value={this.state.teamState}
                                fullWidth
                            />
                            <TextField 
                                id="price"
                                name="priceState"
                                label="Preço"
                                type="number"
                                className={classes.textField}
                                onChange={this.handleChange}
                                value={this.state.priceState}
                                fullWidth
                            />
                            <TextField 
                                id="points"
                                name="pointsState"
                                label="Pontos"
                                type="number"
                                className={classes.textField}
                                onChange={this.handleChange}
                                value={this.state.pointsState}
                                fullWidth
                            />
                            </form>
                    </DialogContent>
                    <DialogActions className={classes.actions}>
                        <Button variant="contained" onClick={this.handleClose} color="secondary">
                            Cancelar
                        </Button>
                        <Button variant="contained" onClick={() => this.handlePlayerDetails(name)} color="primary">
                            Atualizar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    updatePlayerDetails
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(EditPlayer));
