import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profiles",
  description: "Profiles",
};

export default function ProfilesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
