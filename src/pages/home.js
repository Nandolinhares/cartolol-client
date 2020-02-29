import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class home extends Component {
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    Teste...
                </Grid>
                <Grid item xs={12} sm={4}>
                    Ahhh...
                </Grid>
            </Grid>
        )
    }
}

export default home
