/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Alert } from 'react-bootstrap'
import Navbar from '../../components/Navbar'

export const getStaticPaths = async () => {
  const { data } = await axios.get('/comments', {
    proxy: { host: '127.0.0.1', port: 3000 },
  })
  console.log(data)
  const paths = data.map(comment => ({
    params: { id: comment._id },
  }))
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async ({ params }) => {
  const { id } = params
  const { data } = await axios.get(`/comments/${id}`, {
    proxy: { host: '127.0.0.1', port: 3000 },
  })
  console.log(data)
  return { props: { comment: data } }
}

const Comment = ({ comment }) => {
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

  console.log(comment)

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
      Comment: {comment.text}
    </>
  )
}

export default Comment
