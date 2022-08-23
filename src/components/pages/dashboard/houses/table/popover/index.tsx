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
import { IconButton, Menu, MenuItem, SnackbarCloseReason } from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'

import customAxios from '@services/interceptor'
import { AuthService } from '@services/auth'
import { AxiosError, AxiosResponse } from 'axios'
import { HousesContext } from '../..'

import { RentHouseModal } from './modals/rent-house-modal'
import { VacateTenantModal } from './modals/vacate-tenant-modal'
import { RecordReadingModal } from './modals/record-reading-modal'
import { CollectPaymentsModal } from './modals/collect-payments-modal'

type Props = {
  house_id: string
  house_number: string
  tenant_id: string
  tenant_name: string
  tenancy: {
    id: string
    running_balance: string
  }
}

export const ActionsPopover: FC<Props> = ({
  house_id,
  tenant_name,
  tenant_id,
  house_number,
  tenancy,
}): ReactElement => {
  const context = useContext(HousesContext)
  const initialInputValues = {
    phone: '',
    name: '',
    meter_reading: '',
    amount: '',
  }
  const [inputValue, setInputValue] = useState(initialInputValues)
  const initialErrorValues = { 'tenant.phone': [''], meter_reading: [''] }
  const [errors, setErrors] = useState(initialErrorValues)

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setErrors(initialErrorValues)
    setInputValue(initialInputValues)

    const { id, value } = event.target

    setInputValue({ ...inputValue, [id]: value })
  }

  const [isRentHouseModalOpen, setIsRentHouseModalOpen] = useState<boolean>(false)
  const [isVacateTenantModalOpen, setIsVacateTenantModalOpen] = useState<boolean>(false)
  const [isRecordReadingModalOpen, setIsRecordReadingModalOpen] = useState<boolean>(false)
  const [isCollectPaymentModalOpen, setIsCollectPaymentModalOpen] = useState<boolean>(false)

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
            case 'recordReading':
              setIsRecordReadingModalOpen(false)
            case 'collectPayment':
              setIsCollectPaymentModalOpen(false)
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

        case 'vacateTenant':
          setIsVacateTenantModalOpen(state)

        case 'recordReading':
          setIsRecordReadingModalOpen(state)

        case 'collectPayment':
          setIsCollectPaymentModalOpen(state)
      }

      handleClose()
    }
  }
  const [anchor, setAnchor] = useState<HTMLButtonElement | null>(null)
  const open = Boolean(anchor)
  const id: string | undefined = open ? 'actions-popover' : undefined

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setAnchor(event.currentTarget)
  }
  const handleClose = () => {
    setAnchor(null)
  }

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const apartmentID: string = AuthService.getLocalStorage().data.apartment.id

  const addTenant: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsLoading(true)

    customAxios
      .post(`apartments/${apartmentID}/tenancies`, {
        tenant: { phone: inputValue.phone, name: inputValue.name },
        meter_reading: inputValue.meter_reading,
        house_id,
      })
      .then((response: AxiosResponse<any, any>) => {
        setIsLoading(false)
        setIsRentHouseModalOpen(false)
        context.fetchHouses()
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if ((error.response as AxiosResponse<any, any>).status === 422) {
            setErrors({ ...errors, ...(error.response as AxiosResponse<any, any>).data.errors })
          }
        }
        setIsLoading(false)
      })
  }

  const removeTenant: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsLoading(true)

    customAxios
      .delete(`apartments/${apartmentID}/tenancies/${tenancy.id}`)
      .then((response) => {
        setIsLoading(false)
        setIsVacateTenantModalOpen(false)
        context.fetchHouses()
      })
      .catch((error) => console.error(error))
  }

  const recordMeterReading: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsLoading(true)

    customAxios
      .post(`/apartments/${apartmentID}/meter-readings`, {
        tenancy_id: tenancy.id,
        meter_reading: Number(inputValue.meter_reading),
      })
      .then((response) => {
        setIsLoading(false)
        setIsRecordReadingModalOpen(false)
        context.fetchHouses()
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const recordPayment: FormEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setIsLoading(true)

    customAxios
      .post(`/apartments/${apartmentID}/payments`, {
        tenancy_id: tenancy.id,
        amount: inputValue.amount,
      })
      .then((response) => {
        setIsLoading(false)
        setIsCollectPaymentModalOpen(false)
        context.fetchHouses()
      })
      .catch((error) => {
        console.error(error)
        setIsLoading(false)
      })
  }

  const handleSnackbarClose: (
    snackbar_type: string,
  ) =>
    | ((event: Event | SyntheticEvent<any, Event>, reason: SnackbarCloseReason) => void)
    | undefined = (snackbar_type) => {
    return (_, reason) => {
      if (reason === 'clickaway') {
        return
      }

      switch (snackbar_type) {
        case 'rentHouse':
          setIsRentHouseModalOpen(false)
        case 'vacateTenant':
          setIsVacateTenantModalOpen(false)
        case 'recordReading':
          setIsRecordReadingModalOpen(false)
        case 'collectPayment':
          setIsCollectPaymentModalOpen(false)
      }
    }
  }

  const handleSnackbarClick: (snackbar_type: string) => MouseEventHandler<HTMLButtonElement> = (
    snackbar_type,
  ) => {
    return () => {
      switch (snackbar_type) {
        case 'rentHouse':
          setIsRentHouseModalOpen(false)
        case 'vacateTenant':
          setIsVacateTenantModalOpen(false)
        case 'recordReading':
          setIsRecordReadingModalOpen(false)
        case 'collectPayment':
          setIsCollectPaymentModalOpen(false)
      }
    }
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
        <MenuItem
          dense
          onClick={() => {
            handleClose()
            setIsVacateTenantModalOpen(true)
          }}
        >
          Vacate tenant
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            handleClose()
            setIsRecordReadingModalOpen(true)
          }}
        >
          Record reading
        </MenuItem>
        <MenuItem
          dense
          onClick={() => {
            handleClose()
            setIsCollectPaymentModalOpen(true)
          }}
        >
          Collect payments
        </MenuItem>
      </Menu>

      {/* Modals */}
      <RentHouseModal
        errors={errors}
        tenant_name={tenant_name}
        open={isRentHouseModalOpen}
        loading={isLoading}
        value={inputValue}
        onChange={handleChange}
        onClose={handleModalClose('rentHouse')}
        onClick={handleModalClick('rentHouse')}
        handleModalClickAction={addTenant}
        onSnackbarClose={handleSnackbarClose('rentHouse')}
        onSnackbarClick={handleSnackbarClick('rentHouse')}
      />

      <VacateTenantModal
        tenant_name={tenant_name}
        house_number={house_number}
        open={isVacateTenantModalOpen}
        loading={isLoading}
        onClick={handleModalClick('vacateTenant')}
        onClose={handleModalClose('vacateTenant')}
        onModalActionClick={removeTenant}
        onSnackbarClose={handleSnackbarClose('vacateTenant')}
        onSnackbarClick={handleSnackbarClick('vacateTenant')}
      />

      <RecordReadingModal
        tenant_name={tenant_name}
        open={isRecordReadingModalOpen}
        loading={isLoading}
        onClick={handleModalClick('recordReading')}
        onClose={handleModalClose('recordReading')}
        onModalActionClick={recordMeterReading}
        onSnackbarClick={handleSnackbarClick('recordReading')}
        onSnackbarClose={handleSnackbarClose('recordReading')}
        value={inputValue}
        onChange={handleChange}
      />

      <CollectPaymentsModal
        tenant_name={tenant_name}
        open={isCollectPaymentModalOpen}
        loading={isLoading}
        onClick={handleModalClick('collectPayment')}
        onClose={handleModalClose('collectPayment')}
        onModalActionClick={recordPayment}
        onSnackbarClick={handleSnackbarClick('collectPayment')}
        onSnackbarClose={handleSnackbarClose('collectPayment')}
        value={inputValue}
        onChange={handleChange}
      />
    </>
  )
}
