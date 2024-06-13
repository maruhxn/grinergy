"use client";

import Editor from "@/components/Editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { uploadNotice } from "./actions";
import { CreateNoticeSchema, noticeSchema } from "./schema";

export default function CreateNoticePage() {
  const labelCss = "text-[0.8rem] lg:text-[0.9375rem] font-kr";
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<CreateNoticeSchema>({
    resolver: zodResolver(noticeSchema),
  });

  function handleChange(value: string) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  function onFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files) return;
    setUploadFiles(files);
  }

  const onSubmit = async (data: CreateNoticeSchema) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("contents", data.contents);
    if (uploadFiles) {
      for (let i = 0; i < uploadFiles.length; i++) {
        formData.append("files", uploadFiles[i]);
      }
    }

    await uploadNotice(formData);
  };

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e))}
      className="bg-white roudned-[10px] size-full overflow-hidden flex flex-col justify-center p-[20px] border border-[#ccc] rounded-[20px] gap-[10px]"
    >
      <label className={labelCss} htmlFor="title">
        제목
      </label>
      <input
        className="w-full p-[10px] mb-[10px] border border-[#ccc] font-kr"
        type="text"
        required
        {...register("title")}
      />
      <label className={labelCss} htmlFor="contents">
        내용
      </label>
      <div className="mb-[20px]">
        <Editor onChange={handleChange} />
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
        className="text-[0.8rem] lg:text-[1rem] bg-black/80 text-white py-[0.5rem] px-[1rem] border border-black w-fit mx-auto rounded-[10px] hover:bg-white hover:text-black transition-all duration-300"
      >
        등록
      </button>
    </form>
  );
}
