import { Button, Card, TextField } from '@mui/material'
import { Box } from '@mui/system'
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

type VerificationProps = {
  toggleIsRegisteringState: (state: boolean) => void
  isRegistering: boolean
}

export const Verification: FC<VerificationProps> = ({
  isRegistering,
  toggleIsRegisteringState,
}: VerificationProps): ReactElement => {
  const [inputValue, setInputValue] = useState({ code: '' })
  const navigate = useNavigate()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { value } = event.target

    setInputValue({ code: value })
  }

  const verifyCaretaker: FormEventHandler<HTMLDivElement> = async (
    event: FormEvent<HTMLDivElement>,
  ): Promise<void> => {
    event.preventDefault()

    const config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: 'https://waba-api.rascan.co.ke/api/login',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        phone: AuthService.getLocalStorage().data.user.phone,
        ...inputValue,
      },
    }

    await axios
      .request(config)
      .then((response: AxiosResponse<any, any>) => {
        AuthService.setLocalStorage(response)
        if (isRegistering) {
          toggleIsRegisteringState(false)

          navigate('/onboarding')
        } else navigate('/')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
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
        onSubmit={verifyCaretaker}
      >
        <h1>Verify</h1>
        <TextField
          name="code"
          fullWidth
          type="number"
          size="small"
          InputLabelProps={{
            style: {
              fontSize: 14,
            },
          }}
          sx={{
            marginTop: ' 1.1875rem',
          }}
          placeholder="Enter Verification Code"
          autoComplete="one-time-code"
          value={inputValue.code}
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
          Verify Code
        </Button>
      </Card>
    </Box>
  )
}
