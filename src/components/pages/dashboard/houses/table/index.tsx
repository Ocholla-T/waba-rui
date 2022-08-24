import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import VillaOutlinedIcon from '@mui/icons-material/VillaOutlined'

import { FC, memo, ReactElement } from 'react'
import { ActionsPopover } from './popover'
import { House } from '@pages/dashboard/types/houses'

type Props = {
  houses: House[]
}

export const HouseTable: FC<Props> = memo(({ houses }): ReactElement => {
  return (
    <>
      <TableContainer
        component={Box}
        sx={{ display: { xs: 'none', sm: 'block' } }}
      >
        <Table
          aria-label='table of houses, tenants and water bill balance'
          size='small'
          stickyHeader
        >
          <TableHead>
            <TableRow
              sx={{
                py: '.5rem',
              }}
            >
              <TableCell
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.825rem',
                  letterSpacing: '.0178571429em ',
                  lineHeight: '1.25rem',
                  fontWeight: 500,
                }}
              >
                House number
              </TableCell>
              <TableCell
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.825rem',
                  letterSpacing: '.0178571429em ',
                  lineHeight: '1.25rem',
                  fontWeight: 500,
                }}
              >
                Tenant name
              </TableCell>
              <TableCell
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.825rem',
                  letterSpacing: '.0178571429em ',
                  lineHeight: '1.25rem',
                  fontWeight: 500,
                }}
              >
                Balance
              </TableCell>
              <TableCell
                sx={{
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontSize: '.825rem',
                  letterSpacing: '.0178571429em ',
                  lineHeight: '1.25rem',
                  fontWeight: 500,
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {houses.map(({ house_number, tenant, id, tenancy }) => (
              <TableRow key={house_number} hover>
                <TableCell sx={{ alignItems: 'center', py: '.5rem' }}>
                  <IconButton size='small' sx={{ mr: '.25rem' }}>
                    <VillaOutlinedIcon
                      fontSize='inherit'
                      sx={{ color: 'rgb(46, 204, 113)' }}
                    />
                  </IconButton>
                  {house_number}
                </TableCell>
                <TableCell>{tenant?.name ?? 'n/a'}</TableCell>
                <TableCell>{tenancy?.running_balance ?? '-'}</TableCell>
                <TableCell>
                  <ActionsPopover
                    house_id={id}
                    tenant_name={tenant?.name ?? 'n/a'}
                    house_number={house_number}
                    tenant_id={tenant?.id}
                    tenancy={tenancy}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Mobile Table */}
      <TableContainer
        component={Box}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        <Table size='medium'>
          {houses.map(({ house_number, tenant, id, tenancy }) => (
            <TableRow>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.825rem',
                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  House number
                </Typography>
                <div>
                  <IconButton size='small' sx={{ mr: '.25rem' }}>
                    <VillaOutlinedIcon
                      fontSize='inherit'
                      sx={{ color: 'rgb(46, 204, 113)' }}
                    />
                  </IconButton>
                  {house_number}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.825rem',
                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  Tenant name
                </Typography>
                <Typography
                  sx={{
                    fontSize: '.825rem',
                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 400,
                  }}
                >
                  {tenant?.name ?? 'n/a'}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  border: 'none',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.825rem',
                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  Balance
                </Typography>
                <Typography
                  sx={{
                    fontSize: '.825rem',
                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 400,
                  }}
                >
                  {tenancy?.running_balance ?? '-'}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '.825rem',
                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  Actions
                </Typography>
                <ActionsPopover
                  house_id={id}
                  tenant_name={tenant?.name ?? 'n/a'}
                  house_number={house_number}
                  tenant_id={tenant?.id}
                  tenancy={tenancy}
                />
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </TableContainer>
    </>
  )
})
