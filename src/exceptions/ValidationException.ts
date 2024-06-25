import GlobalException from "./GlobalException";

class ValidationException extends GlobalException {
  constructor(message = "데이터 형식이 올바르지 않습니다.") {
    super(message);
    this.name = "ValidationException";
    this.statusCode = 400;
  }
}

export default ValidationException;
