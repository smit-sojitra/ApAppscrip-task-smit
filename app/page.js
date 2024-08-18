import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "../app/components/Navbar/Navbar.jsx";
import Footer from "../app/components/Footer/Footer";
import Details from "../app/components/Details/Details";
import Product from "../app/components/Products/Products";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Details />
      <Product />
      <Footer />
    </main>
  );
}
