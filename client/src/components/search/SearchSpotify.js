import React from 'react';
import { connect } from 'react-redux';
import { searchSpotifyValueUpdate, searchSpotify } from '../../actions';
import Search from './Search';

class SearchSpotify extends React.Component {

  _onKeyUp = (e) => {
    this.props.searchSpotifyValueUpdate(e.target.value);

    if (e.key === 'Enter') {
      this.search();
    }
  }

  search = () => {
    this.props.searchSpotify(this.props.searchValue);
  }

  render() {
    return (
      <Search onSearchClick={this.search} onKeyUp={this._onKeyUp} buttonValue="Search Spotify" />
    );
  }

}

const mapStateToProps = state => {
  return {
    searchValue: state.spotifySearch.value,
    searchResults: state.spotifySearch.results
  };
};

export default connect(
  mapStateToProps,
  { searchSpotifyValueUpdate, searchSpotify }
)(SearchSpotify);
