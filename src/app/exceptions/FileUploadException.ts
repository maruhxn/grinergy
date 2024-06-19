class FileUploadException extends Error {
  constructor(message = "파일 업로드에 실패했습니다.") {
    super(message);
    this.name = "FileUploadException";
  }
}

export default FileUploadException;
