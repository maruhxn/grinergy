"use server";

import { unstable_cache } from "next/cache";
import {
  NEWS_COUNT_TAG,
  NEWS_TAG,
  PAGE_SIZE,
  REVALIDATE_TIME,
} from "../constants";
import db from "../db";

/* Client */
export async function getAllNews(currPage: number) {
  if (currPage <= 0) return;
  const data = await db.news.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
      url: true,
      photo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: PAGE_SIZE,
    skip: PAGE_SIZE * (currPage - 1),
  });
  return data;
}

export async function getSearchedNews(currPage: number, searchKeyword: string) {
  if (currPage <= 0) return;
  const data = await db.news.findMany({
    select: {
      id: true,
      title: true,
      contents: true,
      url: true,
      photo: true,
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

export async function getCachedAllNews(currPage: number) {
  const cachedOperation = unstable_cache(
    getAllNews,
    [NEWS_TAG, currPage + ""],
    {
      tags: [NEWS_TAG, currPage + ""],
      revalidate: REVALIDATE_TIME,
    }
  );

  return cachedOperation(currPage);
}

export async function getTotalNewsCount() {
  return await db.news.count();
}

export async function getSearchedNewsCount(searchKeyword: string) {
  return await db.news.count({
    where: {
      title: {
        contains: searchKeyword,
      },
    },
  });
}

export const getCachedTotalNewsCount = unstable_cache(
  getTotalNewsCount,
  [NEWS_COUNT_TAG],
  {
    tags: [NEWS_COUNT_TAG],
    revalidate: REVALIDATE_TIME,
  }
);

/* Admin */

export async function getAllNewsForAdmin(currPage: number) {
  const data = await db.news.findMany({
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

export async function getCachedAllNewsForAdmin(currPage: number) {
  const cachedOperation = unstable_cache(
    getAllNewsForAdmin,
    [NEWS_TAG, currPage + ""],
    {
      tags: [NEWS_TAG, currPage + ""],
      revalidate: REVALIDATE_TIME,
    }
  );

  return cachedOperation(currPage);
}

export async function getSearchedNewsForAdmin(
  currPage: number,
  searchKeyword: string
) {
  const data = await db.news.findMany({
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
