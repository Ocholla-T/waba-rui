import { FC, MouseEventHandler, ReactElement, useRef } from 'react'

import './_styles.scss'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@mui/material'
import Logo from '@images/logo.png'
import { AuthService } from '@services/auth'
import LogoutIcon from '@mui/icons-material/PowerSettingsNewOutlined'
import { cyan, pink } from '@mui/material/colors'
import { useLocation, useMatch, useNavigate } from 'react-router-dom'
import {
  AvTimerOutlined,
  HolidayVillageOutlined,
  InsertChartOutlinedTwoTone,
} from '@mui/icons-material'

type NavigationBarProps = {}

export const NavigationBar: FC<NavigationBarProps> = ({}): ReactElement => {
  const navigate = useNavigate()
  const button = useRef<HTMLButtonElement | null>(null)
  const matchesHouses = useMatch('/')
  const matchedMeterReadings = useMatch('meter-readings')
  const color = {
    active: '#00aaa7',
    inactive: 'rgba(0, 0, 0, 0.6)',
  }
  const name =
    (AuthService.getLocalStorage().data.name as string) ??
    (AuthService.getLocalStorage().data.apartment.name as string)

  const logoutCaretaker: VoidFunction = (): void => {
    AuthService.logout()
    navigate('/auth/login')
  }

  const pages = ['Houses', 'Meter Readings']

  const goToPage = (page: string) => {
    switch (page) {
      case 'Houses':
        navigate('/')
        break
      case 'Meter Readings':
        navigate('/meter-readings')
        break
    }
  }

  const current_location = useLocation()

  return (
    <>
      <AppBar color='inherit' sx={{ position: 'relative' }}>
        <Toolbar sx={{ justifyContent: 'space-between ' }}>
          <div className='nav--title'>
            <img className='nav--title--logo' src={Logo} alt='waba logo' />
            <Typography
              variant='h6'
              noWrap
              component='div'
              sx={{
                display: { xs: 'none', sm: 'block' },
                color: 'rgba(0, 0, 0, 0.6)',
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {name}
            </Typography>
          </div>
          <Box
            sx={{
              ml: '1rem',
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
            }}
          >
            {pages.map((page) => (
              <Button
                ref={button}
                type='button'
                key={page}
                sx={{
                  mx: '.5rem',
                  px: '1rem',
                  textTransform: 'none',
                  display: 'block',
                  fontWeight:
                    page === 'Houses' && matchesHouses
                      ? '500'
                      : page === 'Meter Readings' && matchedMeterReadings
                      ? '500'
                      : '400',
                  fontSize: 14,
                  color:
                    page === 'Houses' && matchesHouses
                      ? color.active
                      : page === 'Meter Readings' && matchedMeterReadings
                      ? color.active
                      : color.inactive,
                }}
                onClick={() => goToPage(page)}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div className='nav--profile_information'>
            <Avatar
              sx={{
                bgcolor: cyan[800],
                fontSize: 14,
                width: 34,
                height: 34,
              }}
            >
              {name.charAt(0)}
            </Avatar>
            <IconButton aria-label='logout' onClick={logoutCaretaker}>
              <LogoutIcon fontSize='small' sx={{ color: pink[500] }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* mobile menu */}
      <AppBar
        color='inherit'
        sx={{
          display: { md: 'none' },
          top: 'auto',
          bottom: 0,
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-evenly',
            gap: '.5rem',
          }}
        >
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
            }}
            onClick={() => goToPage('Houses')}
          >
            <HolidayVillageOutlined
              fontSize='medium'
              sx={{
                color:
                  current_location.pathname === '/'
                    ? color.active
                    : color.inactive,
              }}
            />
            <Link
              sx={{
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: current_location.pathname === '/' ? '500' : '400',
                color:
                  current_location.pathname === '/'
                    ? color.active
                    : color.inactive,
              }}
            >
              Houses
            </Link>
          </Button>
          <Button
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textTransform: 'none',
            }}
            onClick={() => goToPage('Meter Readings')}
          >
            <AvTimerOutlined
              fontSize='medium'
              sx={{
                color:
                  current_location.pathname === '/meter-readings'
                    ? color.active
                    : color.inactive,
              }}
            />
            <Link
              sx={{
                textDecoration: 'none',
                fontSize: 14,
                fontWeight:
                  current_location.pathname === '/meter-readings'
                    ? '500'
                    : '400',
                color:
                  current_location.pathname === '/meter-readings'
                    ? color.active
                    : color.inactive,
              }}
            >
              Readings
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}
