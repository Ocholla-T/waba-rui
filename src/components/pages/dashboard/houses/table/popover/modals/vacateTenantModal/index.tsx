import { LoadingButton } from '@mui/lab'
import { DialogContentText, SnackbarCloseReason } from '@mui/material'
import { red, pink } from '@mui/material/colors'
import { Modal } from '@ui/modal'
import { CustomSnackbar } from '@ui/snackbar/snackbar'
import { FC, MouseEventHandler, SyntheticEvent } from 'react'

type Props = {
  house_number: string
  tenant_name: string
  loading: boolean
  open: boolean

  onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
  onClick: (state: boolean) => void
  onModalActionClick: MouseEventHandler<HTMLButtonElement> | undefined
  onSnackbarClose:
    | ((event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void)
    | undefined
  onSnackbarClick: MouseEventHandler<HTMLButtonElement>
}

export const VacateTenantModal: FC<Props> = ({
  tenant_name,
  house_number,
  loading,
  open,
  onClick,
  onClose,
  onModalActionClick,
  onSnackbarClick,
  onSnackbarClose,
}) => {
  let i = ''

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
          modalTitle="Vacate Tenant"
          modalContent={
            <>
              <DialogContentText sx={{ fontSize: 15 }}>
                Are you sure you want to vacate the tenant{' '}
                <span style={{ fontWeight: '500' }}>{tenant_name}</span>?
              </DialogContentText>
              <DialogContentText sx={{ fontSize: 15 }}>
                You will not be able to record units for{' '}
                <span style={{ fontWeight: '500' }}>house {house_number}</span> until a new tenant
                moves in.
              </DialogContentText>
            </>
          }
          modalActions={
            <>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mx: '1rem',
                  mb: '1rem',
                  fontSize: 15,
                  backgroundColor: red[600],
                  '&:hover': {
                    backgroundColor: red[600],
                    opacity: '80%',
                  },
                  '& .MuiLoadingButton-loadingIndicator': {
                    color: pink[500],
                  },
                }}
                onClick={onModalActionClick}
              >
                Yes! Vacate {tenant_name}
              </LoadingButton>
            </>
          }
        />
      )}
    </>
  )
}
