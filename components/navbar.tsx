import Image from "next/image";
import Link from "next/link";
import React from "react";

import Logo from "../public/images/logo.svg";

const Navbar = () => {
  return (
    <nav className="bg-yellow-500 p-4 fixed w-full top-0 h-[100px]">
      <div className="container mx-auto flex justify-between items-center h-full">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={158} height={63} priority />
        </Link>
        <Link className="text-white text-[28px] font-bold" href="/pokemon">
          <span>Pokemon</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
