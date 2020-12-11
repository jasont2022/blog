/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import s from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from 'react-bootstrap'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'

export const getStaticProps = async () => {
  const { data } = await axios.get('/posts', {
    proxy: { host: '127.0.0.1', port: 3000 },
  })
  console.log(data)
  return { props: { posts: data } }
}

const Wrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 800px;
  padding-left: 15px;
  padding-right: 15px;
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
      <Wrapper>
        <Posts posts={posts} />
      </Wrapper>
    </>
  )
}

export default Home
