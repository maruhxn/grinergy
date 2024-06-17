"use client";

import Editor from "@/components/Editor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { News } from "@prisma/client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { updateNews } from "./actions";
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
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);
  const updateNewsWithId = updateNews.bind(null, newsId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/news/${newsId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data);
        }

        setLoading(false);
        setNews(data as News);
        if (data.photo) setPreviewImage(data?.photo);
      } catch (error: any) {
        toast.error(error.message);
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
    setValue("photo", `ok`);
  };

  function handleChange(value: string) {
    setValue("contents", value === "<p><br></p>" ? "" : value);
    trigger("contents");
  }

  const onSubmit = async (data: UpdateNewsDto) => {
    const formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.contents) formData.append("contents", data.contents);
    if (data.url) formData.append("url", data.url);
    if (photo) formData.append("photo", photo);

    await updateNewsWithId(formData);
    router.push("/admin/news");
  };

  if (loading) return <div>Loading...</div>;

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
        className="text-[0.8rem] lg:text-[1rem] bg-black/80 text-white py-[0.5rem] px-[1rem] border border-black w-fit mx-auto rounded-[10px] hover:bg-white hover:text-black transition-all duration-300"
      >
        등록
      </button>
    </form>
  );
}