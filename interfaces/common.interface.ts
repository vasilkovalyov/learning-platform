export interface Error {
  response: {
    name: string
    message: string
    stack?: string
  }
}

export interface LocationProps {
  country: string
  state: string
  city: string
  address: string
}
