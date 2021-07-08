import React from 'react';
import { connect } from 'react-redux';
import { searchBandValueUpdate, searchBands } from '../../actions';

class Search extends React.Component {

  render() {
    return (
      <div>

        <div className="ui huge inverted transparent fluid action input" style={{ margin: '10%' }}>
          <input onKeyUp={this.props.onKeyUp} type="text" placeholder="Search for an artist..." />
          <div onClick={this.props.onSearchClick} className="ui huge black button">Go!</div>
        </div>

        {/*<div style={{ margin: '30px' }}>
          <div className="ui fluid category search">
            <div className="ui icon input">
              <input onKeyUp={this.props.onKeyUp} className="prompt" type="text" placeholder="Search bands..." />
            </div>
            <button onClick={this.props.onSearchClick} className="ui primary button" style={{ margin: '20px'}}>{this.props.buttonValue}</button>
            <div className="results"></div>
          </div>
        </div>*/}
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
