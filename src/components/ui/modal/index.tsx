import { Close } from '@mui/icons-material'
import { Dialog, DialogTitle, IconButton, DialogContent, DialogActions } from '@mui/material'
import { pink } from '@mui/material/colors'
import { FC, ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined
  onClick: (state: boolean) => void
  modalTitle: string
  modalContent?: ReactNode
  modalActions?: ReactNode
}

export const Modal: FC<Props> = ({
  modalTitle,
  modalContent,
  modalActions,
  open,
  onClose,
  onClick,
}) => {
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '8rem',
            fontSize: '1.125em',
            borderBottom: ['1px solid rgba(0,0,0,.12)'],
            py: '.5rem',
            mb: '1rem',
            width: 380,
            maxHeight: '90%',
          }}
        >
          {modalTitle}
          <IconButton onClick={() => onClick(false)}>
            <Close
              fontSize="small"
              sx={{
                color: pink[500],
              }}
            />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            justifyContent: 'center',
            py: '2rem',
          }}
        >
          {modalContent}
        </DialogContent>
        <DialogActions>{modalActions}</DialogActions>
      </Dialog>
    </>
  )
}
