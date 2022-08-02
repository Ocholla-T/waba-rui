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
    return localStorage.getItem('waba_caretaker') ? true : false
  }

  static logout(): void {
    localStorage.removeItem('waba_caretaker')
  }

  // static isLoggedIn(): boolean {
  //   return moment().isBefore(this.getExpiration())
  // }

  // static isLoggedOut(): boolean {
  //   return !this.isLoggedIn()
  // }

  // static getExpiration(): Moment {
  //   const expires = JSON.parse(this.getLocalStorage().expiresIn as string)

  //   return moment(expires)
  // }
}
