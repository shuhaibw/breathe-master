import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    if(document.cookie.includes('token')) {
      window.location.href = '/logged/home'
    }
    else {
      window.location.href = '/login'
    }
  }, [])
  return (
    <>
    
    </>
  );
}
