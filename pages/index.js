/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from 'styled-components'
import { Alert } from 'react-bootstrap'
import Navbar from '../components/Navbar'

const HomeWrapper = s.div`
  display: flex;
  flex-direction: row;
`

const Home = () => {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const [count, setCount] = useState(0) // to trigger the useEffect

  useEffect(() => {
    const getUser = async () => {
      try {
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
      {errMsg !== '' ? (
        <Alert variant="danger" onClose={() => setErrMsg('')} dismissible>
          {errMsg}
        </Alert>
      )
        : null}
      <HomeWrapper>
        Welcome to next.js!
      </HomeWrapper>
    </>
  )
}

export default Home
