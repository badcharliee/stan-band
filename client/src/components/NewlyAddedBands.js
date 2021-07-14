import React from 'react';
import { connect } from 'react-redux';

import BandCard from './BandCard';
import { fetchNewBands } from '../actions';

class NewlyAddedBands extends React.Component {

  componentDidMount() {
    this.props.fetchNewBands();
  }

  renderTopBandCards = () => {

    if (this.props.newBands) {

      return this.props.newBands.map(newBand => {
        return (
          <div key={newBand.id} className="column">
            <BandCard
              imagePath={newBand.profileImage}
              bandName={newBand.name}
              stanCount={newBand.stans.length}
              spotifyBandId={newBand.spotifyBandId}
              introducerUserId={newBand.introducerUserId}
              isFollowing={newBand.isFollowing}
              stans={newBand.stans}
              comments={newBand.comments}
              id={newBand.id}
            />
          </div>
        );
      });

    }

  }

  render() {
    return (
      <div>
        <div className="ui divider"></div>
        <h2 className="ui black label header" style={{ color: 'white', marginTop: '10px', marginBottom: '20px', paddingLeft: '100px', paddingRight: '100px' }}>Newly Added</h2>
        <div className="ui stackable four column grid">
          <div className="row">
            {this.renderTopBandCards()}
          </div>
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    newBands: state.bandSearch.newBands
  };
};

export default connect(
  mapStateToProps,
  {
    fetchNewBands
  }
)(NewlyAddedBands);
