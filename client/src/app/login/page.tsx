import { Suspense } from "react";
import Form from "./ui/Form";
import LoaderFallback from "@/components/Loader/fallback";

export default function Login() {
  return (
    <Suspense fallback={<LoaderFallback />}>
      <main className="flex justify-center items-center bg-slate-950 w-full h-full">
        <Form />
      </main>
    </Suspense>
  );
}
