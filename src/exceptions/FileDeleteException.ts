import GlobalException from "./GlobalException";

class FileDeleteException extends GlobalException {
  constructor(message = "파일 삭제에 실패했습니다.") {
    super(message);
    this.name = "FileDeleteException";
    this.statusCode = 500;
  }
}

export default FileDeleteException;
