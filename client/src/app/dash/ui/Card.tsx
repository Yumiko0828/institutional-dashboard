import Link from "next/link";

interface Props {
  label: string;
  url: string;
}

export default function Card({ label, url }: Props) {
  return (
    <Link href={url} className="bg-gradient-to-tr to-slate-800 from-slate-500 flex items-center justify-center py-12 rounded-2xl">
      <h2 className="text-2xl text-center text-white pointer-events-none">{label}</h2>
    </Link>
  );
}
