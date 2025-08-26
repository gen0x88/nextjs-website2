const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "About me", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  return navigation.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="text-sm/6 font-semibold text-white"
    >
      {item.name}
    </a>
  ));
}

export function MobileNavbar() {
  return navigation.map((item) => (
    <a
      key={item.name}
      href={item.href}
      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
    >
      {item.name}
    </a>
  ));
}
