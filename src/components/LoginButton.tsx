"use client";

import { cn } from "@/libs/utils";
import { useFormStatus } from "react-dom";

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={cn(
        "font-en bg-black text-white text-[0.8rem] lg:text-[1rem] py-[0.3rem] px-[0.8rem] lg:py-[0.5rem] lg:px-[1rem] border-0 hover:bg-white hover:text-black transition-all",
        pending && "bg-black/20"
      )}
      type="submit"
      disabled={pending}
    >
      {pending ? "Loading..." : "LOGIN"}
    </button>
  );
}
