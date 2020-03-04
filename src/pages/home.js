import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

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
        return (
            <Grid container spacing={3}>
                <Grid item xs={12} sm={8}>
                    {(this.state.posts) ? (this.state.posts.map(post => 
                        <div key={post.postId}>
                            <p>{post.name}</p>
                            <p>{post.age}</p>
                            <p>{post.postId}</p>            
                        </div>
                    )) : <p>Não há posts</p>}
                </Grid>
                <Grid item xs={12} sm={4}>
                    Ahhh...
                </Grid>
            </Grid>
        )
    }
}

export default home;
