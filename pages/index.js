/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from 'react-bootstrap'
import Navbar from '../components/Navbar'

export const getStaticProps = async () => {
  const { data } = await axios.get('/posts', {
    proxy: { host: '127.0.0.1', port: 3000 },
  })
  console.log(data)
  return { props: { posts: data } }
}

const HomeWrapper = s.div`
  display: flex;
  flex-direction: row;
`

const Home = ({ posts }) => {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [count, setCount] = useState(0) // to trigger the useEffect

  useEffect(() => {
    const getUser = async () => {
      try {
        // might need more than username, get profile picture
        const { data: { username } } = await axios.get('/user')
        username ? setUser(username) : setUser('')
        console.log(username)
      } catch (err) {
        setUser('')
        router.push('/')
      }
    }
    getUser()
  }, [count])

  return (
    <>
      <Navbar
        user={user}
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
      <HomeWrapper>
        Welcome to next.js!
        <ul>
          {posts.map(post => (<li key={post._id}>{post.title}</li>))}
        </ul>
      </HomeWrapper>
    </>
  )
}

export default Home
