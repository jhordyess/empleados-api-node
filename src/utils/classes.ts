export class HttpError extends Error {
  status: number
  publicError: boolean

  constructor(message = 'SERVER ERROR', status = 500, publicError = true) {
    super(message)
    this.status = status
    this.publicError = publicError
  }
}
