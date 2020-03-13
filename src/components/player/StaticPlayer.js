import React, { Component } from 'react';
//Redux Stuff
import { connect } from 'react-redux';

export class StaticPlayer extends Component {

    render() {
        const { player: { name, position, price, team, imageUrl } } = this.props;
        return (
            <div>
                <p>{name}</p>
                <p>{position}</p>
                <p>{team}</p>
                <p>{price}</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps)(StaticPlayer);
