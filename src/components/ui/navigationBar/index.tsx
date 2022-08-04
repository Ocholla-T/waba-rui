import { FC, ReactElement } from 'react'

import './_styles.scss'
import { AppBar, Avatar, IconButton, Toolbar, Typography } from '@mui/material'
import Logo from '@images/logo.png'
import { AuthService } from '@services/auth'
import LogoutIcon from '@mui/icons-material/PowerSettingsNewOutlined'
import { cyan, pink } from '@mui/material/colors'
import { useNavigate } from 'react-router-dom'

type NavigationBarProps = {}

export const NavigationBar: FC<NavigationBarProps> = ({}): ReactElement => {
  const navigate = useNavigate()
  const name =
    (AuthService.getLocalStorage().data.name as string) ??
    (AuthService.getLocalStorage().data.apartment.name as string)

  const logoutCaretaker: VoidFunction = (): void => {
    AuthService.logout()
    navigate('/auth/login')
  }

  return (
    <AppBar color="inherit" sx={{ position: 'relative' }}>
      <Toolbar sx={{ justifyContent: 'space-between ' }}>
        <div className="nav--title">
          <img className="nav--title--logo" src={Logo} alt="waba logo" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: 'none', sm: 'block' },
              fontFamily: ['"nunito", sans-serif'],
              // color: '#00aaa7',
              fontWeight: 600,
              fontSize: 16,
            }}
          >
            {name}
          </Typography>
        </div>
        <div className="nav--profile_information">
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
          <IconButton aria-label="logout" onClick={logoutCaretaker}>
            <LogoutIcon fontSize="small" sx={{ color: pink[500] }} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  )
}
