import { Suspense } from "react";
import LoaderFallback from "@/components/Loader/fallback";
import Content from "./ui/Content";

export default function page() {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <Content />
    </Suspense>
  );
}
