import React from 'react';
import { connect } from 'react-redux';

import { stanBand, unstanBand, newCommentChange, addNewComment } from '../../actions';
import users from '../../apis/users';
import Comment from './Comment';

class Band extends React.Component {
  constructor(props) {
    super(props);
    this.state = { imageUrl: '' };
  }

  componentDidMount() {
    this.fetchImageUrl();
  }

  onStanClick = () => {
    this.props.stanBand();
  }

  onUnstanClick = () => {
    this.props.unstanBand();
  }

  onNewCommentChange = (e) => {
    this.props.newCommentChange(e.target.value);
  }

  onAddCommentClick = () => {
    this.props.addNewComment();
  }

  fetchImageUrl = async () => {
    const response = await users.get(`?userId=${this.props.currentBand.introducerUserId}`);
    this.setState({ imageUrl: response.data[0].imageUrl });
  }

  renderStanButton() {
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
          Log in to Stan
        </div>
      );
    }

  }

  renderComments() {

    const comments = this.props.currentBand.comments && this.props.currentBand.comments.length > 0 ? this.props.currentBand.comments : null;

    if (comments) {
      return (
        <div className="commentCards">
          {comments.map(comment => {
            return (
              <Comment key={comment.id} comment={comment} />
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
    return (
      <div style={{ marginTop: '35px' }}>

        <div className="ui segment">
          <h1 className="ui left floated header">{this.props.currentBand.name}</h1>
          <div className="ui right floated header">
            <div className="ui circular grey label" style={{ marginRight: '15px'}}>{this.props.currentBand.stans ? this.props.currentBand.stans.length : 0} stans</div>
            {this.renderStanButton()}
          </div>
          <div className="ui clearing divider"></div>
          <img className="ui centered medium rounded image" src={this.props.currentBand.profileImage} alt={this.props.currentBand.name} />
          <div className="ui center aligned">
            <div className="ui black label" style={{ margin: '12px' }}>Introduced by <div className="detail">{this.props.currentBand.introducerUserId}</div></div>
            <img className="ui centered mini circular image" src={this.state.imageUrl} alt="Introducer Profile"/>
          </div>
        </div>

        <div className="ui header" style={{ color: 'white' }}>Comment Thread</div>
        <div className="ui segment">
          <div className="ui form">
            {/*<div className="field">
              <label>Leave a comment</label>
              <textarea onChange={(e) => this.onNewCommentChange(e)} value={this.props.newComment ? this.props.newComment : ""} rows="2"></textarea>
            </div>*/}
            {/*<div onClick={this.onAddCommentClick} className="ui submit primary button">Add Comment</div>*/}
          </div>
          {this.renderComments()}
        </div>


      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    currentBand: state.bandSearch.selected,
    isSignedIn: state.spotifyAuth.isSignedIn,
    currentUser: state.currentUser.user,
    newComment: state.bandSearch.newComment
  };
};

export default connect(
  mapStateToProps,
  {
    stanBand,
    unstanBand,
    newCommentChange,
    addNewComment
  }
)(Band);
