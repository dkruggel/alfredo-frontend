import React from 'react';
import './App.css';
import netlifyIdentity from 'netlify-identity-widget';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import { Button } from '@material-ui/core';

function AuthExample() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <AuthButton />
        <Button>
          <Link style={{ textDecoration: 'none' }} to='/protected'>
            Dashboard
          </Link>
        </Button>
        <Route path='/login' component={App} />
        <PrivateRoute path='/protected' component={Dashboard} />
      </div>
    </Router>
  );
}

const netlifyAuth = {
  isAuthenticated: false,
  user: null,
  authenticate(callback) {
    this.isAuthenticated = true;
    netlifyIdentity.open();
    netlifyIdentity.on('login', (user) => {
      this.user = user;
      callback(user);
    });
  },
  signout(callback) {
    this.isAuthenticated = false;
    netlifyIdentity.logout();
    netlifyIdentity.on('logout', () => {
      this.user = null;
      callback();
    });
  },
};

const AuthButton = withRouter(({ history }) =>
  netlifyAuth.isAuthenticated ? (
    <p>
      Welcome!{' '}
      <Button
        onClick={() => {
          netlifyAuth.signout(() => history.push('/'));
        }}
      >
        Sign out
      </Button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  )
);

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        netlifyAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

class App extends React.Component {
  state = { redirectToReferrer: false };

  login = () => {
    netlifyAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    let { from } = this.props.location.state || { from: { pathname: '/' } };
    let { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      console.log(from);
      return <Redirect to={from} />;
    }

    return (
      <div style={{ display: 'flex', paddingLeft: 15 }}>
        <p style={{ paddingRight: 5 }}>You must log in to view this page.</p>
        <Button onClick={this.login}>Log in</Button>
      </div>
    );
  }
}

export default AuthExample;
