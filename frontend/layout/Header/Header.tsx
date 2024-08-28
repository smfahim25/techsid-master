"use client";
import { auth } from "@/config/firebase";
import { logout } from "@/store/auth/slice";
import { signOut } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";

interface User {
  id: string;
  name: string;
  // Add other user properties here
}

interface RootState {
  auth: {
    user: User | null;
  };
}

const Header: React.FC = () => {
  const normal = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | FocusEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("focusin", handleClickOutside); // Add focusin listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("focusin", handleClickOutside); // Clean up focusin listener
    };
  }, []);

  return (
    <header className="p-4 bg-primary shadow-md text-white">
      <div className="flex justify-between h-16 mx-auto items-center">
        <Link href="/" passHref>
          <span className="cursor-pointer shrink-0">
            <Image src="/logo.svg" alt="Logo" width={60} height={60} />
          </span>
        </Link>

        <nav className="hideNav md:flex space-x-4">
          <Link href="/courses" className="px-4 py-2  rounded">
            Courses
          </Link>
          <Link href="/tutorials" className="px-4 py-2  rounded">
            Tutorials
          </Link>
          <Link href="/about" className="px-4 py-2  rounded">
            About Us
          </Link>
          <Link href="/community" className="px-4 py-2  rounded">
            Community
          </Link>
          <Link href="/contest" className="px-4 py-2  rounded">
            Contest
          </Link>
          <Link href="/jobs" className="px-4 py-2  rounded">
            Jobs
          </Link>
          <Link href="/lab" className="px-4 py-2  rounded">
            Lab
          </Link>
          <Link href="/blogs" className="px-4 py-2  rounded">
            Blogs
          </Link>
        </nav>
        {!normal ? (
          <div className="hideNav md:flex space-x-4">
            <Link href="/login" passHref>
              <button className="px-4 py-2 rounded">Login</button>
            </Link>
            <Link href="/signup" passHref>
              <button className="px-4 py-2 rounded">Sign up</button>
            </Link>
          </div>
        ) : (
          <div className="hideNav md:flex space-x-4">
            <button
              className="px-4 py-2 rounded"
              onClick={() => {
                dispatch(logout());
                signOut(auth);
              }}
            >
              Logout
            </button>
          </div>
        )}
        <div className="relative hideIcon" ref={menuRef}>
          <label
            htmlFor="menu-toggle"
            className="cursor-pointer p-10"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          {showMenu && (
            <ul
              className="absolute right-0 menuBar bg-primary shadow-md rounded-lg w-48 flex-col z-50"
              id="menu"
            >
              <li>
                <Link
                  href="/courses"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Tutorials
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="/contest"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Contest
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/lab"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Lab
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="block px-4 py-2"
                  onClick={closeMenu}
                >
                  Blogs
                </Link>
              </li>
              {!normal && (
                <li>
                  <Link
                    href="/login"
                    passHref
                    className="block px-4 py-2"
                    onClick={closeMenu}
                  >
                    <button className="">Login</button>
                  </Link>
                </li>
              )}
              {!normal && (
                <li>
                  <Link
                    href="/signup"
                    passHref
                    className="block px-4 py-2"
                    onClick={closeMenu}
                  >
                    <button className="">Sign up</button>
                  </Link>
                </li>
              )}
              {normal && (
                <li>
                  <button
                    className="block px-4 py-2"
                    onClick={() => {
                      dispatch(logout());
                      signOut(auth);
                    }}
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
