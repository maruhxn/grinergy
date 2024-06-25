"use client";

import { deleteNews } from "@/app/(admin)/admin/(isAdmin)/news/actions";
import { deleteNotice } from "@/app/(admin)/admin/(isAdmin)/notice/actions";
import { cn, getErrorMessage } from "@/libs/utils";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface AdminTableProps {
  type: "notice" | "news";
  data:
    | {
        id: string;
        title: string;
        contents: string;
        createdAt: Date;
      }[]
    | undefined;
}

export default function AdminTable({ type, data }: AdminTableProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteItem = async () => {
    if (isLoading || !selectedItemId) return;
    setIsLoading(true);

    const error =
      type === "notice"
        ? await deleteNotice(selectedItemId)
        : await deleteNews(selectedItemId);

    if (error?.message) {
      toast.error(getErrorMessage(error));
    } else {
      toast.success("게시글을 삭제하였습니다");
    }

    setIsModalOpen(false);
    setSelectedItemId(null);
    setIsLoading(false);
  };

  return (
    <>
      <table className="table-fixed w-full text-[10px] lg:text-[0.9em] border-[1px] border-black/30 border-collapse overflow-hidden font-kr">
        <colgroup>
          <col style={{ width: "40%" }} />
          <col style={{ width: "30%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "5%" }} />
          <col style={{ width: "5%" }} />
        </colgroup>
        <thead className="font-normal text-white bg-black/80">
          <tr>
            <th className="p-[5px] text-center w-[20%] align-middle lg:p-[10px]">
              제목
            </th>
            <th className="p-[5px] text-center w-[20%] align-middle lg:p-[10px]">
              내용
            </th>
            <th className="p-[5px] text-center w-[20%] align-middle lg:p-[10px]">
              작성일
            </th>
            <th className="p-[5px] text-center w-[20%] align-middle lg:p-[10px]">
              수정
            </th>
            <th className="p-[5px] text-center w-[20%] align-middle lg:p-[10px]">
              삭제
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item: any) => {
              const contentsText = item.contents.replace(/<[^>]*>?/g, "");
              return (
                <tr key={item.id} className="cursor-pointer group">
                  <td
                    onClick={() => {
                      type === "notice" && router.push(`/notice/${item.id}`);
                    }}
                    className="bg-white text-center w-[20%] align-middle py-[1em] px-[0.5em] group-hover:bg-black/10 break-words"
                  >
                    {item.title.length > 20
                      ? item.title.substring(0, 20) + "..."
                      : item.title}
                  </td>
                  <td
                    onClick={() => {
                      type === "notice" && router.push(`/notice/${item.id}`);
                    }}
                    className="bg-white text-center w-[20%] align-middle py-[1em] px-[0.5em] group-hover:bg-black/10 break-words"
                  >
                    {contentsText.length > 30
                      ? contentsText.substring(0, 30) + "..."
                      : contentsText}
                  </td>
                  <td className="bg-white text-center w-[20%] align-middle py-[1em] px-[0.5em] group-hover:bg-black/10 break-words">
                    {moment(item.createdAt).format("YYYY-MM-DD")}
                  </td>
                  <td
                    className="bg-white text-center w-[20%] align-middle py-[1em] px-[0.5em] group-hover:bg-black/10 break-words"
                    onClick={() =>
                      router.push(`/admin/${type}/update/${item.id}`)
                    }
                  >
                    <svg
                      className="size-[1.2rem] inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                  </td>
                  <td
                    className="bg-white text-center w-[20%] align-middle py-[1em] px-[0.5em] group-hover:bg-black/10 break-words"
                    onClick={() => {
                      setSelectedItemId(item.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <svg
                      className="size-[1.2rem] inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="absolute top-0 left-0 z-50 w-screen h-screen bg-black/30 flex justify-center items-center">
          <div className="w-[80vw] max-w-[430px] bg-white p-[20px] rounded-xl flex flex-col">
            <h3 className="font-kr font-bold text-lg text-black">
              정말로 삭제하시겠습니까?
            </h3>
            <span className="text-sm text-neutral-600">
              한번 삭제된 데이터는 복구가 어렵습니다
            </span>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={deleteItem}
                disabled={isLoading}
                className={cn(
                  "bg-red-600 px-6 py-3 text-white rounded-lg text-sm",
                  isLoading && "bg-red-300"
                )}
              >
                {isLoading ? "삭제 중.." : "삭제"}
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedItemId(null);
                }}
                disabled={isLoading}
                className={cn(
                  "bg-black px-6 py-3 text-white rounded-lg text-sm",
                  isLoading && "bg-black/30"
                )}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
