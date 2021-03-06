import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import SearchDatabase from '../search/SearchDatabase';
import NewlyAddedBands from '../NewlyAddedBands';
import BandCard from '../BandCard';
import '../../styles/styles.css';

class Home extends React.Component {

  renderSearchResults = () => {
    const renderedSearchResults = this.props.searchResults.map(result => {
      return (
        <div key={result.spotifyBandId} className="four wide column">
          <BandCard
            imagePath={result.profileImage}
            spotifyBandId={result.spotifyBandId}
            bandName={result.name}
            isFollowing={result.isFollowing}
            stanCount={result.stans.length}
            introducerUserId={result.introducerUserId}
            stans={result.stans}
            comments={result.comments}
            id={result.id}
          />
        </div>
      );
    });

    return renderedSearchResults;
  }

  renderBands() {

    if (!this.props.searchResults) {
      return <NewlyAddedBands />;
    }

    return (
      <div>
        <div className="ui content" style={{ color: 'white', margin: '20px' }}>
          Don't see who you're looking for?
          <Link to="/bands/new" className="item">
            <span> Introduce a band to the site.</span>
          </Link>
        </div>
        <div className="ui divider"></div>
        <h2 className="ui black label header" style={{ color: 'white', marginTop: '10px', marginBottom: '20px', paddingLeft: '100px', paddingRight: '100px' }}>Search Results</h2>
        <div className="ui stackable grid">
          {this.renderSearchResults()}
        </div>
      </div>
    );


  }

  render() {
    return (
      <div className="center">
        <SearchDatabase />
        {this.renderBands()}
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    searchValue: state.bandSearch.value,
    searchResults: state.bandSearch.results
  };
};

export default connect(
  mapStateToProps
)(Home);
