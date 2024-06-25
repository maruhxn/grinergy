import GlobalException from "./GlobalException";

class NotFoundException extends GlobalException {
  constructor(message = "해당 자원 정보가 없습니다.") {
    super(message);
    this.name = "NotFoundException";
    this.statusCode = 404;
  }
}

export default NotFoundException;
