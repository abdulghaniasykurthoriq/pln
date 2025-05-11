import React from "react";
import Logo from "../assets/logo.png";
import Avatar from "../assets/profile.png";
import { GoBell } from "react-icons/go";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

function Header() {
  return (
    <header className="bg-gradient-to-r from-cyan-500 to-cyan-700 text-white px-6 py-4 flex justify-between items-center shadow-sm h-[68px]">
      <img src={Logo} alt="Logo" className="" />

      <div className="flex items-center ">
        <GoBell className="text-xl" />
        <div className="flex items-center gap-2 pl-6 py-1">
          <img
            src={Avatar}
            alt="avatar"
            className="w-[40px] h-[40px] rounded-full"
          />
          <span className="text-sm pl-2">John Doe</span>
          <MdOutlineKeyboardArrowDown className="text-xl" />
        </div>
      </div>
    </header>
  );
}

export default Header;
