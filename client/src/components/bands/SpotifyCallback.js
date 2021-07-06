import React from 'react';
import { connect } from 'react-redux';
import { SpotifyAuthListener } from 'react-spotify-auth';

import { fetchCurrentUser, accessTokenReceived, fetchUserByUserId } from '../../actions';

class SpotifyCallback extends React.Component {

  onAccessToken = async token => {
    this.props.accessTokenReceived(token);
    await this.props.fetchCurrentUser(token);
    this.props.fetchUserByUserId();
  }

  render() {
    return (
      <div>
        <SpotifyAuthListener
          onAccessToken={this.onAccessToken}
        />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isSignedIn: true
  };
};

export default connect(
  mapStateToProps,
  { accessTokenReceived, fetchCurrentUser, fetchUserByUserId }
)(SpotifyCallback);
