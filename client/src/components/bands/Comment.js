import React from 'react';
import { connect } from 'react-redux';

import users from '../../apis/users';
import '../../styles/styles.css';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageUrl: '', isLiked: '' };
  }

  fetchImageUrl = async () => {
    const response = await users.get(`?userId=${this.props.comment.userId}`);
    this.setState({ imageUrl: response.data[0].imageUrl });
  }

  componentDidMount() {
    this.fetchImageUrl();

    if (this.props.currentUser) {
      // check if currentUser likes comment
      this.setState({ isLiked: true });
    } else {
      this.setState({ isLiked: false });
    }

  }

  onLikeButtonClick = () => {
    this.setState({ isLiked: !this.state.isLiked });
  }

  renderLikeIcon = () => {

    if (!this.state.isLiked) {
      return (
        <i onClick={this.onLikeButtonClick} className="heart outline icon">   {this.props.comment.upvotes}   </i>
      );
    }

    return (
      <i onClick={this.onLikeButtonClick} className="heart icon">   {this.props.comment.upvotes}   </i>
    );

  }

  render() {

    const comment = this.props.comment;

    return (

        <div className="commentCardContainer">
          <div className="commentCard">
             <img className="profileIcon" src={this.state.imageUrl} alt="Commentor Profile Icon"/>
            <div className="commentTextContent">
              <div className="commentUsername">
                {comment.userId}
              </div>
              <div className="commentBody">
                <b>{comment.body}</b>
              </div>
              <div className="commentTimestamp">
                {comment.timePosted}
              </div>
            </div>
            <div className="commentLikeIcon">
              {this.renderLikeIcon()}
            </div>
          </div>
        </div>


    );
  }

}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser.user
  };
};

export default connect(
  mapStateToProps
)(Comment);
