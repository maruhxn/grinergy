import BannerSlider from "@/components/BannerSlider";
import BigPhrase from "@/components/BigPhrase";
import Pargraph from "@/components/Pargraph";
import PromotionVideo from "@/components/PromotionVideo";
import RoadMap from "@/components/RoadMap";
import { getIsEng } from "@/libs/utils";
import { Metadata } from "next";
import Image from "next/image";

import humanImage from "../../../../../public/images/human.jpg";

export const metadata: Metadata = {
  title: "Our story",
};

export default async function OurStoryPage() {
  const isEng = await getIsEng();
  return (
    <div className="mb-[2vh] lg:mb-[4.1666vh] overflow-x-hidden">
      <BigPhrase at="Ourstory" isEng={isEng} />
      <BannerSlider />
      <Pargraph at="Ourstory" idx={1} isEng={isEng} />
      {/* video clip 수정 필요 */}
      <PromotionVideo isEng={isEng} />
      <div className="w-fit flex flex-col gap-[46px] lg:gap-[8.426vh] my-[8vh] lg:mx-auto lg:my-[17.592vh]">
        {/* margin 해결 필요 */}
        <Pargraph
          at="Ourstory"
          idx={2}
          isEng={isEng}
          className="m-0 md:m-0 lg:m-0 lg:w-auto"
        />
        <Pargraph
          at="Ourstory"
          idx={3}
          isEng={isEng}
          className="m-0 md:m-0 lg:m-0 lg:w-auto"
        />
        <Pargraph
          at="Ourstory"
          idx={4}
          isEng={isEng}
          className="m-0 md:m-0 lg:m-0 lg:w-auto"
        />
      </div>

      <section className="mb-[5px] lg:mb-[7px] text-[0px]">
        <Image
          height={964}
          className="w-full block"
          src={humanImage}
          alt="human"
          placeholder="blur"
        />
      </section>
      <RoadMap isEng={isEng} />
      <img
        className="mt-[8vh] lg:mt-[19.44vh] w-[50px] lg:w-[6.333vw] object-cover block mx-auto"
        src="/images/ourstory_greeny.png"
        alt="greeny"
      />
      <Pargraph
        at="Ourstory"
        idx={6}
        isEng={isEng}
        className="mb-0 lg:mb-0 [&_h3]:text-black/95"
      />
    </div>
  );
}
