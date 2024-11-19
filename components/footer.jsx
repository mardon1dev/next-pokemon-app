import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full fixed bottom-0 bg-yellow-500">
      <p className="text-center text-white text-[18px] py-3">
        {" "}
        Made by{" "}
        <Link
          className="text-gray-800"
          target="_blank"
          href={"https://github.com/mardon1dev"}
        >
          Mardon1dev
        </Link>
      </p>
    </div>
  );
};

export default Footer;
