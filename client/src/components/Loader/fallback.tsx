import { BiLoaderCircle } from "react-icons/bi";

function LoaderFallback() {
  return (
    <div
      className="w-full h-full flex justify-center items-center bg-slate-300 transition-opacity duration-300
      "
    >
      <BiLoaderCircle className="animate-spin text-slate-950 w-16 h-16" />
    </div>
  );
}

export default LoaderFallback;
