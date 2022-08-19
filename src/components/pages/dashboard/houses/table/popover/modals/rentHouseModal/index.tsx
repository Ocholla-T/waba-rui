import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  SyntheticEvent,
  useContext,
  useState,
} from 'react'
import { LoadingButton } from '@mui/lab'
import { SnackbarCloseReason, TextField, Typography } from '@mui/material'
import { Modal } from '@ui/modal'
import customAxios from '@services/interceptor'
import { AuthService } from '@services/auth'
import { AxiosResponse } from 'axios'
import { HousesContext } from '@pages/dashboard/houses'
import { CustomSnackbar } from '@ui/snackbar/snackbar'

type Props = {
  open: boolean
  loading: boolean
  tenant_name: string
  value: {
    phone: string
    name: string
    meter_reading: string
  }
  errors: {
    'tenant.phone': string[]
    meter_reading: string[]
  }
  onChange: ChangeEventHandler<HTMLInputElement>
  onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
  onClick: (state: boolean) => void
  handleModalClickAction: FormEventHandler<HTMLButtonElement>
  onSnackbarClose:
    | ((event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void)
    | undefined
  onSnackbarClick: MouseEventHandler<HTMLButtonElement>
}

export const RentHouseModal: FC<Props> = ({
  tenant_name,
  open,
  loading,
  value,
  errors,
  onChange,
  onClose,
  onClick,
  handleModalClickAction,
  onSnackbarClick,
  onSnackbarClose,
}): ReactElement => {
  return (
    <>
      {tenant_name !== 'n/a' ? (
        <CustomSnackbar
          open={open}
          message={'Action requires house to be vacant'}
          onClose={onSnackbarClose}
          onClick={onSnackbarClick}
        />
      ) : (
        <Modal
          open={open}
          onClose={onClose}
          onClick={onClick}
          modalTitle="Add a Tenant"
          modalContent={
            <>
              <TextField
                id="name"
                type="text"
                variant="outlined"
                fullWidth
                label="Tenant name"
                size="small"
                InputProps={{ sx: { fontSize: 16 } }}
                InputLabelProps={{ sx: { fontSize: 15 } }}
                required
                value={value.name}
                sx={{
                  mt: '.5rem',
                }}
                onChange={onChange}
              />
              <TextField
                id="phone"
                type="tel"
                variant="outlined"
                label="Phone number"
                fullWidth
                size="small"
                value={value.phone}
                error={errors['tenant.phone'][0].length > 0}
                helperText={errors['tenant.phone'][0].length > 0 && `${errors['tenant.phone'][0]}`}
                required
                InputProps={{ sx: { fontSize: 16 } }}
                InputLabelProps={{ sx: { fontSize: 15 } }}
                onChange={onChange}
              />
              <TextField
                id="meter_reading"
                type="number"
                variant="outlined"
                label="Initial meter reading"
                fullWidth
                size="small"
                required
                value={value.meter_reading}
                error={errors['meter_reading'][0].length > 0}
                helperText={
                  errors['meter_reading'][0].length > 0 && `${errors['meter_reading'][0]}`
                }
                InputProps={{
                  startAdornment: <Typography sx={{ mr: '.25rem', fontSize: 14 }}>UNT</Typography>,
                  sx: { fontSize: 16 },
                }}
                InputLabelProps={{ sx: { fontSize: 15 } }}
                onChange={onChange}
              />
              <p>{value.meter_reading}</p>
            </>
          }
          modalActions={
            <LoadingButton
              loading={loading}
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                mx: '1rem',
                mb: '1rem',
                backgroundColor: '#00AAA7',
                '& .MuiLoadingButton-loadingIndicator': {
                  color: '#00AAA7',
                },
              }}
              onClick={handleModalClickAction}
            >
              Add Tenancy Details
            </LoadingButton>
          }
        />
      )}
    </>
  )
}
