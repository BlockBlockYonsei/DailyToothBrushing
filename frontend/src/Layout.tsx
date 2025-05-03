import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div className="bg-gray-200 h-screen">
      <div className="w-[1024px] mx-auto bg-white h-screen">{children}</div>;
    </div>
  );
}
