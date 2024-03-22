import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customers",
  description: "Customers",
};

export default function CustomersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
