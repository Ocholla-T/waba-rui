import axios from 'axios'
import { ChangeEvent, FC, FormEvent, FormEventHandler, ReactElement, useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { CustomButton } from '@ui/button'
import { CustomInput } from '@ui/input'
import { AuthService } from '@services/auth'
import logo from '@images/logo.png'

import './_index.scss'

type loginProps = {}

export const Login: FC<loginProps> = ({}: loginProps): ReactElement => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const device_name = navigator.userAgent
  const navigate: NavigateFunction = useNavigate()

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()
    axios
      .post('https://waba-api.rascan.co.ke/api/token/generate', { username, password, device_name })
      .then((response) => {
        if (response.status === 200) {
          AuthService.setLocalStorage(response)
          navigate('/')
        }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const getUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  return (
    <main className="register">
      <form action="" method="post" className="login--form" onSubmit={handleSubmit}>
        <img className="register--form--logo" src={logo} />
        <div className="login--form--title">
          <h2>Sign In</h2>
          <p>Access your caretaker account</p>
        </div>
        <CustomInput
          className="login--input"
          id="username"
          label="Username"
          type="text"
          autoComplete="email"
          handleChange={getUsername}
        />
        <CustomInput
          className="login--input"
          id="password"
          label="Password"
          type="password"
          autoComplete="newPassword"
          handleChange={getPassword}
        />
        <CustomButton className="login--form--button" value="Log In" type="submit" />
        <h3 className="login--form--option">
          Don't have an account, <Link to="/auth/register">Register</Link>
        </h3>
      </form>
    </main>
  )
}
