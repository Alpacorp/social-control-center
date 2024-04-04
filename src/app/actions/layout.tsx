import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Actions",
  description: "Actions",
};

export default function ActionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
