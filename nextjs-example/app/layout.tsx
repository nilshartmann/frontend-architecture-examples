import "./styles.css";
import type { Metadata } from "next";
import ReadingSince from "@/app/ReadingSince";

export const metadata: Metadata = {
  title: "Example Blog Next.js",
  description: "My personal blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={"top"}>{<ReadingSince />}</div>
        {children}
      </body>
    </html>
  );
}
