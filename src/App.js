import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import AuthRoute from "./util/AuthRoute";
//Redux stuffs
import { Provider } from 'react-redux';
import store from './redux/store';

//Pages
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";

let authenticated = false;

const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
    axios.defaults.headers.common["Authorization"] = token;
    console.log(authenticated);
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar authenticated={authenticated} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/login"
                component={login}
                authenticated={authenticated}
              />
            </Switch>
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
