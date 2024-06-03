"use client";

import Button from "@/components/Button";
import { useSession, signOut, signIn } from "next-auth/react";
import { useEffect } from "react";
import { match } from "ts-pattern";

export default function Home() {
  const { data, status } = useSession();

  useEffect(() => {
    if (data?.error === "RefreshAccessTokenError") {
      signIn();
    }
  }, [data]);

  return (
    <main className="flex justify-center items-center bg-zinc-200 w-full h-full">
      <div className="flex flex-col items-center gap-4 bg-zinc-100 max-w-sm w-full rounded-2xl p-3">
        {match(status)
          .with("loading", () => (
            <>
              <h1 className="text-center text-xl">Cargando...</h1>
            </>
          ))
          .with("authenticated", () => (
            <>
              <h1 className="text-center text-xl">
                ¡Bienvenido, {data!.user.firstName}!
              </h1>
              <div className="flex flex-col gap-2">
                <Button url="/dash">Ir al panel de control.</Button>
                <Button onClick={signOut}>Cerrar sesión.</Button>
              </div>
            </>
          ))
          .with("unauthenticated", () => (
            <>
              <h1 className="text-center text-xl">No estás autenticado.</h1>
              <Button url="/login">Iniciar sesión</Button>
            </>
          ))
          .exhaustive()}
      </div>
    </main>
  );
}
