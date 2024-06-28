"use client";

import Editor from "@/components/Editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import FileUploadException from "@/exceptions/FileUploadException";
import GlobalException from "@/exceptions/GlobalException";
import useAbortController from "@/hooks/useAbortController";
import { getUploadUrl } from "@/libs/db-actions/file";
import { cn, getErrorMessage } from "@/libs/utils";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UploadFileData } from "../../create/page";
import { updateNotice } from "./actions";
import { UpdateNoticeDto, updateNoticeSchema } from "./schema";

interface NoticeDetail {
  files: {
    id: string;
    fileName: string;
    fileKey: string;
    noticeId: string;
  }[];
  title: string;
  contents: string;
}

export default function UpdateNoticePage({
  params: { noticeId },
}: {
  params: { noticeId: string };
}) {
  const router = useRouter();
  const labelCss = "text-[0.8rem] lg:text-[0.9375rem] font-kr";
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const [notice, setNotice] = useState<NoticeDetail | null>(null);
  const [uploadFilesData, setUploadFilesData] = useState<UploadFileData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { controller, timeoutId } = useAbortController();

  const updateNoticeWithNoticeId = updateNotice.bind(null, noticeId);

  useEffect(() => {
    // 주어진 noticeId에 해당하는 notice가 없다면 리다이렉트
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/notice/${noticeId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }

        setIsFetching(false);
        setNotice(data as NoticeDetail);
      } catch (error: any) {
        toast.error(error.message);
        router.push("/admin/notice");
      }
    };

    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<UpdateNoticeDto>({
    resolver: zodResolver(updateNoticeSchema),
    defaultValues: {
      deletedFiles: [],
    },
  });

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

  const onSubmit = async (data: UpdateNoticeDto) => {
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.contents) formData.append("contents", data.contents);
    if (data.deletedFiles) {
      data.deletedFiles.forEach((deletedFileKey) =>
        formData.append("deletedFiles", deletedFileKey)
      );
    }
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

    const error = await updateNoticeWithNoticeId(formData);
    if (error?.message) {
      toast.error(getErrorMessage(error));
      setIsLoading(false);
      return;
    }
    router.push("/admin/notice");
    toast.success("공지사항 수정 성공");
    setIsLoading(false);
  };

  if (isFetching) return <div>Loading...</div>;

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
          defaultValue={notice?.title}
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
        <Editor onChange={handleChange} defaultValue={notice!.contents} />
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
      {notice && notice.files.length > 0 && (
        <ul className="text-[10px] px-[20px] py-[5px] gap-[3px] lg:text-[0.75rem] lg:py-[20px] lg:gap-[5px] bg-[#f7f7f7] text-black/60 flex flex-col -mt-[10px]">
          {notice.files.map((file) => (
            <li
              key={file.id}
              className="w-full xl:max-w-[250px] flex text-[0.75rem] justify-between"
            >
              <span>
                {file.fileName.length > 20
                  ? file.fileName.substring(0, 10) +
                    "..." +
                    file.fileName.substring(file.fileName.length - 10)
                  : file.fileName}
              </span>
              <div className="flex items-center gap-1">
                <input
                  type="checkbox"
                  id={file.id}
                  {...register("deletedFiles")}
                  value={file.fileKey}
                />
                <label htmlFor={file.id}>삭제</label>
              </div>
            </li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          "text-[0.8rem] lg:text-[1rem] bg-black/80 text-white py-[0.5rem] px-[1rem] border border-black w-fit mx-auto rounded-[10px] hover:bg-white hover:text-black transition-all duration-300",
          isLoading && "bg-black/30 border-none"
        )}
      >
        {isLoading ? "수정 중.." : "수정"}
      </button>
    </form>
  );
}
