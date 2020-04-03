import React, { Component } from 'react';
//Components
import StaticPlayer from '../components/player/StaticPlayer';
//Redux Stuff
import { connect } from 'react-redux';
import { getPlayer } from '../redux/actions/dataActions';

export class playerProfile extends Component {

    componentDidMount() {
        this.props.getPlayer(this.props.match.params.name);
    }

    render() {
        const { data: { player } } = this.props;
        return (
            <div className="container">
                <StaticPlayer player={player} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
});

const mapActionsToProps = {
    getPlayer
}

export default connect(mapStateToProps, mapActionsToProps)(playerProfile);
