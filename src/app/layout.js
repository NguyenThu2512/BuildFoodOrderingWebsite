import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AppProvider from "@/components/AppProvider";
import { Toaster } from "react-hot-toast";


const roboto = Roboto({ subsets: ["latin"], weight:['400', '500', '700'] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
      <main className="max-w-6xl p-4 mx-auto">
        <AppProvider>
          <Header/>
          <Toaster position="top-center" />
          {children}
          <Footer/>
        </AppProvider>
        </main>
      </body>
    </html>
  );
}
