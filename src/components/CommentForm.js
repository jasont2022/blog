/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import s from 'styled-components'
import { Form } from 'react-bootstrap'

const Button = s.button`
  hieght: 60px;
  width: 100px;
  padding: 5px 10px;
  border: none;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  background: linear-gradient(-70deg,#ff7170,#ffe57f);
  opacity: ${props => (props.disable ? 0.5 : 1)};
  :hover:enabled {
    transform: scale(1.02);
  }
  :disabled:hover {
    cursor: not-allowed;
  }
`

const CommentForm = ({
  id, title, setErrMsg, setIsCommenting,
}) => {
  const router = useRouter()
  const [text, setText] = useState('')

  const addComment = async () => {
    try {
      const res = await axios.post('/comments', { title, text })
      console.log(res)
      router.push(`/post/${id}`)
    } catch (err) {
      setErrMsg(`${err}`)
    }
  }

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <Form.Group controlId="formBasicText">
        <Form.Control
          as="textarea"
          placeholder="What are your thoughts?"
          value={text}
          onChange={e => setText(e.target.value)}
        />
      </Form.Group>
      <Button
        style={{ marginTop: '0.5rem' }}
        onClick={() => {
          addComment()
          setText('')
          setIsCommenting()
        }}
        disabled={!text}
        disable={!text}
      >
        Respond
      </Button>
      <Button
        style={{ marginLeft: '1rem' }}
        onClick={setIsCommenting}
      >
        Cancel
      </Button>
    </div>
  )
}

export default CommentForm
