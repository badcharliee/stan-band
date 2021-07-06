import React from 'react';
import { connect } from 'react-redux';

import { SpotifyAuth, Scopes } from 'react-spotify-auth';

import SpotifyCallback from './SpotifyCallback';
import SearchSpotify from '../search/SearchSpotify';
import BandCard from '../BandCard';

class NewBandList extends React.Component {

  renderAuth() {
    if (!this.props.isSignedIn) {
      return (
        <div>
          <SpotifyAuth
            redirectUri='http://localhost:3000/bands/new'
            clientID='39df040e26444a399537c3a6ee349bd4'
            scopes={[Scopes.userReadPrivate, 'user-read-email']}
            title="Log in with Spotify"
            showDialog
          />
        </div>
      );
    }

    return (
      <div className="center">
        <SearchSpotify />
        {this.renderBands()}
      </div>
    );
  }

  renderSearchResults = () => {
    const renderedSearchResults = this.props.searchResults.map(result => {
      return (
        <div key={result.id} className="four wide column">
          <BandCard
            imagePath={result.images.length > 0 ? result.images[0].url : ''}
            spotifyBandId={result.id}
            bandName={result.name}
            isFollowing={result.isFollowing}
            bandId={result.id}
            hideStansLabel
          />
        </div>
      );
    });

    return renderedSearchResults;
  }

  renderBands() {

    if (!this.props.searchResults) {
      return null;
    }

    return (
      <div>
        <h2 style={{ color: 'white', margin: '20px' }} className="ui header">Search Results</h2>
        <h3 style={{ color: 'white', margin: '15px' }}>Note: You'll need to follow the artist on Spotify before you can add them to this site.</h3>
        <div className="ui stackable grid">
          {this.renderSearchResults()}
        </div>
      </div>
    );


  }

  render() {
    return (
      <div>
        <SpotifyCallback />
        {this.renderAuth()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    isSignedIn: state.spotifyAuth.isSignedIn,
    searchValue: state.spotifySearch.value,
    searchResults: state.spotifySearch.results
  };
};

export default connect(
  mapStateToProps
)(NewBandList);
