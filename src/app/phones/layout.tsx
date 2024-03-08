import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Phones",
  description: "Phones",
};

export default function PhonesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
