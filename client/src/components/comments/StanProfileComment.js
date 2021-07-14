import React from 'react';
import { connect } from 'react-redux';

import bands from '../../apis/bands';
import { likeComment, unlikeComment } from '../../actions';
import '../../styles/styles.css';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageUrl: '', isLiked: false };
  }

  fetchImageUrl = async () => {
    const response = await bands.get(`?spotifyBandId=${this.props.comment.bandId}`);

    if (this.props.currentUser) {
      // check if currentUser likes comment
      const comment = this.props.comment;
      try {
        if (comment.likers.includes(this.props.currentUser.userId)) {
          this.setState({ imageUrl: response.data[0].profileImage, isLiked: true });
          return;
        }
      } catch (error) {}

    }

    this.setState({ imageUrl: response.data[0].profileImage, isLiked: false });
  }

  componentDidMount() {
    this.fetchImageUrl();
  }

  onLikeButtonClick = () => {

    if (this.props.currentUser) {
      if (this.state.isLiked) {
        this.props.unlikeComment(this.props.comment);
      } else {
        this.props.likeComment(this.props.comment);
      }

      this.setState({ isLiked: !this.state.isLiked });
    }

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
  mapStateToProps, {
    likeComment,
    unlikeComment
  }
)(Comment);
