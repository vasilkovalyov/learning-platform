class Cookies {
  constructor() {
    console.log('class Cookies')
  }

  public setCookie(key: string, value: string) {
    console.log('set cookie')
  }

  public removeCookie(key: string) {
    console.log('remove cookie')
  }

  public getCookie(key: string, req: string) {
    console.log('get cookie')
  }
}

export default new Cookies()
