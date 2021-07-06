import React from 'react';
import { connect } from 'react-redux';
import { searchBandValueUpdate, searchBands } from '../../actions';

class Search extends React.Component {

  render() {
    return (
      <div style={{ margin: '30px' }}>
        <div className="ui fluid category search">
          <div className="ui icon input">
            <input onKeyUp={this.props.onKeyUp} className="prompt" type="text" placeholder="Search bands..." />
          </div>
          <button onClick={this.props.onSearchClick} className="ui primary button" style={{ margin: '20px'}}>{this.props.buttonValue}</button>
          <div className="results"></div>
        </div>
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
  mapStateToProps,
  { searchBandValueUpdate, searchBands }
)(Search);
