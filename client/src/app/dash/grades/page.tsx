"use client";

import Toolbar from "@/components/Toolbar";
import GradeTable from "./ui/table";
import { useRouter } from "next/navigation";

export default function page() {
  const router = useRouter();

  return (
    <main className="w-full h-h-full overflow-x-auto">
      <Toolbar
        onRefreshRequest={() => router.refresh()}
        onCreateRequest={() => router.push("/dash/grades/create")}
      />
      <GradeTable />
    </main>
  );
}
