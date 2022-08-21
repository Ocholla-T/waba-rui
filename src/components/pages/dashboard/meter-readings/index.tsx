import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { CustomBreadcrumbs } from '@ui/breadcrumbs'
import { NavigationBar } from '@ui/navigationBar'
import { FC } from 'react'

type Props = {}

export const MeterReadings: FC<Props> = ({}) => {
  return (
    <>
      <NavigationBar />
      <Box sx={{ minHeight: 'calc(100vh - 4rem)', px: { lg: '8rem', xs: '1.5rem' }, py: '3rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: '1rem',
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 500,
                letterSpacing: '0.0125em',
                mb: '.125rem',
              }}
            >
              Meter Readings
            </Typography>

            <CustomBreadcrumbs link="Meter Readings" />
          </div>
        </Box>
        <TableContainer component={Box}>
          <Table
            aria-label="table of houses, tenants and water bill balance"
            size="small"
            stickyHeader
            sx={{
              '& .MuiTableCell-root': {
                fontFamily: 'inherit',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    color: 'rgba(0, 0, 0, 0.6)',
                    fontSize: '.825rem',

                    letterSpacing: '.0178571429em ',
                    lineHeight: '1.25rem',
                    fontWeight: 500,
                  }}
                >
                  Delivery status
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
                  House
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
                  Tenant
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
                  Total Bill
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
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
