import { AxiosResponse } from 'axios'

export class AuthService {
  constructor() {}

  static setLocalStorage(response: AxiosResponse<any, any>): void {
    localStorage.setItem('waba_caretaker', JSON.stringify(response.data))
  }

  static getLocalStorage() {
    const waba_caretaker = localStorage.getItem('waba_caretaker')

    return waba_caretaker
  }

  // static isLoggedIn(): boolean {
  //   return moment().isBefore(this.getExpiration())
  // }

  // static isLoggedOut(): boolean {
  //   return !this.isLoggedIn()
  // }

  // static logout(): void {
  //   localStorage.removeItem('token')
  //   localStorage.removeItem('expiresIn')
  // }

  // static getExpiration(): Moment {
  //   const expires = JSON.parse(this.getLocalStorage().expiresIn as string)

  //   return moment(expires)
  // }
}
