import {
  Box,
  Button,
  Chip,
  Menu,
  MenuItem,
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

import { FC, MouseEventHandler, useState } from 'react'

import { useFetchMeterReading } from '@hooks/use-fetch-meter-readings'
import { MeterReading } from './types/MeterReading'

type Props = {}

export const MeterReadings: FC<Props> = ({}) => {
  const meter_reading: MeterReading[] = useFetchMeterReading()
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchor)
  const id: string | undefined = open ? 'bill-popover' : undefined

  const handleClose:
    | ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void)
    | undefined = () => {
    setAnchor(null)
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchor(event.currentTarget)
  }

  return (
    <>
      <NavigationBar />
      <Box
        sx={{
          minHeight: 'calc(100vh - 4rem)',
          px: { lg: '8rem', xs: '1.5rem' },
          py: '3rem',
        }}
      >
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
              variant='h6'
              sx={{
                fontWeight: 500,
                letterSpacing: '0.0125em',
                mb: '.125rem',
              }}
            >
              Meter Readings
            </Typography>

            <CustomBreadcrumbs link='Meter Readings' />
          </div>
        </Box>
        <TableContainer component={Box} sx={{ display: { xs: 'none' } }}>
          <Table
            aria-label='table of houses, tenants and water bill balance'
            size='small'
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
            <TableBody>
              {meter_reading.map(
                ({
                  id,
                  house,
                  bill,
                  bill_delivery_status,
                  tenant,
                  created_at,
                  previous_units,
                  current_units,
                  consumed_units,
                }) => {
                  return (
                    <TableRow key={id}>
                      <TableCell>
                        <Chip
                          label={bill_delivery_status}
                          size='small'
                          sx={{
                            backgroundColor: 'rgb(46, 204, 113)',
                            color: '#ffffff',
                            fontWeight: '500',
                            borderRadius: '5px',
                            px: '.5rem',
                            py: '1rem',
                          }}
                        />
                      </TableCell>
                      <TableCell>{house.house_number}</TableCell>
                      <TableCell>
                        <Typography sx={{ fontSize: 14 }}>
                          {tenant.name}
                        </Typography>
                        <Typography sx={{ fontSize: 14 }}>
                          {tenant.phone}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant='text'
                          size='small'
                          color='error'
                          sx={{
                            borderBottom: '1px dashed red',
                            borderRadius: '0',
                            px: '.5rem',
                          }}
                          onClick={handleClick}
                        >
                          {`KSH ${bill.total_charge}`}
                        </Button>
                        <Menu
                          id={id}
                          open={open}
                          keepMounted
                          anchorEl={anchor}
                          anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                          }}
                          onClose={handleClose}
                          sx={{ minWidth: '83px', maxWidth: '80%' }}
                        >
                          <MenuItem
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '2rem',
                            }}
                          >
                            <Typography sx={{ fontSize: 14 }}>
                              Previous units
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.6)',
                              }}
                            >
                              {previous_units}
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '2rem',
                            }}
                          >
                            <Typography sx={{ fontSize: 14 }}>
                              Current units
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.6)',
                              }}
                            >
                              {current_units}
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              gap: '2rem',
                            }}
                          >
                            <Typography sx={{ fontSize: 14 }}>
                              Units consumed
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: 14,
                                color: 'rgba(0, 0, 0, 0.6)',
                              }}
                            >
                              {consumed_units}
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </TableCell>
                      <TableCell>{created_at}</TableCell>
                    </TableRow>
                  )
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* mobile table */}
        <TableContainer component={Box} sx={{ display: { sm: 'none' } }}>
          <Table size='small'>
            {meter_reading.map(
              ({
                id,
                house,
                bill,
                bill_delivery_status,
                tenant,
                created_at,
                previous_units,
                current_units,
                consumed_units,
              }) => (
                <TableRow key={id}>
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
                      Delivery status
                    </Typography>
                    <Chip
                      label={bill_delivery_status}
                      size='small'
                      sx={{
                        backgroundColor: 'rgb(46, 204, 113)',
                        color: '#ffffff',
                        fontWeight: '500',
                        borderRadius: '5px',
                        px: '.5rem',
                        py: '1rem',
                      }}
                    />
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
                      House
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '.825rem',
                        letterSpacing: '.0178571429em ',
                        lineHeight: '1.25rem',
                        fontWeight: 400,
                        textAlign: 'right',
                      }}
                    >
                      {house.house_number}
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
                      Tenant
                    </Typography>
                    <div>
                      <Typography
                        sx={{
                          fontSize: '.825rem',
                          letterSpacing: '.0178571429em ',
                          lineHeight: '1.25rem',
                          fontWeight: 400,
                          textAlign: 'right',
                        }}
                      >
                        {tenant.name}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: '.825rem',
                          letterSpacing: '.0178571429em ',
                          lineHeight: '1.25rem',
                          fontWeight: 400,
                          textAlign: 'right',
                        }}
                      >
                        {tenant.phone}
                      </Typography>
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
                      Total Bill
                    </Typography>
                    <div>
                      <Button
                        variant='text'
                        size='small'
                        color='error'
                        sx={{
                          borderBottom: '1px dashed red',
                          borderRadius: '0',
                          px: '.5rem',
                        }}
                        onClick={handleClick}
                      >
                        {`KSH ${bill.total_charge}`}
                      </Button>
                      <Menu
                        id={id}
                        open={open}
                        keepMounted
                        anchorEl={anchor}
                        anchorOrigin={{
                          vertical: 'top',
                          horizontal: 'left',
                        }}
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        onClose={handleClose}
                        sx={{ minWidth: '83px', maxWidth: '80%' }}
                      >
                        <MenuItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '2rem',
                          }}
                        >
                          <Typography sx={{ fontSize: 14 }}>
                            Previous units
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: 'rgba(0, 0, 0, 0.6)',
                            }}
                          >
                            {previous_units}
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '2rem',
                          }}
                        >
                          <Typography sx={{ fontSize: 14 }}>
                            Current units
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: 'rgba(0, 0, 0, 0.6)',
                            }}
                          >
                            {current_units}
                          </Typography>
                        </MenuItem>
                        <MenuItem
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            gap: '2rem',
                          }}
                        >
                          <Typography sx={{ fontSize: 14 }}>
                            Units consumed
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: 14,
                              color: 'rgba(0, 0, 0, 0.6)',
                            }}
                          >
                            {consumed_units}
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </div>
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
                      Date
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '.825rem',
                        letterSpacing: '.0178571429em ',
                        lineHeight: '1.25rem',
                        fontWeight: 400,
                        textAlign: 'right',
                      }}
                    >
                      {created_at}
                    </Typography>
                  </TableCell>
                </TableRow>
              )
            )}
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}
