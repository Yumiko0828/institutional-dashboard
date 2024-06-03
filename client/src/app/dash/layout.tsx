import Nav from "@/components/Nav";
import Loader from "@/contexts/Loader";
import { ReactNode } from "react";

export default function DashLayout({ children }: { children: ReactNode }) {
  return (
    <Loader>
      <Nav>{children}</Nav>
    </Loader>
  );
}
