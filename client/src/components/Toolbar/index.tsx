"use client";

import { useSession } from "next-auth/react";
import { FormEvent } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IoReload } from "react-icons/io5";

interface Props {
  onCreateRequest?: () => void;
  onRefreshRequest?: () => void;
  onSearchRequest?: (query: string) => void;
}

function Toolbar({
  onCreateRequest,
  onRefreshRequest,
  onSearchRequest,
}: Props) {
  const { status, data: session } = useSession();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const query = data.get("search");

    if (query && onSearchRequest) return onSearchRequest(query.toString());
  };

  return (
    <div className="flex justify-between gap-5 items-center bg-slate-900 rounded-lg px-3 py-2 mb-3 overflow-hidden">
      <form
        className="flex gap-2 items-center bg-slate-700 outline-none py-0.5 px-2 text-slate-50 border !border-slate-500 rounded-lg"
        onSubmit={handleSearch}
      >
        <input
          type="search"
          name="search"
          className="outline-none bg-transparent w-full"
          placeholder="Buscar..."
        />
        <button
          type="submit"
          className="text-slate-50 bg-slate-700 text-xl rounded-full"
        >
          <FiSearch />
        </button>
      </form>
      <div className="flex items-center gap-2">
        {status === "authenticated" &&
          session.user.permissionsLevel === 2 &&
          onCreateRequest && (
            <button
              type="button"
              className="text-slate-50 bg-slate-700 p-1 text-xl rounded-lg outline-none transition-colors duration-300 hover:bg-slate-500"
              onClick={onCreateRequest}
            >
              <FiPlus />
            </button>
          )}
        {onRefreshRequest && (
          <button
            type="button"
            className="text-slate-50 bg-slate-700 p-1 text-xl rounded-lg outline-none transition-colors duration-300 hover:bg-slate-500"
            onClick={onRefreshRequest}
          >
            <IoReload />
          </button>
        )}
      </div>
    </div>
  );
}

export default Toolbar;
