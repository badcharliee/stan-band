import React from 'react';

import users from '../../apis/users';
import '../../styles/styles.css';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = { imageUrl: '' };
  }

  fetchImageUrl = async () => {
    const response = await users.get(`?userId=${this.props.comment.userId}`);
    this.setState({ imageUrl: response.data[0].imageUrl });
  }

  componentDidMount() {
    this.fetchImageUrl();
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
              <i className="heart icon">   {comment.upvotes}   </i>
            </div>
          </div>
        </div>


    );
  }

}

export default Comment;
