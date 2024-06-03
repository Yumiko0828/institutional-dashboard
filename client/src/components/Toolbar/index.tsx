"use client";

import { useSession } from "next-auth/react";
import { FiPlus, FiSearch } from "react-icons/fi";
import { IoReload } from "react-icons/io5";

interface Props {
  onCreateRequest?: () => void;
  onRefreshRequest?: () => void;
}

function Toolbar({ onCreateRequest, onRefreshRequest }: Props) {
  const { status, data: session } = useSession();

  return (
    <div className="flex justify-between gap-5 items-center bg-slate-900 rounded-lg px-3 py-2 mb-3 overflow-hidden">
      <form className="flex gap-2 items-center bg-slate-700 outline-none py-0.5 px-2 text-slate-50 border !border-slate-500 rounded-lg">
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
