import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface Props {
  url?: string;
  onClick?: () => void;
  children: ReactNode;
}

export default function Button({ url, children, onClick }: Props) {
  const router = useRouter();

  return (
    <button
      {...(url && { onClick: () => router.push(url) })}
      {...(onClick && { onClick })}
      className="px-3 py-2 bg-blue-300 rounded-xl transition-colors duration-300 hover:bg-blue-400"
    >
      {children}
    </button>
  );
}
