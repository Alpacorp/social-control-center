import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In",
  description: "Log in to your account",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
