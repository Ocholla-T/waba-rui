import { MeterReading } from "@pages/dashboard/meter-readings/types/MeterReading"
import { AuthService } from "@services/auth"
import customAxios from "@services/interceptor"
import { useState, useEffect } from "react"

export const useFetchMeterReading = () => {
  const apartment_id = AuthService.getLocalStorage().data.apartment.id

  const [meterReading, setMeterReading] = useState<MeterReading[]>([
    {
      id: "",
      tenancy_id: "",
      previous_units: "",
      current_units: "",
      consumed_units: "",
      bill: {
        total_charge: "",
      },

      bill_delivery_status: "",
      created_at: "",
      tenant: {
        name: "",
        phone: "",
      },
      house: {
        house_number: "",
      },
    },
  ])

  const fetchMeterReadings = (controller: AbortController) => {
    customAxios
      .get(`/apartments/${apartment_id}/meter-readings`, {
        signal: controller.signal,
      })
      .then((response) => {
        setMeterReading([...response.data.data])
      })
      .catch((error) => {
        if (error.name === "CanceledError") {
          console.log("api call aborted")
        } else {
          console.error(error)
        }
      })
  }

  useEffect(() => {
    const controller = new AbortController()

    fetchMeterReadings(controller)

    return () => controller.abort()
  }, [])

  return meterReading
}
