import BigPhrase from "@/components/BigPhrase";
import CircleModel from "@/components/CircleModel";
import ComparisonGraph from "@/components/ComparisonGraph";
import LtoInfoSection from "@/components/LtoInfoSection";
import Pargraph from "@/components/Pargraph";
import ProductExSection from "@/components/ProductExSection";
import ProductImageSection from "@/components/ProductImageSection";
import { cn, getIsEng } from "@/libs/utils";

export default async function ProductPage() {
  const isEng = await getIsEng();

  return (
    <div className="mb-[2vh] lg:mb-[4.1666vh] overflow-x-hidden">
      <BigPhrase
        at="Product"
        isEng={isEng}
        className={cn(
          "md:leading-[6vw] h-full",
          isEng
            ? "sm:leading-[36px] tracking-[-0.01em]"
            : "sm:leading-[32px] tracking-[-0.065em]"
        )}
      />
      <img
        src="/images/product_banner.jpg"
        alt="human"
        className="block w-[93%] mx-auto"
      />

      <Pargraph at="Product" idx={1} isEng={isEng} />
      <ComparisonGraph isEng={isEng} />
      <ProductImageSection />
      <Pargraph at="Product" idx={2} isEng={isEng} />
      <CircleModel isEng={isEng} />
      <LtoInfoSection isEng={isEng} />
      <Pargraph
        at="Product"
        idx={3}
        isEng={isEng}
        className="[&_h3]:text-black [&_p]:text-black sm:mb-[5vh] lg:mt-[26.5778vh] lg:mb-[6.9387vh]"
      />
      <ProductExSection />
    </div>
  );
}
