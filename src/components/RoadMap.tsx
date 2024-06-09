import { cn } from "@/libs/utils";
import Parser from "html-react-parser";
import Pargraph from "./Pargraph";

const energyData = [
  ["그린 에너지", "Green energy"],
  ["혁신 에너지", "Innovation energy"],
  ["지속가능성\n에너지", "Sustainable energy"],
  ["<strong>GR</strong>EEN"],
  ["<strong>IN</strong>NOVATION"],
  ["EN<strong>ERGY</strong>"],
];

export default function RoadMap({ isEng }: { isEng: boolean }) {
  const lineCss = "h-[8.5vh] lg:h-[17.87vh] w-[0.5px] bg-white mx-auto";
  const circleCss =
    "rounded-full flex justify-center items-center text-center lg:whitespace-pre-wrap";
  return (
    <section className="py-[8vh] lg:py-[17vh] bg-green">
      <div className="w-[81%] lg:w-[45%] mx-auto">
        <div
          className={cn(
            circleCss,
            "size-[35vw] lg:size-[16.4vw] border-[0.75px] lg:border-[0.5px] border-white mx-auto bg-transparent p-[0.1vw]"
          )}
        >
          <div
            className={cn(
              circleCss,
              "size-[30vw] lg:size-[14.4vw] text-[7.5pt] sm:text-[10.5pt] lg:text-[1.302vw] mx-auto tracking-[-0.05em] text-green bg-white",
              isEng ? "font-en" : "font-kr"
            )}
          >
            {isEng ? "GRINERGY vision" : "그리너지 비전"}
          </div>
        </div>
        <div className={lineCss} />
        <div className="flex flex-wrap justify-center">
          {energyData.map((value, idx) =>
            idx >= 3 ? (
              <div
                className={cn(
                  circleCss,
                  "size-[27vw] lg:size-[11.4vw] text-black/60 bg-white text-[8pt] sm:text-[11pt] lg:text-[1.35vw] font-en font-normal [&_strong]:text-green [&_strong]:font-normal"
                )}
                key={idx}
              >
                {Parser(value[0])}
              </div>
            ) : (
              <div
                className={cn(
                  circleCss,
                  "size-[27vw] lg:size-[11.4vw] bg-transparent border-[0.75px] lg:border-[0.5px] border-white text-white tracking-[-0.05em] text-[7pt] sm:text-[10pt] lg:text-[1.15vw] font-normal",
                  isEng ? "font-en" : "font-kr"
                )}
                key={idx}
              >
                {isEng ? value[1] : value[0]}
              </div>
            )
          )}
        </div>
        <div className={lineCss} />
        <div
          className={cn(
            circleCss,
            "size-[34vw] lg:size-[18.843vw] mx-auto bg-white"
          )}
        >
          <img
            className="w-[70%] object-cover lg:w-[65%]"
            src="/images/ourstorylogo1.png"
            alt="logo1"
          />
        </div>
        <div className={lineCss} />
        <div
          className={cn(
            circleCss,
            "size-[34vw] lg:size-[18.843vw] mx-auto bg-white"
          )}
        >
          <img
            className="w-[40%] translate-x-[7%] object-cover"
            src="/images/ourstorylogo2.png"
            alt="logo2"
          />
        </div>
      </div>
      <Pargraph
        at="Ourstory"
        idx={5}
        isEng={isEng}
        className="mb-0 lg:mb-0 [&_h3]:text-white [&_p]:text-white"
      />
    </section>
  );
}
