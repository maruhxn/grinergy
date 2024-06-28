"use client";

import Editor from "@/components/Editor";
import FileUploadException from "@/exceptions/FileUploadException";
import GlobalException from "@/exceptions/GlobalException";
import useAbortController from "@/hooks/useAbortController";
import { getUploadUrl } from "@/libs/db-actions/file";
import { cn, getErrorMessage } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { uploadNotice } from "./actions";
import { CreateNoticeSchema, noticeSchema } from "./schema";

export interface UploadFileData {
  uploadUrl: string;
  fileKey: string;
}

export default function CreateNoticePage() {
  const labelCss = "text-[0.8rem] lg:text-[0.9375rem] font-kr";
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [uploadFilesData, setUploadFilesData] = useState<UploadFileData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { controller, timeoutId } = useAbortController();

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateNoticeSchema>({
    resolver: zodResolver(noticeSchema),
  });
  const router = useRouter();

  function handleChange(value: string) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  async function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files) return;
    setUploadFiles(files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const [uploadUrl, fileKey] = await getUploadUrl(file.name, file.type);
      setUploadFilesData((prev) => [...prev, { uploadUrl, fileKey }]);
    }
  }

  const onSubmit = async (data: CreateNoticeSchema) => {
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.contents);

    if (uploadFiles) {
      try {
        for (let i = 0; i < uploadFiles.length; i++) {
          const file = uploadFiles[i];
          const response = await fetch(uploadFilesData[i].uploadUrl, {
            method: "PUT",
            headers: {
              "Content-Type": file.type,
            },
            body: Buffer.from(await file.arrayBuffer()),
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new FileUploadException("파일 업로드 실패");
          }

          formData.append("files", uploadFilesData[i].fileKey);
        }
      } catch (error) {
        console.error(error);
        if (error instanceof DOMException && error.name === "AbortError") {
          return toast.error("시간 초과: 파일의 용량이 너무 큽니다.");
        }
        return toast.error((error as GlobalException).message);
      } finally {
        setIsLoading(false);
      }
    }

    const error = await uploadNotice(formData);
    if (error?.message) {
      toast.error(getErrorMessage(error));
      setIsLoading(false);
      return;
    }
    router.push("/admin/notice");
    toast.success("공지사항 생성 성공");
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e))}
      className="bg-white roudned-[10px] size-full overflow-hidden flex flex-col justify-center p-[20px] border border-[#ccc] rounded-[20px] gap-[10px]"
    >
      <label className={labelCss} htmlFor="title">
        제목
      </label>
      <div>
        <input
          className="w-full p-[10px] mb-[10px] border border-[#ccc] font-kr"
          type="text"
          {...register("title")}
        />
        <span className="text-red-500 font-medium font-kr text-sm">
          {[errors.title?.message ?? ""]}
        </span>
      </div>
      <label className={labelCss} htmlFor="contents">
        내용
      </label>
      <div className="mb-[20px]">
        <Editor onChange={handleChange} />
        <span className="text-red-500 font-medium font-kr text-sm">
          {[errors.contents?.message ?? ""]}
        </span>
      </div>
      <label className={labelCss} htmlFor="file">
        첨부파일
      </label>
      <input
        className="w-full p-[10px] mb-0 border-none font-kr bg-[#f5f5f5] py-[10px] px-[20px]"
        type="file"
        onChange={onFileChange}
        multiple
      />
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "text-[0.8rem] lg:text-[1rem] bg-black/80 text-white py-[0.5rem] px-[1rem] border border-black w-fit mx-auto rounded-[10px] hover:bg-white hover:text-black transition-all duration-300",
          isLoading && "bg-black/30 border-none"
        )}
      >
        {isLoading ? "등록 중.." : "등록"}
      </button>
    </form>
  );
}
