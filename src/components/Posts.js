/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import Link from 'next/link'
import s from 'styled-components'

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

const PostsWrapper = s.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  grid-auto-rows: minmax(200px, auto);
`

const Post = ({ post }) => {
  const {
    _id, author: { username }, title, category,
  } = post

  return (
    <PostWrapper>
      <Link href={`/${username}`}>
        <a><h5>&#x40;{username}</h5></a>
      </Link>
      <Link href={`/post/${_id}`}>
        <a>
          <h3>{title}</h3>
          <h5>{category}</h5>
        </a>
      </Link>
    </PostWrapper>
  )
}

const Posts = ({ posts }) => (
  <PostsWrapper>
    {posts.map(post => <Post key={post._id} post={post} />)}
  </PostsWrapper>
)

export default Posts
