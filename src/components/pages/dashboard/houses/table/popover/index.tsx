import {
  ChangeEventHandler,
  FC,
  FormEventHandler,
  MouseEventHandler,
  ReactElement,
  useContext,
  useState,
} from 'react'
import { IconButton, Menu, MenuItem, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Modal } from '@ui/modal'
import customAxios from '@services/interceptor'
import { AuthService } from '@services/auth'
import { AxiosResponse } from 'axios'
import { HousesContext } from '../..'

type Props = {
  house_id: string
  tenant_name: string
}

export const ActionsPopover: FC<Props> = ({ house_id, tenant_name }): ReactElement => {
  const context = useContext(HousesContext)
  const [inputValue, setInputValue] = useState({
    phone: '',
    name: '',
    meter_reading: '',
  })
  const [isRentHouseModalOpen, setIsRentHouseModalOpen] = useState<boolean>(false)
  const [isVacateTenantModalOpen, setIsVacateTenantModalOpen] = useState<boolean>(false)

  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const open = Boolean(anchor)
  const id: string | undefined = open ? 'actions-popover' : undefined
  const apartmentID: string = AuthService.getLocalStorage().data.apartment.id

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { id, value } = event.target

    setInputValue({ ...inputValue, [id]: value })
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setAnchor(null)
  }

  const handleModalClose: (
    modal_type: string,
  ) => ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void) | undefined = (
    modal_type,
  ) => {
    return (_, reason) => {
      /*
       * prevent closing modal by clicking on backdrop or pressing esc key
       */
      if (reason !== 'backdropClick') {
        if (reason !== 'escapeKeyDown') {
          /*
           * open modal depending on which menuItem was clicked
           * menuItem(s) are rent house, vacate tenant, record reading, collect payments
           */
          switch (modal_type) {
            case 'rentHouse':
              setIsRentHouseModalOpen(false)
            case 'vacateTenant':
              setIsVacateTenantModalOpen(false)
          }
        }
      }
    }
  }

  const handleModalClick: (modal_type: string) => (state: boolean) => void = (modal_type) => {
    return (state: boolean) => {
      switch (modal_type) {
        case 'rentHouse':
          setIsRentHouseModalOpen(state)
          handleClose()
        case 'vacateTenant':
          setIsVacateTenantModalOpen(state)
          handleClose()
      }
    }
  }

  const addTenant: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setLoading(true)

    customAxios
      .post(`apartments/${apartmentID}/tenancies`, {
        tenant: { phone: inputValue.phone, name: inputValue.name },
        meter_reading: inputValue.meter_reading,
        house_id,
      })
      .then((response: AxiosResponse<any, any>) => {
        setLoading(false)
        setIsRentHouseModalOpen(false)
        context.fetchHouses()
      })
      .catch((error) => console.error(error))
  }

  return (
    <>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        id={id}
        open={open}
        onClose={handleClose}
        keepMounted
        disablePortal
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          dense
          onClick={() => {
            handleClose()
            setIsRentHouseModalOpen(true)
          }}
        >
          Rent house
        </MenuItem>
        <Modal
          open={isRentHouseModalOpen}
          onClose={handleModalClose('rentHouse')}
          onClick={handleModalClick('rentHouse')}
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
                value={inputValue.name}
                sx={{
                  mt: '.5rem',
                }}
                onChange={handleChange}
              />
              <TextField
                id="phone"
                type="tel"
                variant="outlined"
                label="Phone number"
                fullWidth
                size="small"
                value={inputValue.phone}
                required
                InputProps={{ sx: { fontSize: 16 } }}
                InputLabelProps={{ sx: { fontSize: 15 } }}
                onChange={handleChange}
              />
              <TextField
                id="meter_reading"
                type="number"
                variant="outlined"
                label="Initial meter reading"
                fullWidth
                size="small"
                required
                value={inputValue.meter_reading}
                InputProps={{
                  startAdornment: <Typography sx={{ mr: '.25rem', fontSize: 14 }}>UNT</Typography>,
                  sx: { fontSize: 16 },
                }}
                InputLabelProps={{ sx: { fontSize: 15 } }}
                onChange={handleChange}
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
              onClick={addTenant}
            >
              Add Tenancy Details
            </LoadingButton>
          }
        />

        <MenuItem
          dense
          onClick={() => {
            handleClose()
            setIsVacateTenantModalOpen(true)
          }}
        >
          Vacate tenant
        </MenuItem>
        <Modal
          open={isVacateTenantModalOpen}
          onClose={handleModalClose('vacateTenant')}
          onClick={handleModalClick('vacateTenant')}
          modalTitle="Vacate Tenant"
          modalContent={
            <Typography>Are you sure you want to vacate the tenant {tenant_name}</Typography>
          }
        />
        <MenuItem dense>Record reading</MenuItem>
        <MenuItem dense>Collect payments</MenuItem>
      </Menu>
    </>
  )
}
