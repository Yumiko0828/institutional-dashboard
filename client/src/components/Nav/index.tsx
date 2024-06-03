"use client";

import { ReactNode, useEffect, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { HiMiniUsers } from "react-icons/hi2";
import { FaListUl } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { url } from "gravatar";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  children: ReactNode;
}

function Nav({ children }: Props) {
  const [active, setActive] = useState(false);
  const { data, status } = useSession();
  const pathname = usePathname();

  const perms = ["Invitado", "Profesor", "Administrador"];

  const items = [
    {
      label: "Inicio",
      path: "/dash",
      icon: <GoHomeFill />,
    },
    {
      label: "Grados",
      path: "/dash/grades",
      icon: <FaListUl />,
    },
    {
      label: "Usuarios",
      path: "/dash/users",
      icon: <HiMiniUsers />,
    },
    {
      label: "Asistencias",
      path: "/dash/assistances",
      icon: <FaListUl />,
    },
  ];

  const handleActive = () => setActive(!active);

  return (
    <div className="flex flex-col w-full h-full bg-slate-950">
      <nav className="flex gap-3 px-3 py-3 items-center">
        <button
          className="bg-slate-800 border-2 border-slate-600 px-2 py-1 rounded-md text-2xl text-white xs:hidden"
          onClick={handleActive}
        >
          {!active ? <FiMenu /> : <FiX />}
        </button>
        <p className="font-medium text-xl text-white">Sistema de Asistencias</p>
      </nav>
      <div className="relative flex flex-row w-full h-full justify-center items-center overflow-hidden">
        {/* Sidebar */}
        <nav
          className={`absolute flex flex-col top-0 left-0 w-full h-full transition-all duration-500  justify-between bg-slate-950 overflow-y-auto ${
            active ? "max-w-full" : "max-w-0"
          } xs:relative xs:max-w-64`}
        >
          <ul className="flex flex-col p-3 gap-3">
            {items.map(({ label, icon, path }, key) => (
              <li key={key}>
                <Link
                  href={path}
                  className={`flex items-center gap-3 px-3 py-2 text-slate-300 ${
                    path === pathname
                      ? "bg-slate-800 !text-slate-50"
                      : "bg-slate-700"
                  } rounded-xl transition-colors duration-300 cursor-default text-text-nowrap hover:bg-slate-500`}
                  onClick={() => setActive(false)}
                >
                  {icon} {label}
                </Link>
              </li>
            ))}
          </ul>
          {status === "authenticated" && (
            <div className="flex gap-3 items-center px-3 py-2">
              <img
                src={url(data!.user.email, { size: "64" })}
                alt={data.user.email}
                className="rounded-full w-16 h-16"
              />

              <div className="flex flex-col">
                <p className="text-white text-nowrap pointer-events-none">
                  {data?.user.firstName} {data?.user.lastName}
                </p>
                <span className="text-slate-300 text-xs text-nowrap mb-1 pointer-events-none">
                  {data?.user.email}
                </span>
                <span className="text-white text-xs font-bold pointer-events-none">
                  {perms[data!.user.permissionsLevel]}
                </span>
              </div>
            </div>
          )}
        </nav>
        <div className="w-full h-full px-2 pb-2">
          <div className="w-full h-full bg-slate-300 rounded-2xl p-2 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Nav;
