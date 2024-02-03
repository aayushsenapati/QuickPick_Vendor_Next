import "./globals.css";
import SessionProvider from "./SessionProvider";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export const metadata = {
  title: "QuickPick-Vendor",
  description: "QuickPick Vendor Interface",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className="h-full">
        <SessionProvider>{children}</SessionProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
