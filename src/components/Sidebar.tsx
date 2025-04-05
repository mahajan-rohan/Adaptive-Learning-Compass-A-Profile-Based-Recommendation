import Link from "next/link";
import React from "react";

const Sidebar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`w-full lg:w-[240px] py-4 bg-transparent lg:h-[calc(100vh-80px)] border-b lg:border-b-0 lg:border-r border-gray-600/30 sticky left-0 top-[85px] bottom-0 max-lg:bg-black/30 backdrop-blur-[8px] ${className} z-40`}
    >
      <ul className="flex flex-row lg:flex-col gap-x-4 lg:gap-y-2 px-4">
        <li className="text-gray-400 cursor-pointer hover:text-gray-100 flex items-center py-2 px-4 text-sm hover:bg-gray-500/10 rounded-md">
          <Link
            href="/dashboard"
            className="flex items-center font-semibold tracking-wider"
          >
            <span className="material-symbols-outlined mr-2 text-[28px] text-nowrap">
              dashboard
            </span>
            Dashboard
          </Link>
        </li>
        <li className="text-gray-400 cursor-pointer hover:text-gray-100 flex items-center py-2 px-4 text-sm hover:bg-gray-500/10 rounded-md">
          <Link
            href="/courses"
            className="flex items-center font-semibold tracking-wider"
          >
            <span className="material-symbols-outlined mr-2 text-[28px] text-nowrap">
              book
            </span>
            My Courses
          </Link>
        </li>
        <li className="text-gray-400 cursor-pointer hover:text-gray-100 flex items-center py-2 px-4 text-sm hover:bg-gray-500/10 rounded-md">
          <Link
            href="/account"
            className="flex items-center font-semibold tracking-wider"
          >
            <span className="material-symbols-outlined mr-2 text-[28px] text-nowrap">
              person
            </span>
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
