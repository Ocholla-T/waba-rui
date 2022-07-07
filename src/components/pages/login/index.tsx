import { FC, FormEvent, FormEventHandler, ReactElement } from 'react'
import { Link } from 'react-router-dom'
import { CustomButton } from '@ui/button'
import { CustomInput } from '@ui/input'
import './_index.scss'

type loginProps = {}

export const Login: FC<loginProps> = ({}: loginProps): ReactElement => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()
    console.log(event.target)
  }
  return (
    <main className="register">
      <form action="" method="post" className="register--form" onSubmit={handleSubmit}>
        <h1 className="register--form--title">Waba</h1>
        <h3>
          Don't have an account, <Link to="/auth/register">sign up</Link>
        </h3>
        <CustomInput
          className="register--input"
          id="username"
          label="Username"
          type="text"
          autoComplete="email"
        />
        <CustomInput
          className="register--input"
          id="password"
          label="Password"
          type="password"
          autoComplete="newPassword"
        />
        <CustomButton value="Sign Up" type="submit" />
      </form>
    </main>
  )
}
