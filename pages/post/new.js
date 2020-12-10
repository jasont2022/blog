/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Alert } from 'react-bootstrap'
import s from 'styled-components'
import axios from 'axios'
import Navbar from '../../components/Navbar'

const FormWrapper = s.div`
  width: 100%;
  box-sizing: border-box;
  margin: 20px auto 0px auto;
  max-width: 600px;
  padding-left: 15px;
  padding-right: 15px;
`

const SubmitButton = s.button`
  width: 100%;
  border: none;
  padding: 17px 32px;
  text-decoration: none;
  border-radius: 10px;
  background: linear-gradient(-70deg,#ff7170,#ffe57f);
  color: white;
  opacity: ${props => (props.disable ? 0.5 : 1)};
  :disabled:hover {
    cursor: not-allowed;
  }
`

const PostForm = () => {
  const router = useRouter()
  const [activeUser, setActiveUser] = useState('') // logged in user
  const [errMsg, setErrMsg] = useState('')
  const [count, setCount] = useState(0) // to trigger the useEffect
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    const getUser = async () => {
      try {
        // might need more than username, get profile picture
        const { data: { username } } = await axios.get('/user')
        username ? setActiveUser(username) : router.push('/')
        console.log(username)
      } catch (err) {
        console.log(err)
        router.push('/')
      }
    }
    getUser()
  }, [count])

  const createPost = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/posts', { title, category, text })
      console.log(res)
      router.push('/')
    } catch (err) {
      setErrMsg(`${err}`)
    }
  }

  return (
    <>
      <Navbar
        user={activeUser}
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
      <FormWrapper>
        <h1 style={{ textAlign: 'center' }}>Create New Post</h1>
        <Form style={{ marginTop: '1.5em' }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tile"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCategory">
            <Form.Label>Category <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Text <span style={{ color: 'red' }}>*</span></Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter text"
              value={text}
              onChange={e => setText(e.target.value)}
            />
          </Form.Group>
          <p style={{ marginTop: '1rem' }}><span style={{ color: 'red' }}>*</span> Fields are required</p>
          <SubmitButton
            style={{ margin: '1rem 0' }}
            onClick={e => createPost(e)}
            disabled={!title || !category || !text}
            disable={!title || !category || !text}
          >
            Create New Post
          </SubmitButton>
        </Form>
      </FormWrapper>
    </>
  )
}

export default PostForm
