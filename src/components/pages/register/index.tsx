import {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  MutableRefObject,
  ReactElement,
  useRef,
  useState,
} from 'react'
import './index.scss'
import Logo from '@images/logo.png'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Card, TextField } from '@mui/material'

import axios, { AxiosError, AxiosResponse } from 'axios'

type RegisterProps = {}

type NewUser = {
  name: string
  username: string
  password: string
}

type Errors = {
  username: string[]
  password: string[]
}

export const Register: FC<RegisterProps> = (props: RegisterProps): ReactElement => {
  const initialUserValues: NewUser = {
    name: '',
    password: '',
    username: '',
  }

  const initialErrorValues: Errors = {
    password: [''],
    username: [''],
  }

  /*
   * State for input elements
   */

  const [inputValue, setInputValue] = useState<NewUser>(initialUserValues)
  const [isRegisterFormActive, setIsRegisterFormActiveState] = useState<boolean>(true)

  /*
   * State to track error response from API
   */

  const [errors, setErrors] = useState<Errors>(initialErrorValues)

  const textfield: MutableRefObject<HTMLDivElement[]> = useRef([])

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { id, value } = event.target

    setErrors(initialErrorValues)

    setInputValue({
      ...inputValue,
      [id]: value,
    })
  }

  /*
   * Register the caretaker onsubmit for register form
   */

  const registerCaretaker: FormEventHandler<HTMLDivElement> = async (
    event: FormEvent<HTMLDivElement>,
  ): Promise<void> => {
    event.preventDefault()

    /*
     * reset values in errors object
     */
    setErrors(initialErrorValues)

    const config = {
      method: 'POST',
      url: 'https://waba-api.rascan.co.ke/api/register',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        ...inputValue,
      },
    }

    await axios
      .request(config)
      .then((response: AxiosResponse<any>) => {
        console.log(response.data)
      })
      .catch(async (error): Promise<void> => {
        if (error instanceof AxiosError) {
          if ((error.response as AxiosResponse<any, any>).status === 422) {
            setErrors({ ...errors, ...(error.response as AxiosResponse<any, any>).data.errors })
          }
        }
      })
  }

  return (
    <main className="register">
      {isRegisterFormActive && (
        <Box
          sx={{
            minWidth: '100vw',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Card
            className="register-form"
            variant="outlined"
            component="form"
            sx={{
              display: 'flex',
              width: { xs: '95%', sm: '30%' },
              padding: '2rem ',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '20px',
            }}
            onSubmit={registerCaretaker}
          >
            <h1 className="register-form--title">Waba</h1>
            <img className="register-form--image" src={Logo} alt="waba logo" />
            <div className="register-form--text">
              <h2 className="register-form--text__subtitle">Sign Up</h2>
              <p className="register-form--text__desc">Register a caretaker account</p>
            </div>

            <TextField
              ref={(element: HTMLDivElement) => (textfield.current[0] = element)}
              className="register-form--input"
              id="name"
              label="Full Name"
              fullWidth
              size="small"
              InputLabelProps={{
                style: {
                  fontSize: 14,
                },
              }}
              sx={{
                marginTop: ' 1.1875rem',
              }}
              value={inputValue.name}
              onChange={handleInputChange}
            />

            <TextField
              ref={(element: HTMLDivElement) => (textfield.current[1] = element)}
              className="register-form--input"
              InputLabelProps={{
                style: {
                  fontSize: 14,
                },
              }}
              required
              id="username"
              label="Username"
              autoComplete="username"
              fullWidth
              size="small"
              sx={{
                marginTop: ' 1.1875rem',
              }}
              error={errors.username[0].length > 0}
              helperText={errors.username[0].length > 0 && `${errors.username[0]}`}
              value={inputValue.username}
              onChange={handleInputChange}
            />

            <TextField
              ref={(element: HTMLDivElement) => (textfield.current[2] = element)}
              className="register-form--input"
              InputLabelProps={{ style: { fontSize: 14 } }}
              required
              id="password"
              label="Password"
              type="password"
              autoComplete="new-password"
              fullWidth
              size="small"
              sx={{
                marginTop: ' 1.1875rem',
              }}
              error={errors.password[0].length > 0}
              helperText={errors.password[0].length > 0 && `${errors.password[0]}`}
              value={inputValue.password}
              onChange={handleInputChange}
            />

            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                width: '100%',
                marginTop: ' 1.875rem',
                backgroundColor: '#00AAA7',
              }}
            >
              Register
            </Button>
          </Card>
        </Box>
      )}
    </main>
  )
}
