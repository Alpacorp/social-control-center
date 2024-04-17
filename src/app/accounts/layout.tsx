import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accounts",
  description: "Accounts",
};

export default function AccountsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
