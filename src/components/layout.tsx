import type { ReactNode } from "react";
import { ThemeToggleButton } from "./themetogglebutton";

type Props = {
  children: ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <ThemeToggleButton />
      <div className="container">{children}</div>
    </>
  );
};
