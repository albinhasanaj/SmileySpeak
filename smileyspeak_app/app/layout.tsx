import { Itim } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";

const itim = Itim({ weight: "400", subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${itim.className} bg-[#DDD]`}>
          <header className="w-full py-8">
            <Navbar />
          </header>
          {children}
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  )
}

export default RootLayout
