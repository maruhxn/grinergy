import GoodDesignLogo from "@/components/GoodDesignLogo";
import HomeParagraph from "@/components/HomeParagraph";
import { getIsEng } from "@/libs/utils";

export default async function Home() {
  const isEng = await getIsEng();

  return (
    <main className="mb-[2vh] mt-0 lg:mb-0 lg:mt-[10vh]">
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute w-screen h-screen object-cover top-0 bottom-0 left-0 right-0 -z-10 lg:top-[10vh]"
      >
        <source src="/videos/main.mp4" type="video/mp4" />
      </video>
      <HomeParagraph isEng={isEng} />
      <GoodDesignLogo isEng={isEng} />
    </main>
  );
}
