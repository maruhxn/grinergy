import InvestorGrid from "@/components/InvestorGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors",
};

export default function InvestorsPage() {
  return (
    <div className="mt-[15.623vh] lg:mt-[8.623vh]">
      <h1 className="font-en text-center tracking-[-0.015em] text-[13vw] lg:text-[6.25vw] -mb-[2.5vw] lg:-mb-[1.2vw]">
        Growing together
      </h1>
      <section className="flex justify-center items-center w-full bg-green h-[60vh] xl:h-[75vh] 2xl:h-[57.6vh]">
        <InvestorGrid />
      </section>
      <div className="w-full fixed bg-green h-[50vh] bottom-0 -z-10" />
    </div>
  );
}
