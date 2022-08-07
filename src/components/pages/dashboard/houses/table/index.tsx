import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined'

import { FC, memo, MutableRefObject, ReactElement, useRef, useState } from 'react'

type Props = {
  houses: House[]
}

type House = {
  house_number: string
  tenant_id: string
  tenant: string
  tenancy: string
}

export const HouseTable: FC<Props> = memo(({ houses }): ReactElement => {
  const buttonRef: MutableRefObject<HTMLButtonElement[]> = useRef(new Array())
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const open = Boolean(anchorEl)
  const handleOpen = (index: number) => {
    setAnchorEl(buttonRef.current[index])
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <TableContainer component={Box}>
      <Table aria-label="table of houses, tenants and water bill balance" size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '.75rem',
                letterSpacing: '.0178571429em ',
                lineHeight: '1.25rem',
                fontWeight: 700,
              }}
            >
              House number
            </TableCell>
            <TableCell
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '.75rem',
                letterSpacing: '.0178571429em ',
                lineHeight: '1.25rem',
                fontWeight: 700,
              }}
            >
              Tenant name
            </TableCell>
            <TableCell
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '.75rem',
                letterSpacing: '.0178571429em ',
                lineHeight: '1.25rem',
                fontWeight: 700,
              }}
            >
              Balance
            </TableCell>
            <TableCell
              sx={{
                color: 'rgba(0, 0, 0, 0.6)',
                fontSize: '.75rem',
                letterSpacing: '.0178571429em ',
                lineHeight: '1.25rem',
                fontWeight: 700,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {houses.map(({ house_number, tenant }, index) => (
            <TableRow key={house_number}>
              <TableCell sx={{ alignItems: 'center' }}>
                <IconButton size="small" sx={{ mr: '.25rem' }}>
                  <VillaOutlinedIcon fontSize="inherit" sx={{ color: 'rgb(46, 204, 113)' }} />
                </IconButton>
                {house_number}
              </TableCell>
              <TableCell>{tenant ?? 'n/a'}</TableCell>
              <TableCell>-</TableCell>
              <TableCell>
                <IconButton
                  ref={(element: HTMLButtonElement | null) => {
                    buttonRef.current.push(element as HTMLButtonElement)
                  }}
                  id="actions-button"
                  aria-controls={open ? 'actions-menu' : undefined}
                  aria-haspopup="menu"
                  aria-expanded={open ? 'true' : undefined}
                  onClick={() => handleOpen(index)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="actions-menu"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'actions-button',
                  }}
                  open={open}
                  sx={{
                    '& .MuiMenuItem-root': {
                      fontSize: '.825rem',
                      pr: '2.5rem',
                    },
                  }}
                >
                  <MenuItem>Rent house</MenuItem>
                  <MenuItem>Vacate tenant</MenuItem>
                  <MenuItem>Record Reading</MenuItem>
                  <MenuItem>Collect Payment</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
