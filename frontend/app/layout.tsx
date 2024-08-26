import { ToastContainer } from "react-toastify";
import "./globals.css";
import Providers from "./providers";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Providers>{children}</Providers>
        <ToastContainer />
      </body>
    </html>
  );
}
