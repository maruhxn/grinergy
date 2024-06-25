class GlobalException extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.name = "GlobalException";
    this.statusCode = statusCode;
  }
}

export default GlobalException;
