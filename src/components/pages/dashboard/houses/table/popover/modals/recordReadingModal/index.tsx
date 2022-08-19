import { LoadingButton } from '@mui/lab'
import { SnackbarCloseReason, TextField, Typography } from '@mui/material'
import { Modal } from '@ui/modal'
import { CustomSnackbar } from '@ui/snackbar/snackbar'
import { ChangeEventHandler, FC, MouseEventHandler, ReactElement, SyntheticEvent } from 'react'

type Props = {
  tenant_name: string
  open: boolean
  loading: boolean
  value: {
    phone: string
    name: string
    meter_reading: string
  }
  onChange: ChangeEventHandler<HTMLInputElement>
  onClose?: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
  onClick: (state: boolean) => void
  onModalActionClick?: MouseEventHandler<HTMLButtonElement> | undefined
  onSnackbarClose?:
    | ((event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void)
    | undefined
  onSnackbarClick?: MouseEventHandler<HTMLButtonElement>
}

export const RecordReadingModal: FC<Props> = ({
  open,
  tenant_name,
  loading,
  value,
  onChange,
  onClose,
  onClick,
  onSnackbarClose,
  onSnackbarClick,
  onModalActionClick,
}): ReactElement => {
  return (
    <>
      {tenant_name === 'n/a' ? (
        <CustomSnackbar
          open={open}
          onClose={onSnackbarClose}
          onClick={onSnackbarClick}
          message="Action requires an active tenancy"
        />
      ) : (
        <Modal
          open={open}
          onClose={onClose}
          onClick={onClick}
          modalTitle="Record a meter reading"
          modalContent={
            <>
              <TextField
                id="meter_reading"
                variant="outlined"
                type="number"
                label="Meter reading"
                fullWidth
                size="small"
                value={value.meter_reading}
                InputProps={{
                  endAdornment: <Typography sx={{ ml: '.25rem', fontSize: 13 }}>UNITS</Typography>,
                }}
                InputLabelProps={{ sx: { fontSize: 15 } }}
                sx={{
                  mt: '.5rem',
                }}
                onChange={onChange}
              />
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
              onClick={onModalActionClick}
            >
              Record Reading Details
            </LoadingButton>
          }
        />
      )}
    </>
  )
}
