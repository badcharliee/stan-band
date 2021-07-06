import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';
import 'react-spotify-auth/dist/index.css';

import { signOut } from '../actions';

class Header extends React.Component {

  onSignOutClick = () => {
    this.props.signOut();
  }

  renderAuthButton() {
    const isSignedIn = this.props.isSignedIn;

    if (isSignedIn) {
      return (
        <button onClick={this.onSignOutClick} className="ui green button">
          Log Out
        </button>
      );
    } else {
      return <SpotifyAuth
        redirectUri='http://localhost:3000/callback'
        clientID='39df040e26444a399537c3a6ee349bd4'
        scopes={[Scopes.userReadPrivate, 'user-read-email', 'user-follow-read']}
        title="Log in"
        showDialog
      />;
    }

  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">
          <h3 className="ui header" style={{ color: 'white' }}>StanBand</h3>
        </Link>
        <div className="right menu">
          {this.renderAuthButton()}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return { isSignedIn: state.spotifyAuth.isSignedIn };
}

export default connect(
  mapStateToProps, {
    signOut
  })(Header);
