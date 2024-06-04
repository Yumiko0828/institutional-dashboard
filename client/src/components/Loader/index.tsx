"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { BiLoaderCircle } from "react-icons/bi";

interface Props {
  children: ReactNode;
}

function LoaderWrapper({ children }: Props) {
  const { status } = useSession();

  return (
    <>
      <div
        className={`absolute top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-slate-950 transition-opacity duration-300 ${
          status === "loading" ? "opacity-1" : "opacity-0 pointer-events-none"
        }`}
      >
        <BiLoaderCircle className="animate-spin text-slate-50 w-16 h-16" />
      </div>
      {children}
    </>
  );
}

export default LoaderWrapper;
