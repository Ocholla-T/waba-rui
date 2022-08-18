export type House = {
  id: string
  house_number: string
  tenant_id: string
  tenant: {
    id: string
    name: string
    nickname: string
    phone: string
  }
  tenancy: {
    id: string
    running_balance: string
  }
}
