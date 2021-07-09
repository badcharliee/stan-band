import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createBand, bandSelected } from '../actions';
import '../styles/styles.css';

class BandCard extends React.Component {

  constructor(props) {
    super(props);
    this.band = {
      id: this.props.id,
      spotifyBandId: this.props.spotifyBandId,
      name: this.props.bandName,
      stanCount: this.props.stanCount,
      profileImage: this.props.imagePath,
      introducerUserId: this.props.introducerUserId,
      stans: this.props.stans,
      comments: this.props.comments
    };
  }

  onAddClick = () => {

    this.band = {
      id: this.props.id,
      spotifyBandId: this.props.spotifyBandId,
      name: this.props.bandName,
      stanCount: 1,
      profileImage: this.props.imagePath,
      introducerUserId: this.props.currentUserSpotifyId,
      stans: [],
      comments: []
    };

    this.props.createBand(this.band);
  }

  render() {

    const imagePath = this.props.imagePath;
    const bandName = this.props.bandName;
    const stanCount = this.props.stanCount;

    return (
      <div>
        <Link onClick={() => this.props.bandSelected(this.band)} to="/band">

          <div className="bandCard">
            <img className="profileImage" src={imagePath} alt="Profile" />
            <h4 className="bandName">
              <b>{bandName}</b>
            </h4>
            <p className="bandType">
              {this.props.hideStansLabel ? null : <label>{stanCount} Stans</label>}
            </p>
          </div>
          {
            ( this.props.hideStansLabel && this.props.isFollowing ) ?
              ( <div className="extra content">
                <button onClick={this.onAddClick} className="ui primary button">
                  <i className="add icon"></i>
                  Add to Site
                </button>
              </div> ) :
            ( null )
          }
        </Link>
      </div>
    );
  }

}

BandCard.defaultProps = {
  hideStansLabel: false
}

const mapStateToProps = state => {
  return {
    searchValue: state.bandSearch.value,
    searchResults: state.bandSearch.results,
    currentUserSpotifyId: state.spotifyAuth.userId,
    currentUserId: state.currentUser.user ? state.currentUser.user.id : null
  };
};

export default connect(
  mapStateToProps,
  { createBand, bandSelected }
)(BandCard);
