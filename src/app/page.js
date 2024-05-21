import Contact from "@/components/layout/Contact";
import Hero from "@/components/layout/Hero";
import HomeMenu from "@/components/layout/HomeMenu";
import Introduction from "@/components/layout/Introduction";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Home() {
  return (
    <>
      <Hero/>
      <HomeMenu/>
      <Introduction/>
      <Contact/>

    </>
  );
}
