import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "Encurtando - Links Encurtados",
  description: "Encurte seus links e gerencie eles em um só lugar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
