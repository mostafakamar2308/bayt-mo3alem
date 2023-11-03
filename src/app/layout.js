import TooltipContainer from "./TooltipContainer";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "بيت المعلم",
  description: "The exam platform for all english teachers",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth ">
      <body className="flex flex-col min-h-screen bg-offWhite text-text">
        <ToastContainer />
        <TooltipContainer />
        <main className=" grow">{children}</main>
      </body>
    </html>
  );
}
