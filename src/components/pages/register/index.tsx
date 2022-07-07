import { FC, FormEvent, FormEventHandler, MouseEvent, MouseEventHandler, ReactElement } from 'react'
import { CustomInput } from '@ui/input'
import './index.scss'
import { Link, Route } from 'react-router-dom'
import { CustomButton } from '@ui/button'

type Props = {}

export const Register: FC = (props: Props): ReactElement => {
  const handleSubmit: FormEventHandler<HTMLFormElement> | undefined = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    console.log(event.target)
  }

  return (
    <main className="register">
      <form action="" method="post" className="register--form" onSubmit={handleSubmit}>
        <h1 className="register--form--title">Waba</h1>
        <h3>
          Create your account, or <Link to="/auth/login">sign in</Link>
        </h3>
        <CustomInput
          className="register--input"
          label="Username"
          type="text"
          id="password"
          autoComplete="email"
        />
        <CustomInput
          className="register--input"
          label="Password"
          id="password"
          type="password"
          autoComplete="newPassword"
        />
        <CustomInput
          className="register--input"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="newPassword"
        />
        <CustomButton value="Sign Up" type="submit" />
      </form>
    </main>
  )
}
