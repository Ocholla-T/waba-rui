import Logo from '@images/logo.png'
import { Box, Button, Card, TextField } from '@mui/material'
import { AuthService } from '@services/auth'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  ReactElement,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import './_index.scss'

type LoginProps = {}

export const Login: FC<LoginProps> = ({}: LoginProps): ReactElement => {
  const [inputValue, setInputValue] = useState({ phone: '' })
  const navigate = useNavigate()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target

    setInputValue({ phone: value })
  }

  const generateCode: FormEventHandler<HTMLDivElement> = async (
    event: FormEvent<HTMLDivElement>,
  ): Promise<void> => {
    event.preventDefault()

    const config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: 'https://waba-api.rascan.co.ke/api/code/generate',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        ...inputValue,
      },
    }

    await axios
      .request(config)
      .then((response: AxiosResponse<any, any>) => {
        localStorage.setItem(
          'waba_caretaker',
          JSON.stringify({ data: { user: { phone: inputValue.phone } } }),
        )
        navigate('/verification')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <main className="login">
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
          className="login-form"
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
          onSubmit={generateCode}
        >
          <h1 className="login-form--title">WABA</h1>
          <img className="login-form--image" src={Logo} alt="waba logo" />
          <div className="login-form--text">
            <h2 className="login-form--text__subtitle">Login</h2>
            <p className="login-form--text__desc">Sign in to your caretaker account</p>
          </div>

          <TextField
            className="login-form--input"
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
            // error={errors.phone[0].length > 0}
            // helperText={errors.phone[0].length > 0 && `${errors.phone[0]}`}
            value={inputValue.phone}
            onChange={handleChange}
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
            Generate Code
          </Button>
        </Card>
      </Box>
    </main>
  )
}
