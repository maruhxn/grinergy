"use client";

import { Notices } from "@/libs/db-actions/notice";
import moment from "moment";
import { useRouter } from "next/navigation";

export default function Table({ posts }: { posts: Notices }) {
  const router = useRouter();
  return (
    <table className="table-fixed w-full text-[10px] lg:text-[0.9em] border-[1px] border-black/30 border-collapse overflow-hidden font-kr">
      <thead className="font-normal text-white bg-black/80">
        <tr>
          <th className="p-[5px] text-left w-[20%] align-middle lg:py-[0.7em] lg:px-[2em]">
            번호
          </th>
          <th className="p-[5px] text-left w-[20%] align-middle lg:py-[0.7em] lg:px-[2em]">
            제목
          </th>
          <th className="p-[5px] text-right w-[20%] align-middle lg:py-[0.7em] lg:px-[2em]">
            작성일
          </th>
        </tr>
      </thead>
      <tbody>
        {posts &&
          posts.map((post, idx) => (
            <tr
              key={post.id}
              className="cursor-pointer"
              onClick={() => router.push(`/notice/${post.id}`)}
            >
              <td className="bg-white text-left w-[20%] align-middle py-[0.7em] px-[2em]">
                {idx + 1}
              </td>
              <td className="bg-white text-left w-[20%] align-middle py-[0.7em] px-[2em]">
                {post.title}
              </td>
              <td className="bg-white text-right w-[20%] align-middle py-[0.7em] px-[2em]">
                {moment(post.createdAt).format("YYYY-MM-DD")}
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
