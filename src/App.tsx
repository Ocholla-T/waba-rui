import { FC, useState } from 'react'
import { Onboarding } from '@pages/onboarding'
import { Verification } from '@pages/verification'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '@pages/dashboard'
import { Register } from '@pages/register'
import { Login } from '@pages/login'
import { MeterReadings } from '@pages/dashboard/meterReadings'

type AppProps = {}

export const App: FC<AppProps> = ({}: AppProps) => {
  const [isRegistering, setIsRegistering] = useState(false)

  const toggleIsRegisteringState: (state: boolean) => void = (state: boolean) => {
    setIsRegistering(state)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="auth/register"
          element={<Register toggleIsRegisteringState={toggleIsRegisteringState} />}
        />
        <Route path="auth/login" element={<Login />} />
        <Route path="onboarding" element={<Onboarding />} />
        <Route
          path="verification"
          element={
            <Verification
              isRegistering={isRegistering}
              toggleIsRegisteringState={toggleIsRegisteringState}
            />
          }
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="meter-readings" element={<MeterReadings />} />
      </Routes>
    </BrowserRouter>
  )
}
