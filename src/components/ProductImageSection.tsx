"use client";
import { motion } from "framer-motion";

export default function ProductImageSection() {
  return (
    <section>
      <div className="relative">
        <img
          className="w-full will-change-auto"
          src="/images/product_battery.jpg"
          alt="image1"
        />
        <motion.div
          animate={{
            opacity: [1, 0, 1, 1, 1, 1],
            transition: { duration: 3, repeat: Infinity },
          }}
          initial={{ opacity: 1 }}
          className="w-[24vw] sm:w-[21vw] lg:w-[19.27vw] absolute top-1/2 left-1/2 sm:top-[48%] lg:top-1/2 -translate-x-1/2 -translate-y-1/2 aspect-square border border-white font-en flex justify-center items-center rounded-full text-white"
        >
          <span className="whitespace-pre-wrap text-center relative top-[4%] text-[10px] sm:text-[9pt] lg:text-[1.8229vw] leading-[9pt] sm:leading-[10pt] lg:leading-[2.1875vw] tracking-[0.05em] lg:tracking-[-0.005em]">
            {"POTERE\nS2 Battery\nLTO"}
          </span>
        </motion.div>
      </div>
      <div className="mt-[5px] gap-x-[5px] lg:mt-[7px] lg:gap-x-[7px] w-full grid grid-cols-2">
        <img
          className="w-full apsect-[478 / 458] object-cover h-full"
          src="/images/product_leftimg.jpg"
          alt="image2"
        />
        <img
          className="w-full apsect-[478 / 458] object-cover h-full"
          src="/images/product_rightimg.jpg"
          alt="image3"
        />
      </div>
    </section>
  );
}
