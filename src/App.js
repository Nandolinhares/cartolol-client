import 'react-app-polyfill/stable';
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import AuthRoute from "./util/AuthRoute";
import AdminRoute from './util/AdminRoute';
//Redux stuffs
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import { Provider } from 'react-redux';
import store from './redux/store';

//Pages
import home from "./pages/home";
import signup from "./pages/signup";
import login from "./pages/login";
import adminHome from './pages/adminHome';
import playerProfile from './pages/playerProfile';
import ResetPassword from './pages/ResetPassword';
import UserProfile from './pages/UserProfile';
import MyLeagues from './pages/MyLeagues';
import PublicLeague from './pages/PublicLeague';
import Footer from './components/Footer';

axios.defaults.baseURL = 'https://us-east1-cartolol-fd251.cloudfunctions.net/api';


const token = localStorage.FBIdToken;

if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken.exp);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Navbar />
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute
                exact
                path="/signup"
                component={signup}
              />
              <AuthRoute
                exact
                path="/login"
                component={login}
              />
              <AdminRoute 
                exact 
                path="/secretAdmin" 
                component={adminHome} />
              <AdminRoute 
                exact 
                path="/players/:name" 
                component={playerProfile} />
              <Route 
                exact
                path="/resetPassword"
                component={ResetPassword}  
              />
              <Route 
                exact
                path="/users/:handle"
                component={UserProfile} 
              />
              <Route 
                exact
                path="/:handle/ligas"
                component={MyLeagues}
              />
              <Route 
                exact
                path="/ligas/:league"
                component={PublicLeague}
              />
            </Switch>
          <Footer />   
        </Router>
      </div>
    </Provider>
  );
}

export default App;
