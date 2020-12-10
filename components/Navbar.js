/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import s from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navbar, Nav } from 'react-bootstrap'

const Button = s.button`
  width: 100px;
  border: none;
  padding: 5px 10px;
  color: white;
  text-decoration: none;
  border-radius: 10px;
  background: linear-gradient(-70deg,#ff7170,#ffe57f);
`

const NavBar = ({
  user, setErrMsg, count, setCount,
}) => {
  const router = useRouter()

  const logout = async () => {
    try {
      const res = await axios.post('/account/logout')
      console.log(res)
      setCount(count + 1)
      router.push('/')
    } catch (err) {
      setErrMsg(`${err}`)
    }
  }

  return (
    <Navbar
      expand="lg"
      bg="light"
      variant="light"
      style={{ paddingTop: '15px', paddingBottom: '15px' }}
    >
      <Link href="/">
        <a><Navbar.Brand>Blog</Navbar.Brand></a>
      </Link>
      <Nav className="ml-auto">
        {user ? (
          <>
            <Link href={`/${user}`}>
              <a><Navbar.Text style={{ marginRight: '30px' }}>Profile</Navbar.Text></a>
            </Link>
            <Link href="/post/new">
              <a><Navbar.Text style={{ marginRight: '30px' }}>New Post</Navbar.Text></a>
            </Link>
            <Button onClick={() => logout()}>Logout</Button>
          </>
        ) : (
          <Link href="/login">
            <a><Button>Login</Button></a>
          </Link>
        )}
      </Nav>
    </Navbar>
  )
}

export default NavBar
