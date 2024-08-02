import { Inter } from "next/font/google";
import "./global.css"
import "bootstrap/dist/css/bootstrap.css";
import Header from "../components/Header/Header.js";
// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Coworking Space - Book Office Space for Rent & Virtual Offices",
  description:
    "Coworking Space & Virtual Offices - Awfis offers coworking space, shared office space for rent & on the go mobile offices in India. Equipped with high-speed wifi, meeting rooms with video conferencing facilities, flexible offices, cafe, parking and much more. Join us today!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <Header /> */}
      <body >
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
          crossOrigin="anonymous"
        />
        {children}
      </body>
    </html>
  );
}
