import { ChangeEventHandler, FC, FormEventHandler, ReactElement, useState } from 'react'
import './index.scss'
import Logo from '@images/logo.png'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { Card, TextField } from '@mui/material'

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { AuthService } from '@services/auth'
import { useNavigate } from 'react-router-dom'

type RegisterProps = {
  toggleIsRegisteringState: (state: boolean) => void
}

type NewUser = {
  name: string
  phone: string
}

type Errors = {
  name: string[]
  phone: string[]
}

export const Register: FC<RegisterProps> = ({ toggleIsRegisteringState }): ReactElement => {
  const initialUserValues: NewUser = {
    name: '',
    phone: '',
  }

  const initialErrorValues: Errors = {
    name: [''],
    phone: [''],
  }

  /*
   * State for input elements
   */

  const [inputValue, setInputValue] = useState<NewUser>(initialUserValues)
  /*
   * State to track error response from API
   */

  const [errors, setErrors] = useState<Errors>(initialErrorValues)

  const navigate = useNavigate()

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
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

  const registerCaretaker: FormEventHandler<HTMLDivElement> = async (event): Promise<void> => {
    event.preventDefault()

    /*
     * reset values in errors object
     */
    setErrors(initialErrorValues)

    const config: AxiosRequestConfig<any> = {
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
        AuthService.setLocalStorage(response)
        toggleIsRegisteringState(true)
        navigate('/verification')
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
      <Box
        sx={{
          minWidth: '100vw',
          minHeight: '100vh',
          maxHeight: { xs: '100vh' },
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
          <h1 className="register-form--title">WABA</h1>
          <img className="register-form--image" src={Logo} alt="waba logo" />
          <div className="register-form--text">
            <h2 className="register-form--text__subtitle">Sign Up</h2>
            <p className="register-form--text__desc">Register a caretaker account</p>
          </div>
          <TextField
            required
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
            error={errors.name[0].length > 0}
            helperText={errors.name[0].length > 0 && `${errors.name[0]}`}
            value={inputValue.name}
            onChange={handleInputChange}
          />
          <TextField
            className="register-form--input"
            required
            id="phone"
            label="Phone number"
            placeholder="+254 ********"
            type="tel"
            autoComplete="new-password"
            fullWidth
            size="small"
            sx={{
              marginTop: ' 1.1875rem',
            }}
            error={errors.phone[0].length > 0}
            helperText={errors.phone[0].length > 0 && `${errors.phone[0]}`}
            value={inputValue.phone}
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
    </main>
  )
}
