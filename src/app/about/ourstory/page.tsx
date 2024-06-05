import BannerSlider from "@/components/BannerSlider";
import BigPhrase from "@/components/BigPhrase";
import OurstoryPargraph from "@/components/OurstoryPargraph";
import PromotionVideo from "@/components/PromotionVideo";
import RoadMap from "@/components/RoadMap";
import { getIsEng } from "@/libs/utils";

export default async function OurStoryPage() {
  const isEng = await getIsEng();
  return (
    <div className="mb-[2vh] lg:mb-[4.1666vh] overflow-x-hidden">
      <BigPhrase at="Ourstory" isEng={isEng} />
      <BannerSlider />
      <OurstoryPargraph idx={1} isEng={isEng} />
      {/* video clip 수정 필요 */}
      <PromotionVideo isEng={isEng} />
      <div className="w-fit flex flex-col gap-[46px] lg:gap-[8.426vh] my-[8vh] lg:mx-auto lg:my-[17.592vh]">
        {/* margin 해결 필요 */}
        <OurstoryPargraph
          idx={2}
          isEng={isEng}
          className="m-0 md:m-0 lg:m-0 lg:w-auto"
        />
        <OurstoryPargraph
          idx={3}
          isEng={isEng}
          className="m-0 md:m-0 lg:m-0 lg:w-auto"
        />
        <OurstoryPargraph
          idx={4}
          isEng={isEng}
          className="m-0 md:m-0 lg:m-0 lg:w-auto"
        />
      </div>

      <section className="mb-[5px] lg:mb-[7px] text-[0px]">
        <img src="/images/human.jpg" alt="human" className="w-full block" />
      </section>
      <RoadMap isEng={isEng} />
      <img
        className="mt-[8vh] lg:mt-[19.44vh] w-[50px] lg:w-[6.333vw] object-cover block mx-auto"
        src="/images/ourstory_greeny.png"
        alt="greeny"
      />
      <OurstoryPargraph
        idx={6}
        isEng={isEng}
        className="md:mb-0 lg:mb-0 [&_h3]:text-black/95"
      />
    </div>
  );
}
