import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Snapmind – Create Studio-Quality Photos With AI",
  description: "Transform Simple Product Images Into High-Converting Visuals Using AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
