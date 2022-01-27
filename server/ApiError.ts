class ApiError extends Error {
  public statusCode: number;

  constructor(statusCode: number) {
    super(statusCode.toString());
    this.statusCode = statusCode;
  }
}

export default ApiError;
