/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import Link from 'next/link'
import s from 'styled-components'
import ProfileForm from './ProfileForm'

const About = s.div`
  box-sizing: border-box;
  height: 100%;
`

const PostWrapper = s.div`
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

const Post = ({ post }) => {
  const {
    _id, title, category,
  } = post

  return (
    <PostWrapper>
      <Link href={`/post/${_id}`}>
        <a>
          <h3>{title}</h3>
          <h5>{category}</h5>
        </a>
      </Link>
    </PostWrapper>
  )
}

const Comment = ({ comment }) => {
  const { _id, text } = comment

  return (
    <PostWrapper>
      <Link href={`/comment/${_id}`}>
        <a>
          <p>{text}</p>
        </a>
      </Link>
    </PostWrapper>
  )
}

const Profile = ({ user, activeUser, setErrMsg }) => {
  const {
    username, email, firstname, lastname, posts, comments,
  } = user
  const [modalShow, setModalShow] = useState(false)

  return (
    <>
      <About>
        <h3>
          About
          {username === activeUser ? (
            <Button onClick={() => setModalShow(true)}>Edit</Button>
          ) : null}
        </h3>
        <h4>{firstname} {lastname}</h4>
        <p style={{ margin: '5px' }}>&#x40;{username}</p>
        <p style={{ margin: '5px' }}>{email}</p>
      </About>
      <ProfileForm
        show={modalShow}
        onHide={() => setModalShow(false)}
        setErrMsg={setErrMsg}
        username={username}
      />
      <h3 style={{ marginTop: '1rem' }}>Posts</h3>
      {posts !== [] ? (
        posts.map(post => <Post key={post._id} post={post} />)
      ) : null}
      <h3 style={{ marginTop: '1rem' }}>Comments</h3>
      {comments !== [] ? (
        comments.map(comment => <Comment key={comment._id} comment={comment} />)
      ) : null}
    </>
  )
}

export default Profile
