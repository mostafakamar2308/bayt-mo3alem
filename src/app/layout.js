import TooltipContainer from "./TooltipContainer";
import { ToastContainer } from "react-toastify";
import "./globals.css";
import { yantramanav } from "./fonts";

export const metadata = {
  title: "Word Thread",
  description: "The exam platform for all english teachers",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${yantramanav.variable} scroll-smooth  `}>
      <body className="flex flex-col min-h-screen bg-offWhite text-text">
        <ToastContainer />
        <TooltipContainer />
        <main className=" grow">{children}</main>
      </body>
    </html>
  );
}
