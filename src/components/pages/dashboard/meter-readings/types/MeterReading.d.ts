export type MeterReading = {
  id: string
  tenancy_id: string
  previous_units: string
  current_units: string
  consumed_units: string
  bill: {
    total_charge: string
  }

  bill_delivery_status: string
  created_at: string
  tenant: {
    name: string
    phone: string
  }
  house: {
    house_number: string
  }
}
