const productExList = [
  {
    img: "/images/ex1.jpg",
    text: "Trains & trams",
  },
  {
    img: "/images/ex2.jpg",
    text: "Smart robots",
  },
  {
    img: "/images/ex3.jpg",
    text: "Military vehicles",
  },
  {
    img: "/images/ex4.jpg",
    text: "Electric hybrid vehicles",
  },
  {
    img: "/images/ex5.jpg",
    text: "Electric vessels",
  },
  {
    img: "/images/ex6.jpg",
    text: "Energy storage systems",
  },
];

export default function ProductExSection() {
  return (
    <ul className="w-[95%] h-full mx-auto grid grid-cols-2 gap-x-[5px] gap-y-[2.5vh] lg:gap-x-[7px] lg:gap-y-[8vh]">
      {productExList.map((item, idx) => (
        <div key={idx} className="h-full flex flex-col">
          <img
            className="w-full h-[30vw] object-cover"
            src={item.img}
            alt={item.text}
          />
          <span className="text-[9.5pt] md:text-[12.5pt] mt-[2px] lg:text-[1.5313vw] lg:mt-[4px] tracking-[-0.015em] text-black/95 font-en">
            {item.text}
          </span>
        </div>
      ))}
    </ul>
  );
}
