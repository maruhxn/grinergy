class FileDeleteException extends Error {
  constructor(message = "파일 삭제에 실패했습니다.") {
    super(message);
    this.name = "FileDeleteException";
  }
}

export default FileDeleteException;
