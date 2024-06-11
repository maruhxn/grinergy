import SearchBar from "./SearchBar";

interface PageInfoSectionProps {
  total: number;
  currPage: number;
}

export default function PageInfoSection({
  total,
  currPage,
}: PageInfoSectionProps) {
  return (
    <section className="flex justify-between items-center">
      <span className="inline-block border-black/80 border-[1px] p-[0.3rem] lg:p-[0.5rem] font-kr text-[10px] bg-black/80 text-white rounded-[5px] mb-[5px]">
        전체 {total}건 | {currPage} 페이지
      </span>
      <SearchBar />
    </section>
  );
}
