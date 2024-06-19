class NotFoundException extends Error {
  constructor(message = "해당 자원 정보가 없습니다.") {
    super(message);
    this.name = "NotFoundException";
  }
}

export default NotFoundException;
