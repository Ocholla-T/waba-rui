import { AxiosResponse } from 'axios'

export class AuthService {
  constructor() {}

  static setLocalStorage(response: AxiosResponse<any, any>): void {
    localStorage.setItem('waba_caretaker', JSON.stringify(response.data))
  }

  static getLocalStorage() {
    const waba_caretaker = localStorage.getItem('waba_caretaker')

    return JSON.parse(waba_caretaker as string)
  }

  static isAuthenticated(): boolean {
    return this.getLocalStorage()?.data?.token ? true : false
  }

  static logout(): void {
    localStorage.removeItem('waba_caretaker')
  }
}
