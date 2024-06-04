"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

function Form() {
  const [error, setError] = useState<string>("");
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(false);
  const router = useRouter();
  const query = useSearchParams(),
    callbackUrl = query.get("callbackUrl");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setDisable(true);

    const responseNextAuth = await signIn("credentials", {
      ...credentials,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setError(responseNextAuth.error);
      setDisable(false);
      return;
    }

    router.push(callbackUrl || "/");
  };

  const handleTyping = (e: ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <form
      className="flex flex-col gap-4 bg-slate-700 max-w-xs w-full rounded-2xl py-3 px-6"
      onSubmit={handleSubmit}
    >
      <h1 className="text-center text-3xl text-slate-50 font-bold">
        Iniciar sesión
      </h1>

      {error && (
        <div className="bg-red-100 bg-opacity-90 border-2 border-red-600 rounded-xl px-3 py-2">
          {error}
        </div>
      )}

      <label className="text-slate-50">
        Correo:
        <input
          className="px-2 py-1 rounded-lg bg-slate-800 outline-none text-slate-50 border-2 border-slate-800 transition-colors duration-300 hover:border-blue-200 focus:border-blue-400 disabled:cursor-not-allowed disabled:text-slate-400"
          type="text"
          name="email"
          onChange={handleTyping}
          required
          disabled={disable}
        />
      </label>
      <label className="text-slate-50">
        Contraseña:
        <input
          className="px-2 py-1 rounded-lg bg-slate-800 outline-none text-slate-50 border-2 border-slate-800 transition-colors duration-300 hover:border-blue-200 focus:border-blue-400 disabled:cursor-not-allowed disabled:text-slate-400"
          type="password"
          name="password"
          onChange={handleTyping}
          required
          disabled={disable}
        />
      </label>

      <button
        className="px-3 py-2 bg-blue-300 rounded-xl transition-colors duration-300 hover:bg-blue-400 disabled:cursor-not-allowed disabled:bg-slate-400"
        type="submit"
        disabled={disable}
      >
        Iniciar sesión
      </button>
    </form>
  );
}

export default Form;
