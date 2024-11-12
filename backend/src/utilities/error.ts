class error extends Error {
    public statusCode: number;
    public data: string | number | boolean | object | null;
    public success: boolean;
    public errors: Array<string | object>;
  
    constructor(
      statusCode: number,
      message = "Something went wrong",
      errors: Array<string | object> = []
    ) {
      super(message);
      this.statusCode = statusCode;
      this.message = message;
      this.data = null;
      this.success = false;
      this.errors = errors;
  
      // Capture stack trace if available
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  
  export default error;
  