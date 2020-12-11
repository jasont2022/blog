/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
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
const Button = s.button`
  hieght: 60px;
  width: 100px;
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.5;
  border: none;
  padding: 5px 10px;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  background: linear-gradient(-70deg,#ff7170,#ffe57f);
  float: right !important;
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
  const [isCommenting, setIsCommenting] = useState(false)

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
      <h4>
        Comments
        {activeUser && !isCommenting ? (
          <Button onClick={() => setIsCommenting(true)}>Comment</Button>
        ) : null}
      </h4>
      {isCommenting ? (
        <CommentForm
          id={_id}
          title={title}
          setErrMsg={setErrMsg}
          setIsCommenting={() => setIsCommenting(false)}
        />
      ) : null}
      {comments !== [] ? (
        comments.map(comment => <Comment key={comment._id} comment={comment} />)
      ) : null}
    </>
  )
}

export default Post
