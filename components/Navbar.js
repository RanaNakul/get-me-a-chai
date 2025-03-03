"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Btn from "./common/Btn";

const Navbar = () => {
  const { data: session } = useSession();

  const [showdropdown, setShowdropdown] = useState(false);

  return (
    <nav className=" bg-[#00091dea] text-white w-full">
      <div className="w-11/12 flex items-center justify-between mx-auto py-4">
        <Link href="/">
          <div className="logo font-bold text-lg flex items-center ">
            <span>
              <Image
                className="invert-[0.2] w-[34px] h-auto"
                src="./tea.gif"
                alt="tea gif"
                width={100}
                height={100}
                unoptimized
              />
            </span>
            GetMeaChai!
          </div>
        </Link>

        {/* <ul className="justify-between gap-4 hidden sm:flex">
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul> */}

        <div className="flex justify-end gap-4 w-[144.03px]">
          {session ? (
            <div className=" relative">
              <button
                id="dropdownUserAvatarButton"
                onClick={() => setShowdropdown(!showdropdown)}
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                type="button"
                title="User menu"
                onBlur={() => {
                  setTimeout(() => {
                    setShowdropdown(false);
                  }, 200);
                }}
              >
                <Image
                  src={session.user.image}
                  alt="user image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>

              <div
                id="dropdownAvatar"
                className={`z-10 ${
                  showdropdown ? "" : "hidden"
                } absolute right-0 top-12 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600`}
              >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                  <div>{session.user.name}</div>
                  <div className="font-medium truncate">
                    {session.user.email}
                  </div>
                </div>
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownUserAvatarButton"
                >
                  <li>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${session.user.username}`}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Your Page
                    </Link>
                  </li>
                </ul>
                <div className="py-2">
                  <Link
                    href=""
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    onClick={() => signOut()}
                  >
                    Sign out
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link href="/login">
              {/* <Btn text="Login" onclick={() => signIn("github")} /> */}
              <Btn text="Login" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
