"use client";

import Link from "next/link";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About me", href: "/about" },
  { name: "Contact", href: "/contact" },
  // { name: "Train Planner", href: "/trains" },
];

export function Navbar() {

  return navigation.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="text-sm/6 font-semibold text-white"
      onClick={(e) => {
        // e.preventDefault()
        console.log(`Navigating to ${item.href}`, );
      }}
    >
      {item.name}
    </Link>
  ));
}

export function MobileNavbar() {
  // const basePath = publicRuntimeConfig?.basePath || "";

  return navigation.map((item) => (
    <Link
      key={item.name}
      href={item.href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
    >
      {item.name}
    </Link>
  ));
}
