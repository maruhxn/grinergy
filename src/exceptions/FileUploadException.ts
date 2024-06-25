import GlobalException from "./GlobalException";

class FileUploadException extends GlobalException {
  constructor(message = "파일 업로드에 실패했습니다.") {
    super(message);
    this.name = "FileUploadException";
    this.statusCode = 500;
  }
}

export default FileUploadException;
