import { ChangeEvent, FC, FormEvent, FormEventHandler, ReactElement, useState } from 'react'
import { CustomInput } from '@ui/input'
import './index.scss'
import { Link, Route, useNavigate } from 'react-router-dom'
import { CustomButton } from '@ui/button'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import logo from '@images/logo.png'
import apartmentLogo from '@images/apartment.png'
import chargesLogo from '@images/charges.png'
import { AuthService } from '@services/auth'
import interceptor from '@services/interceptor'
import customAxios from '@services/interceptor'

type Props = {}

export const Register: FC = (props: Props): ReactElement => {
  /*
   * State for input elements
   */
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullName] = useState('')
  const [newApartment, setNewApartment] = useState('')
  const [unitRate, setUnitRate] = useState(0)

  /*
   * Stores the active state for which form is currently active on the page.
   */
  const [isApartmentOnboardingFormActive, setIsApartmentOnboardingFormActive] = useState(false)
  const [isRegisterFormActive, setIsRegisterFormActive] = useState(true)
  const [isUtilityChargesFormActive, setIsUtilityChargesFormActive] = useState(false)

  const navigate = useNavigate()

  /*
   * Change Event handlers for the input elements
   */
  const getFullName = (event: ChangeEvent<HTMLInputElement>) => {
    setFullName(event.target.value)
  }

  const getUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const getPassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const getApartment = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewApartment(event.target.value)
  }
  const getUnitRate = (event: ChangeEvent<HTMLInputElement>): void => {
    setUnitRate(Number(event.target.value))
  }

  /*
   * Register the caretaker onsubmit for register form
   */
  const handleRegisterFormSubmit: FormEventHandler<HTMLFormElement> | undefined = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    const registerOptions: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://waba-api.rascan.co.ke/api/register',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        name: fullname,
        username,
        password,
      },
    }

    axios
      .request(registerOptions)
      .then((response: AxiosResponse<any, any>) => {
        AuthService.setLocalStorage(response)
        setIsRegisterFormActive(false)
        setIsApartmentOnboardingFormActive(true)
        history.replaceState({}, '', 'http://localhost:3000/onboarding/apartments')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  /*
   * Sets configuration details necessary for proper functioning of application i.e
   * unit_rate
   * name (of the apartment)
   *
   */
  const addApartment: FormEventHandler<HTMLFormElement> | undefined = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault()

    const addApartmentOptions: AxiosRequestConfig = {
      method: 'POST',
      url: 'https://waba-api.rascan.co.ke/api/apartments',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        name: newApartment,
        unit_rate: unitRate,
      },
    }

    customAxios
      .request(addApartmentOptions)
      .then((response) => {
        console.log(response)
        navigate('/')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  const goToUtilityChargesConfigPage: FormEventHandler<HTMLFormElement> | undefined = (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
    setIsApartmentOnboardingFormActive(false)
    setIsUtilityChargesFormActive(true)
    history.replaceState({}, '', 'http://localhost:3000/onboarding/apartments')
  }
  return (
    <main className="register">
      {isRegisterFormActive && (
        <form
          action=""
          method="post"
          className="register--form"
          onSubmit={handleRegisterFormSubmit}
        >
          <img className="register--form--logo" src={logo} />
          <div className="register--form--title">
            <h2>Sign Up</h2>
            <p>Register your caretaker account</p>
          </div>
          <CustomInput
            className="register--input"
            label="Full Name"
            type="text"
            id="password"
            autoComplete="email"
            handleChange={getFullName}
          />
          <CustomInput
            className="register--input"
            label="Username"
            type="text"
            id="password"
            autoComplete="email"
            handleChange={getUsername}
          />
          <CustomInput
            className="register--input"
            label="Password"
            id="password"
            type="password"
            autoComplete="newPassword"
            handleChange={getPassword}
          />

          <CustomButton className="register--form--button" value="Register" type="submit" />
          <h3 className="register--form--option">
            Already have an account? <Link to="/auth/login">Login</Link>
          </h3>
        </form>
      )}

      {isApartmentOnboardingFormActive && (
        <form className="card" onSubmit={goToUtilityChargesConfigPage}>
          <h1 className="card--text card--text__title">Welcome, </h1>
          <p className="card--text card--text__subtitle">
            Let us help you set up in order to get started with waba quickly
          </p>
          <img className="card--image" src={apartmentLogo} alt="apartment logo" />
          <CustomInput
            className="card--input"
            type="text"
            label="Enter your apartments' name"
            handleChange={getApartment}
          />
          <CustomButton type="submit" value="Save and Continue" />
        </form>
      )}

      {isUtilityChargesFormActive && (
        <form className="card" action="" onSubmit={addApartment}>
          <h1 className="card--text card--text__title">Welcome, </h1>
          <p className="card--text card--text__subtitle">
            Let us help you set up in order to get started with waba quickly
          </p>
          <img className="card--image" src={chargesLogo} alt="charges logo" />
          <CustomInput
            className="card--input"
            type="number"
            label="What is your unit charge *"
            handleChange={getUnitRate}
          />
          <CustomInput className="card--input" type="text" label="What is your flat rate charge" />
          <CustomInput
            className="card--input"
            type="text"
            label="What is your flat rate unit limit"
          />
          <CustomButton type="submit" value="Configure utility charges" />
        </form>
      )}
    </main>
  )
}
