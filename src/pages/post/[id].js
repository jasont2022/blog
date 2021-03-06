/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import s from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from 'react-bootstrap'
import Navbar from '../../components/Navbar'
import Post from '../../components/Post'

export const getStaticPaths = async () => {
  const { data } = await axios.get('/posts', {
    proxy: { host: '127.0.0.1', port: 3000 },
  })
  console.log(data)
  const paths = data.map(post => ({
    params: { id: post._id },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { id } = params
  const { data } = await axios.get(`/posts/${id}`, {
    proxy: { host: '127.0.0.1', port: 3000 },
  })
  console.log(data)
  return { props: { post: data } }
}

const Wrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 700px;
  padding-left: 15px;
  padding-right: 15px;
`

const PostPage = ({ post }) => {
  const router = useRouter()
  const [activeUser, setActiveUser] = useState('') // logged in user
  const [errMsg, setErrMsg] = useState('')
  const [count, setCount] = useState(0) // to trigger the useEffect

  useEffect(() => {
    const getUser = async () => {
      try {
        // might need more than username, get profile picture
        const { data: { username } } = await axios.get('/user')
        username ? setActiveUser(username) : setActiveUser('')
        console.log(username)
      } catch (err) {
        console.log(err)
        router.push('/')
      }
    }
    getUser()
  }, [count])

  console.log(post)

  return (
    <>
      <Navbar
        user={activeUser}
        setErrMsg={setErrMsg}
        count={count}
        setCount={setCount}
      />
      {errMsg ? (
        <Alert variant="danger" onClose={() => setErrMsg('')} dismissible>
          {errMsg}
        </Alert>
      )
        : null}
      <Wrapper>
        <Post post={post} activeUser={activeUser} setErrMsg={setErrMsg} />
      </Wrapper>
    </>
  )
}

export default PostPage
