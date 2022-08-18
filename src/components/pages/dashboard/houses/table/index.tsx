import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
    <TableContainer component={Box}>
      <Table
        aria-label="table of houses, tenants and water bill balance"
        padding="none"
        stickyHeader
      >
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
          {houses.map(({ house_number, tenant, id, tenancy }) => (
            <TableRow key={house_number} hover>
              <TableCell sx={{ alignItems: 'center' }}>
                <IconButton size="small" sx={{ mr: '.25rem' }}>
                  <VillaOutlinedIcon fontSize="inherit" sx={{ color: 'rgb(46, 204, 113)' }} />
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
  )
})
