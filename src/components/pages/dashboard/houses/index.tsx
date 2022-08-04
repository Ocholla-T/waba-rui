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
import { ChangeEventHandler, FC, MouseEventHandler, ReactElement, useState } from 'react'
import { Close } from '@mui/icons-material'
import { pink } from '@mui/material/colors'

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import customAxios from '@services/interceptor'
import { AuthService } from '@services/auth'

export const Houses: FC = (): ReactElement => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState({ house_number: '' })

  const handleOpen = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event): void => {
    const { id, value } = event.target

    setInputValue({
      ...inputValue,
      [id]: value,
    })
  }

  const saveHouseDetails: MouseEventHandler<HTMLButtonElement> = (event) => {
    const apartmentID: string = AuthService.getLocalStorage().data.apartment.id

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
        console.log(response)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  return (
    <Box sx={{ minHeight: 'calc(100vh - 4rem)', px: { lg: '10rem', xs: '1.5rem' }, py: '3rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
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
    </Box>
  )
}
