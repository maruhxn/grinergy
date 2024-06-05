"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const imageList = [
  { src: "/images/image1.jpg", title1: "Green earth", title2: "" },
  { src: "/images/image2.jpg", title1: "For human,", title2: "for future" },
  { src: "/images/image3.jpg", title1: "Technology", title2: "for tomorrow" },
  { src: "/images/image4.jpg", title1: "Dream big,", title2: "make changes" },
  { src: "/images/image5.jpg", title1: "Imagination", title2: "to innovation" },
];

export default function BannerSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((index + 1) % imageList.length);
    }, 7000);

    return () => {
      clearInterval(intervalId);
    };
  }, [index]);

  return (
    <motion.section className="w-[92.2%] h-[30vh] xl:h-[650px] block mx-auto relative will-change-transform">
      {imageList.map((item, i) => (
        <div key={i}>
          <motion.img
            className="w-full h-full object-cover -z-10 absolute top-0 left-0"
            src={item.src}
            animate={{
              opacity: index === i ? 1 : 0,
            }}
            transition={{ duration: 1 }}
            alt={`Image ${index}`}
          />
          <motion.h1
            className="absolute top-1/2 left-1/2 font-en -translate-x-1/2 -translate-y-1/2 text-[23pt] lg:text-[4.7vw] tracking-[-0.02em] leading-[20pt] lg:leading-[4.2vw] text-white z-10 text-center"
            transition={{ delay: 2, duration: 5 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === i ? [0, 1, 1, 1, 0] : 0 }}
          >
            {item.title1}
            <br />
            {item.title2}
          </motion.h1>
        </div>
      ))}
    </motion.section>
  );
}
