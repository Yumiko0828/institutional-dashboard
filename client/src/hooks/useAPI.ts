import { useSession } from "next-auth/react";

function useAPI() {
  const { data } = useSession();

  return data!;
}

export default useAPI;
