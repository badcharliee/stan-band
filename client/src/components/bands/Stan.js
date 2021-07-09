import React from 'react';
import { connect } from 'react-redux';

import StanProfileComment from '../comments/StanProfileComment';

class Stan extends React.Component {

  renderFollowButton() {
    /* check if current user is following selected stan */
    const currentUser = this.props.currentUser;
    const isSignedIn = this.props.isSignedIn;
    const isStanning = currentUser && currentUser.stanning.includes(this.props.currentBand.spotifyBandId);

    if (isSignedIn && isStanning) {
      return (
        <div onClick={this.onUnstanClick} className="ui secondary focusable button">
          <i className="check icon"></i>
          Unstan
        </div>
      );
    } else if (isSignedIn) {
      return (
        <div onClick={this.onStanClick} className="ui secondary focusable button">
          <i className="add icon"></i>
          Stan
        </div>
      );
    } else {
      return (
        <div className="ui secondary focusable button">
          <i className="add icon"></i>
          Log in to Follow
        </div>
      );
    }

  }

  renderComments() {

    const comments = this.props.currentStan.comments && this.props.currentStan.comments.length > 0 ? this.props.currentStan.comments : null;

    if (comments) {
      return (
        <div className="commentCards">
          {comments.map(comment => {
            return (
              <StanProfileComment key={comment.uuid} comment={comment} />
            );
          })}
        </div>
      );
    }

    return (
      <div>
        No comments
      </div>
    );

  }

  render() {
    const currentStan = this.props.currentStan;
    return (
      <div style={{ marginTop: '35px' }}>
        <div className="ui segment">
          <h1 className="ui left floated header">{ currentStan ? currentStan.userId : null }</h1>
          <div className="ui right floated header">
            {this.renderFollowButton()}
          </div>
          <div className="ui clearing divider"></div>
          <img className="ui centered medium rounded image" src={ currentStan ? currentStan.imageUrl : null } alt="Profile" />
        </div>

        <div className="ui header" style={{ color: 'white' }}>Stan Comments</div>
        <div className="ui segment">
          {currentStan ? this.renderComments() : null}
        </div>
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentStan: state.stanSearch.selected
  };
};

export default connect(
  mapStateToProps
)(Stan);
