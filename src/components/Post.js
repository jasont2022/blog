/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react'
import Link from 'next/link'
import s from 'styled-components'
import CommentForm from './CommentForm'

const PostWrapper = s.div`
  overflow: hidden;
  margin-bottom: 1rem;
  margin-top: 0.9rem;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
`
const CommentWrapper = s.div`
  padding: 1rem;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 0px;
  margin-top: 0.9rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 8px;
  box-sizing: border-box;

  :hover {
    transform: scale(1.02);
    cursor: pointer;
  }
`

const Comment = ({ comment }) => {
  const { _id, text } = comment

  return (
    <CommentWrapper>
      <Link href={`/comment/${_id}`}>
        <a>
          <p>{text}</p>
        </a>
      </Link>
    </CommentWrapper>
  )
}

const Post = ({ post, activeUser, setErrMsg }) => {
  const {
    _id, author: { username }, title, category, text, comments,
  } = post

  return (
    <>
      <PostWrapper>
        <h3>{title}</h3>
        <h5>{category}</h5>
        <Link href={`/${username}`}>
          <a><h5>{username}</h5></a>
        </Link>
        <p>{text}</p>
      </PostWrapper>
      {/* { work on dynamic form clicking button appears/disappers form } */}
      <h4>Comments</h4>
      {activeUser ? <CommentForm id={_id} title={title} setErrMsg={setErrMsg} /> : null}
      {comments !== [] ? (
        comments.map(comment => <Comment key={comment._id} comment={comment} />)
      ) : null}
    </>
  )
}

export default Post
