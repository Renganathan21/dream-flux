"use client";

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="sidebar flex flex-col h-screen bg-white shadow-lg">
      {/* Sticky Logo at the Top */}
      <div className="sticky top-0 z-10 bg-white px-4 py-4">
        <Link href="/" className="sidebar-logo">
          <Image
            src="/assets/images/logo-text.svg"
            alt="logo"
            width={180}
            height={28}
          />
        </Link>
      </div>

      {/* Scrollable Navigation Items */}
      <nav className="flex-grow overflow-y-auto px-4">
        <SignedIn>
          <ul className="sidebar-nav_elements flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = link.route === pathname;

              return (
                <li
                  key={link.route}
                  className={`sidebar-nav_element group ${
                    isActive
                      ? "bg-purple-gradient text-white"
                      : "text-gray-700"
                  }`}
                >
                  <Link
                    className="sidebar-link flex items-center gap-2 p-2"
                    href={link.route}
                  >
                    <Image
                      src={link.icon}
                      alt="logo"
                      width={24}
                      height={24}
                      className={`${isActive && "brightness-200"}`}
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </SignedIn>
      </nav>

      {/* Fixed User Button at the Bottom */}
      <div className="sticky bottom-0 bg-white px-4 py-4">
        <SignedIn>
          <UserButton afterSignOutUrl="/" showName />
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover w-full">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </div>
    </aside>
  );
};

export default Sidebar;
