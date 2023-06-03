import React, { Component } from 'react';
import './App.css';
import { Route, withRouter, Switch } from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Login from '../user/login/Login';
import Signup from '../user/signup/Signup';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
import NotFound from '../common/NotFound';
import CityList from '../Components/CityList';
import CityForm from "../Components/CityForm";
import SerieList from "../Components/SerieList";
import SerieForm from "../Components/SerieForm";
import RestaurantList from "../Components/RestaurantList";
import SpecialiteList from "../Components/SpecialiteList";
import SpecialiteForm from "../Components/SpecialiteForm";
import ZoneList from "../Components/ZoneList";
import ZoneForm from "../Components/ZoneForm";
import ZoneByCity from "../Components/ZoneByCity";
import LoadingIndicator from '../common/LoadingIndicator';
import PrivateRoute from '../common/PrivateRoute';
import { Layout, notification } from 'antd';
import Navbar from "../Components/Hello";
import RestaurantForm from '../Components/RestaurantForm';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import SearchPage from '../Components/SearchPage';

const { Content } = Layout;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      isAuthenticated: false,
      isLoading: true,
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    notification.config({
      placement: 'topRight',
      top: 70,
      duration: 3,
    });
  }

  loadCurrentUser() {
    getCurrentUser()
      .then((response) => {
        this.setState({
          currentUser: response,
          isAuthenticated: true,
          isLoading: false,
        });
      })
      .catch((error) => {
        this.setState({
          isLoading: false,
        });
      });
  }

  componentDidMount() {
    this.loadCurrentUser();
  }

  handleLogout(redirectTo = '/', notificationType = 'success', description = 'You\'re successfully logged out.') {
    localStorage.removeItem(ACCESS_TOKEN);

    this.setState({
      currentUser: null,
      isAuthenticated: false,
    });

    this.props.history.push(redirectTo);

    notification[notificationType]({
      message: 'Restaurant App',
      description: description,
    });
  }

  handleLogin() {
    notification.success({
      message: 'Restaurant App',
      description: "You're successfully logged in.",
    });
    this.loadCurrentUser();
    this.props.history.push('/');
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingIndicator />;
    }

    const { isAuthenticated, currentUser } = this.state;
    const showAppHeader = !window.location.pathname.includes('/home');

    return (
      <Switch>
        <Route path="/home">
          <SearchPage
            isAuthenticated={isAuthenticated}
            currentUser={currentUser}
            handleLogout={this.handleLogout}
          />
        </Route>
        <Route>
          <Layout className="app-container">
            {showAppHeader && (
              <AppHeader
                isAuthenticated={isAuthenticated}
                currentUser={currentUser}
                onLogout={this.handleLogout}
              />
            )}

            <Content className="app-content">
              <div className="container">
                {window.location.pathname === '/home2' && (
                  <Navbar
                    isAuthenticated={isAuthenticated}
                    currentUser={currentUser}
                    onLogout={this.handleLogout}
                  />
                )}

                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <Navbar
                        isAuthenticated={isAuthenticated}
                        currentUser={currentUser}
                        handleLogout={this.handleLogout}
                        {...props}
                      />
                    )}
                  />
                  <Route path="/login" render={(props) => <Login onLogin={this.handleLogin} {...props} />} />
                  <Route path="/signup" component={Signup} />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/users/:username"
                    component={Profile}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/citylist"
                    component={CityList}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/create-city"
                    component={CityForm}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/zone"
                    component={ZoneList}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/create-zone"
                    component={ZoneForm}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/zoneByCity"
                    component={ZoneByCity}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/serielist"
                    component={SerieList}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/serie"
                    component={SerieForm}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/specialite"
                    component={SpecialiteForm}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/specialitelist"
                    component={SpecialiteList}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/restaurantlist"
                    component={RestaurantList}
                    handleLogout={this.handleLogout}
                  />

                  <PrivateRoute
                    authenticated={isAuthenticated}
                    path="/restaurant"
                    component={RestaurantForm}
                    handleLogout={this.handleLogout}
                  />

                  <Route component={NotFound} />
                </Switch>
              </div>
            </Content>
          </Layout>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);
