import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import PropTypes from 'prop-types';
import Profile from '../components/Profile';
///Redux Stuff
import { connect } from 'react-redux';

class home extends Component {
  state = {
    posts: null
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then(res => {
        this.setState({
          posts: res.data
        });
      })
      .catch(err => console.log(err));
  }

    render() { 
      const { user: { authenticated } } = this.props;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    {authenticated ? (
                      (this.state.posts) ? (this.state.posts.map(post => 
                        <div key={post.postId}>
                            <p>{post.name}</p>
                            <p>{post.age}</p>
                            <p>{post.postId}</p>            
                        </div>
                    )) : <p>Não há posts</p>
                    ) : <h2>Criar conteúdo para quem não está logado</h2>}
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(home);
