"use client";

import { useRouter } from "next/navigation";
import Toolbar from "@/components/Toolbar";
import GradeTable, { Filter } from "./table";
import { useState } from "react";
import { ApiGrade } from "@/provider/api.definitions";

export default function Content() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter | undefined>(undefined);
  const [searchCount, setSearchCount] = useState<number | null>(null);

  const handleSearch = (query: string) => {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedQuery, "i");

    setFilter(() => {
      return ({ academicLevel, label, section }: ApiGrade) => {
        return (
          regex.test(label.toString()) ||
          regex.test(section) ||
          regex.test(academicLevel.name)
        );
      };
    });
  };

  return (
    <main className="w-full h-h-full overflow-x-auto">
      <Toolbar
        onRefreshRequest={() => router.refresh()}
        onSearchRequest={handleSearch}
        onCreateRequest={() => router.push("/dash/grades/create")}
      />
      {typeof searchCount === "number" && (
        <p className="mb-2">
          Se han encontrado {searchCount} resultado{searchCount !== 1 && "s"} de
          busqueda.
        </p>
      )}
      <GradeTable filter={filter} onFilterResults={setSearchCount} />
    </main>
  );
}
