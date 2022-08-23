import { FC, useState } from "react";
import { Onboarding } from "@pages/onboarding";
import { Verification } from "@pages/verification";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "@pages/dashboard";
import { Register } from "@pages/register";
import { Login } from "@pages/login";
import { MeterReadings } from "@pages/dashboard/meter-readings";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ProtectedRoute } from "@components/navigation-guards/protected-route";
import { OnboardingRoute } from "@components/navigation-guards/onboarding-route";

type Props = {};

const theme = createTheme({
  typography: {
    fontFamily: ["Nunito", "Open Sans", "roboto", "sans-serif"].join(","),
  },
});

export const App: FC<Props> = ({}) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleIsRegisteringState: (state: boolean) => void = (
    state: boolean
  ) => {
    setIsRegistering(state);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="auth/register"
            element={
              <Register toggleIsRegisteringState={toggleIsRegisteringState} />
            }
          />
          <Route path="auth/login" element={<Login />} />
          <Route
            path="verification"
            element={
              <Verification
                isRegistering={isRegistering}
                toggleIsRegisteringState={toggleIsRegisteringState}
              />
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="meter-readings" element={<MeterReadings />} />
            <Route element={<OnboardingRoute isRegistering={isRegistering} />}>
              <Route path="onboarding" element={<Onboarding />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
