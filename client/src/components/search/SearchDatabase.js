import React from 'react';
import { connect } from 'react-redux';
import { searchBandValueUpdate, searchBands } from '../../actions';
import Search from './Search';

class SearchDatabase extends React.Component {

  _onKeyUp = (e) => {
    this.props.searchBandValueUpdate(e.target.value);

    if (e.key === 'Enter') {
      this.search();
    }
  }

  search = () => {
    this.props.searchBands(this.props.searchValue);
  }

  render() {
    return (
      <Search onSearchClick={this.search} onKeyUp={this._onKeyUp} buttonValue="Go" />
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
)(SearchDatabase);
