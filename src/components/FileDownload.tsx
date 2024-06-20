"use client";

import toast from "react-hot-toast";

export default function FileDownload({
  file,
}: {
  file: {
    id: string;
    fileName: string;
    fileKey: string;
    noticeId: string;
  };
}) {
  async function downloadFile(fileKey: string, fileName: string) {
    const res = await fetch(
      `/api/download?fileKey=${encodeURIComponent(
        fileKey
      )}&fileName=${encodeURIComponent(fileName)}`
    );
    if (!res.ok) return toast.error("파일 다운로드 실패");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }

  return (
    <span onClick={() => downloadFile(file.fileKey, file.fileName)}>
      {file.fileName.length > 20
        ? file.fileName.substring(0, 10) +
          "..." +
          file.fileName.substring(file.fileName.length - 10)
        : file.fileName}
    </span>
  );
}
