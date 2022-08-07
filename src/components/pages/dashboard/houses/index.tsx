import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material'
import { CustomBreadcrumbs } from '@ui/breadcrumbs'
import { ChangeEventHandler, FC, MouseEventHandler, ReactElement, useEffect, useState } from 'react'
import { Close } from '@mui/icons-material'
import { pink } from '@mui/material/colors'

import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import customAxios from '@services/interceptor'
import { AuthService } from '@services/auth'
import { HouseTable } from './table'

type House = {
  house_number: string
  tenant_id: string
  tenant: string
  tenancy: string
}

type Errors = {
  house_number: string[]
}

export const Houses: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState({ house_number: '' })
  const [houses, setHouses] = useState<House[]>([
    { house_number: '', tenant_id: '', tenant: '', tenancy: '' },
  ])
  const [errors, setErrors] = useState<Errors>({ house_number: [''] })

  const apartmentID: string = AuthService.getLocalStorage().data.apartment.id

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { id, value } = event.target

    setErrors({ house_number: [''] })

    setInputValue({
      ...inputValue,
      [id]: value,
    })
  }

  const saveHouseDetails: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()

    setErrors({ house_number: [''] })

    const config: AxiosRequestConfig<any> = {
      method: 'POST',
      url: `https://waba-api.rascan.co.ke/api/apartments/${apartmentID}/houses`,
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        ...inputValue,
      },
    }

    customAxios
      .request(config)
      .then((response: AxiosResponse<any>) => {
        handleClose()
        fetchHouses()
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if ((error.response as AxiosResponse<any, any>).status === 422) {
            setErrors({ ...errors, ...(error.response as AxiosResponse<any, any>).data.errors })
          }
        }
      })
  }

  const fetchHouses = () => {
    customAxios
      .get(`/apartments/${apartmentID}/houses`)
      .then((response: AxiosResponse<any>) => {
        setHouses(() => {
          return [...response.data.data]
        })
      })
      .catch((error) => {
        console.error(error)
      })
  }

  useEffect(() => {
    fetchHouses()
  }, [])

  return (
    <Box sx={{ minHeight: 'calc(100vh - 4rem)', px: { lg: '10rem', xs: '1.5rem' }, py: '3rem' }}>
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
            Houses
          </Typography>

          <CustomBreadcrumbs />
        </div>
        <Button
          variant="contained"
          size="medium"
          sx={{
            backgroundColor: '#00aaa7',
            height: 'max-content',
          }}
          onClick={handleOpen}
        >
          Add House
        </Button>
        <Dialog open={isOpen} onClose={handleClose}>
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '5rem',
              fontSize: '1.125em',
              borderBottom: ['1px solid rgba(0,0,0,.12)'],
              py: '.5rem',
            }}
          >
            Record House Details
            <IconButton onClick={handleClose}>
              <Close fontSize="small" sx={{ color: pink[500] }} />
            </IconButton>
          </DialogTitle>
          <DialogContent sx={{ py: 0 }}>
            <TextField
              id="house_number"
              variant="outlined"
              fullWidth
              size="small"
              sx={{ my: '2rem' }}
              label="House number"
              type="text"
              value={inputValue.house_number}
              onChange={handleChange}
              error={errors.house_number[0].length > 0}
              helperText={errors.house_number[0].length > 0 && `${errors.house_number[0]}`}
            />
          </DialogContent>
          <DialogActions sx={{ px: '24px', mb: '1rem' }}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              size="large"
              sx={{ backgroundColor: '#00aaa7' }}
              onClick={saveHouseDetails}
            >
              Save House Details
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <HouseTable houses={houses} />
    </Box>
  )
}
