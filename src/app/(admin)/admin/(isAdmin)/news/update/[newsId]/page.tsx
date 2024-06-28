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
import { News } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { getR2ImagePath, updateNews } from "./actions";
import { UpdateNewsDto, updateNewsSchema } from "./schema";

export default function UpdateNewsPage({
  params: { newsId },
}: {
  params: { newsId: string };
}) {
  const router = useRouter();
  const labelCss = "text-[0.8rem] lg:text-[0.9375rem] font-kr";
  const [previewImage, setPreviewImage] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string>("");
  const [fileKey, setFileKey] = useState("");
  const [news, setNews] = useState<News | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { controller, timeoutId } = useAbortController();
  const updateNewsWithId = updateNews.bind(null, newsId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/news/${newsId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }

        setIsFetching(false);
        setNews(data as News);
        if (data.photo) setPreviewImage(await getR2ImagePath(data.photo));
      } catch (error) {
        toast.error(getErrorMessage(error));
        router.push("/admin/news");
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
  } = useForm<UpdateNewsDto>({
    resolver: zodResolver(updateNewsSchema),
  });

  const onImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setPreviewImage(url);
    setPhoto(file);
    const [uploadUrl, fileKey] = await getUploadUrl(file.name, file.type);
    setValue("photo", uploadUrl);
    setUploadUrl(uploadUrl);
    setFileKey(fileKey);
  };

  function handleChange(value: string) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  const onSubmit = async (data: UpdateNewsDto) => {
    if (isLoading) return;

    setIsLoading(true);
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.contents) formData.append("contents", data.contents);
    if (data.url) formData.append("url", data.url);
    if (photo) {
      try {
        const response = await fetch(uploadUrl, {
          method: "PUT",
          headers: {
            "Content-Type": photo.type,
          },
          body: Buffer.from(await photo.arrayBuffer()),
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new FileUploadException("파일 업로드 실패");
        }
      } catch (error) {
        console.error(error);
        if (error instanceof DOMException && error.name === "AbortError") {
          return toast.error("시간 초과: 파일의 용량이 너무 큽니다.");
        }
        toast.error((error as GlobalException).message);
      } finally {
        setIsLoading(false);
        formData.append("photo", fileKey);
      }
    }

    const error = await updateNewsWithId(formData);
    if (error?.message) {
      toast.error(getErrorMessage(error));
      setIsLoading(false);
      return;
    }
    router.push("/admin/news");
    toast.success("뉴스 수정 성공");
    setIsLoading(false);
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <form
      onSubmit={handleSubmit((e) => onSubmit(e))}
      className="bg-white roudned-[10px] size-full overflow-hidden flex flex-col justify-center p-[20px] border border-[#ccc] rounded-[20px] gap-[8px]"
    >
      <span className={labelCss}>미리보기 이미지 (5MB 이하)</span>
      <label
        htmlFor="file"
        className="w-full h-[200px] aspect-[240/200] bg-center bg-cover lg:w-[240px] lg:h-auto object-contain flex flex-col justify-center items-center gap-[10px] border-dashed border-[#ccc] border-2 rounded-[10px] text-[#ccc] mx-auto hover:border-black hover:text-black cursor-pointer"
        style={{
          backgroundImage: `url(${previewImage})`,
        }}
      >
        {previewImage === "" && (
          <>
            <svg
              className="w-[2.5rem]"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-kr text-[0.9375rem]">
              커버 이미지
              {[errors.photo?.message ?? ""]}
            </span>
          </>
        )}
      </label>
      <input
        onChange={onImageChange}
        type="file"
        id="file"
        name="file"
        accept="image/*"
        className="hidden"
      />
      <label className={labelCss} htmlFor="title">
        제목
      </label>
      <div>
        <input
          className="w-full p-[10px] border border-[#ccc] font-kr"
          type="text"
          defaultValue={news!.title}
          {...register("title")}
        />
        <span className="text-red-500 font-medium font-kr text-sm">
          {[errors.title?.message ?? ""]}
        </span>
      </div>
      <label className={labelCss} htmlFor="url">
        뉴스 URL
      </label>
      <div>
        <input
          className="w-full p-[10px] border border-[#ccc] font-kr"
          type="text"
          defaultValue={news!.url}
          {...register("url")}
        />
        <span className="text-red-500 font-medium font-kr text-sm">
          {[errors.url?.message ?? ""]}
        </span>
      </div>
      <label className={labelCss} htmlFor="contents">
        내용
      </label>
      <div>
        <Editor onChange={handleChange} defaultValue={news!.contents} />
        <span className="text-red-500 font-medium font-kr text-sm">
          {[errors.contents?.message ?? ""]}
        </span>
      </div>
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
