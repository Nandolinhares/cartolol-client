import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export class adminHome extends Component {
    render() {
        const { user: { credentials: { administrator } } } = this.props;

        let adminProfile = administrator ? (
            <div>
                <h2>Olá adm</h2>
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
