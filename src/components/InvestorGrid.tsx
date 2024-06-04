"use client";
import { motion } from "framer-motion";

const investorImgList = [
  "/images/investor1.png",
  "/images/investor2.png",
  "/images/investor3.png",
  "/images/investor4.png",
  "/images/investor5.png",
  "/images/investor6.png",
  "/images/investor7.png",
  "/images/investor8.png",
  "/images/investor9.png",
];

const list = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 1,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { duration: 1 } },
};

export default function InvestorGrid() {
  return (
    <motion.ul
      variants={list}
      animate={"show"}
      initial={"hidden"}
      className="grid grid-cols-3 gap-y-[7vh] gap-x-[2.8vw]"
    >
      {investorImgList.map((img, idx) => (
        <motion.li
          className="flex justify-center items-center text-white"
          key={idx}
          variants={item}
        >
          <img
            className="w-[26vw] lg:w-[12vw]"
            src={img}
            alt={`investor-${idx + 1}`}
          />
        </motion.li>
      ))}
    </motion.ul>
  );
}
