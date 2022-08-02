import { Button, Card, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  ReactElement,
  useState,
} from 'react'
import ApartmentLogo from '@images/apartment.png'
import './_index.scss'
import { AuthService } from '@services/auth'
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom'
import customAxios from '@services/interceptor'

type OnboardingProps = {}

type Errors = {
  name: string[]
  unit_rate: string[]
  flat_rate: string[]
  flat_rate_limit: string[]
}

export const Onboarding: FC<OnboardingProps> = ({}: OnboardingProps): ReactElement => {
  const initialErrorValues: Errors = {
    name: [''],
    unit_rate: [''],
    flat_rate: [''],
    flat_rate_limit: [''],
  }

  const [inputValue, setInputValue] = useState({
    name: '',
    unit_rate: '',
    flat_rate: '',
    flat_rate_limit: '',
  })
  const [errors, setErrors] = useState<Errors>(initialErrorValues)

  const navigate = useNavigate()

  const handleChange: ChangeEventHandler<HTMLInputElement> = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    const { id, value } = event.target

    setInputValue({
      ...inputValue,
      [id]: value,
    })
  }

  const configureApartment: FormEventHandler<HTMLDivElement> = async (
    event: FormEvent<HTMLDivElement>,
  ): Promise<void> => {
    event.preventDefault()

    const config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: '/apartments',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        ...inputValue,
      },
    }

    customAxios
      .request(config)
      .then((response: AxiosResponse<any, any>) => {
        AuthService.setLocalStorage(response)
        navigate('/')
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
        onSubmit={configureApartment}
      >
        <div className="onboarding--text">
          <h1 className="onboarding--text--title">
            Welcome,{' '}
            {`${JSON.stringify(AuthService.getLocalStorage().data.user.name).replace(
              /['"]+/g,
              '',
            )}`}
          </h1>
          <p className="onboarding--text--subtitle">
            Let us help you set up in order to get started with waba quickly
          </p>
        </div>
        <img className="onboarding--image" src={ApartmentLogo} alt="Apartment logo" />
        <TextField
          className="register-form--input"
          required
          id="name"
          label="Apartment Name"
          placeholder="Enter the name of the apartment"
          type="text"
          autoComplete="organization"
          fullWidth
          size="small"
          sx={{
            marginTop: ' 1.1875rem',
          }}
          error={errors.name[0].length > 0}
          helperText={errors.name[0].length > 0 && `${errors.name[0]}`}
          value={inputValue.name}
          onChange={handleChange}
        />

        <TextField
          className="register-form--input"
          required
          id="unit_rate"
          label="Unit Rate"
          placeholder="Enter the unit rate of the apartment"
          type="number"
          fullWidth
          size="small"
          sx={{
            marginTop: ' 1.1875rem',
          }}
          error={errors['unit_rate'][0].length > 0}
          helperText={errors['unit_rate'][0].length > 0 && `${errors['unit_rate'][0]}`}
          value={inputValue['unit_rate']}
          onChange={handleChange}
        />

        <TextField
          className="register-form--input"
          required
          id="flat_rate"
          label="Flat Rate"
          placeholder="Enter the flat rate of the apartment"
          type="number"
          fullWidth
          size="small"
          sx={{
            marginTop: ' 1.1875rem',
          }}
          error={errors['flat_rate'][0].length > 0}
          helperText={errors['flat_rate'][0].length > 0 && `${errors['flat_rate'][0]}`}
          value={inputValue['flat_rate']}
          onChange={handleChange}
        />

        <TextField
          className="register-form--input"
          required
          id="flat_rate_limit"
          label="Flat Rate Limit"
          placeholder="Enter the flat rate limit of the apartment"
          type="number"
          fullWidth
          size="small"
          sx={{
            marginTop: ' 1.1875rem',
          }}
          error={errors['flat_rate_limit'][0].length > 0}
          helperText={errors['flat_rate_limit'][0].length > 0 && `${errors['flat_rate_limit'][0]}`}
          value={inputValue['flat_rate_limit']}
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
          Configure Apartment
        </Button>
      </Card>
    </Box>
  )
}
