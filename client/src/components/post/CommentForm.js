import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {addComment} from "../../actions/post";


const CommentForm = ({postId, addComment}) => {
    const [text, setText] = useState('');
    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave a Comment</h3>
            </div>
            <form className="form my-1" onSubmit={event => {
                event.preventDefault();
                addComment(postId, {text});
                setText('');
            }}>
                <textarea className="text" cols="30" rows="5" placeholder="Create a post" value={text}
                          onChange={event => setText(event.target.value)} required></textarea>
                <input type="submit" value="Submit" className="btn btn-dark my-1"/>
            </form>
        </div>
    );
};

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
};

export default connect(null, {addComment})(CommentForm);
