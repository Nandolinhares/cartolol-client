import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {

}

class Errors extends Component {
    render() {
        const { errors } = this.props;
        return (
            <div>
                <h2>{errors.message}</h2>
            </div>
        )
    }
}

export default withStyles(styles)(Errors);
