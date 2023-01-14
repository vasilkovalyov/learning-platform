export interface Error {
  response: {
    name: string
    message: string
    stack?: string
  }
}
