import Image from "next/image";

import ex1 from "../../public/images/ex1.jpg";
import ex2 from "../../public/images/ex2.jpg";
import ex3 from "../../public/images/ex3.jpg";
import ex4 from "../../public/images/ex4.jpg";
import ex5 from "../../public/images/ex5.jpg";
import ex6 from "../../public/images/ex6.jpg";

const productExList = [
  {
    img: ex1,
    text: "Trains & trams",
  },
  {
    img: ex2,
    text: "Smart robots",
  },
  {
    img: ex3,
    text: "Military vehicles",
  },
  {
    img: ex4,
    text: "Electric hybrid vehicles",
  },
  {
    img: ex5,
    text: "Electric vessels",
  },
  {
    img: ex6,
    text: "Energy storage systems",
  },
];

export default function ProductExSection() {
  return (
    <ul className="w-[95%] h-full mx-auto grid grid-cols-2 gap-x-[5px] gap-y-[2.5vh] lg:gap-x-[7px] lg:gap-y-[8vh]">
      {productExList.map((item, idx) => (
        <div key={idx} className="h-full flex flex-col">
          <div className="w-full h-[30vw] relative">
            <Image
              fill
              className="object-cover"
              src={item.img}
              alt={item.text}
              placeholder="blur"
            />
          </div>
          <span className="text-[9.5pt] md:text-[12.5pt] mt-[2px] lg:text-[1.5313vw] lg:mt-[4px] tracking-[-0.015em] text-black/95 font-en">
            {item.text}
          </span>
        </div>
      ))}
    </ul>
  );
}
