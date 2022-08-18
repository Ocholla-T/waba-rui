import { Button, Snackbar, SnackbarCloseReason } from '@mui/material'
import { pink } from '@mui/material/colors'
import { FC, MouseEventHandler, ReactElement, SyntheticEvent } from 'react'

type Props = {
  open: boolean
  message: string
  onClose?:
    | ((event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void)
    | undefined
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export const CustomSnackbar: FC<Props> = ({ open, message, onClose, onClick }): ReactElement => {
  const handleClose = () => {}

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={onClose}
      message={message}
      sx={{
        display: 'flex',
        alignItems: 'center',
        '& .MuiSnackbarContent-root': {
          py: '1rem',
          px: '1rem',
        },
      }}
      action={
        <Button
          onClick={onClick}
          sx={{
            color: pink[500],
          }}
        >
          Close
        </Button>
      }
    />
  )
}
