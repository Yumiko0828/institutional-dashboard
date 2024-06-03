"use client";

import { api } from "@/provider/api";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

function SwrProvider({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher: (path) => api.get(path).then((res) => res.data),
      }}
    >
      {children}
    </SWRConfig>
  );
}

export default SwrProvider;
