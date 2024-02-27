import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test Page",
  description: "Test page for layout testing",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
