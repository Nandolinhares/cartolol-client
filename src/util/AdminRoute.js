import React from 'react';
import { Route, Redirect } from 'react-router-dom';
//Redux Stuff
import { connect } from 'react-redux';

const AdminRoute = ({ component: Component, credentials: { administrator }, ...rest }) => (
    <Route 
        {...rest}
        render={props => administrator === false ? <Redirect to="/"/> : <Component {...props} />}
    ></Route>
);

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps)(AdminRoute);