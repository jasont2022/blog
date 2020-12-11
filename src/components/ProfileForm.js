/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import s from 'styled-components'
import { Modal, Form } from 'react-bootstrap'

const Button = s.button`
  width: 100%;
  border: none;
  padding: 17px 32px;
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

const ProfileForm = props => {
  const router = useRouter()
  const { setErrMsg, ...rest } = props
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [avatar, setAvatar] = useState('')

  const editProfile = async () => {
    try {
      const res = await axios.post('/profile/edit', {
        password, email, firstname, lastname, avatar,
      })
      console.log(res)
      router.push(`/${props.username}`)
    } catch (err) {
      props.setErrMsg(`${err}`)
    }
  }

  return (
    <Modal
      {...rest}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      styled={{ borderRadius: '10px' }}
    >
      <Modal.Body>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstname}
            onChange={e => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name <span style={{ color: 'red' }}>*</span></Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastname}
            onChange={e => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.File
          style={{ marginTop: '1rem' }}
          id="custom-file"
          label="Upload Avater"
          custom
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
        />
        <p style={{ marginTop: '1rem' }}>
          <span style={{ color: 'red' }}>*</span> Fields are required
        </p>
        <Button
          style={{ marginTop: '1rem' }}
          onClick={() => {
            editProfile()
            setEmail('')
            setPassword('')
            setFirstName('')
            setLastName('')
            props.onHide()
          }}
          disabled={!email || !password || !firstname || !lastname}
          disable={!email || !password || !firstname || !lastname}
        >
          Edit Profile
        </Button>
        <Button
          style={{ marginTop: '1rem' }}
          onClick={props.onHide}
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  )
}

export default ProfileForm
