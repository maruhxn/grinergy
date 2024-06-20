"use server";

import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";
import {
  NOTICE_COUNT_TAG,
  NOTICE_TAG,
  PAGE_SIZE,
  REVALIDATE_TIME,
} from "../constants";
import db from "../db";

/* Client */

export async function getAllNotices(currPage: number) {
  if (currPage <= 0) return;
  const data = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (currPage - 1),
  });
  return data;
}

export async function getSearchedNotices(
  currPage: number,
  searchKeyword: string
) {
  if (currPage <= 0) return;
  const data = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
    where: {
      title: {
        contains: searchKeyword,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (currPage - 1),
  });
  return data;
}

export async function getCachedAllNotices(currPage: number) {
  const cachedOperation = unstable_cache(
    getAllNotices,
    [NOTICE_TAG, currPage + ""],
    {
      tags: [NOTICE_TAG, currPage + ""],
      revalidate: REVALIDATE_TIME,
    }
  );

  return cachedOperation(currPage);
}

export type Notices = Prisma.PromiseReturnType<typeof getAllNotices>;

export async function getTotalNoticeCount() {
  return await db.notice.count();
}

export async function getSearchedNoticeCount(searchKeyword: string) {
  return await db.notice.count({
    where: {
      title: {
        contains: searchKeyword,
      },
    },
  });
}

export const getCachedTotalNoticeCount = unstable_cache(
  getTotalNoticeCount,
  [NOTICE_COUNT_TAG],
  {
    tags: [NOTICE_COUNT_TAG],
    revalidate: REVALIDATE_TIME,
  }
);

/* Admin */

export async function getAllNoticesForAdmin(currPage: number) {
  if (currPage <= 0) return;
  const data = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (currPage - 1),
  });
  return data;
}

export async function getSearchedNoticesForAdmin(
  currPage: number,
  searchKeyword: string
) {
  const data = await db.notice.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
      createdAt: true,
    },
    where: {
      title: {
        contains: searchKeyword,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (currPage - 1),
  });
  return data;
}

export async function getCachedAllNoticesForAdmin(currPage: number) {
  const cachedOperation = unstable_cache(
    getAllNoticesForAdmin,
    [NOTICE_TAG, currPage + ""],
    {
      tags: [NOTICE_TAG, currPage + ""],
      revalidate: REVALIDATE_TIME,
    }
  );

  return cachedOperation(currPage);
}
