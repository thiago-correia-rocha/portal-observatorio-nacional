

const menu = [
  { label: "Início", href: "/" },
  { label: "Item 2", href: "/#temas" },
  { label: "Item 3", href: "/#explorar" },
  { label: "Item 4", href: "/#sobre" },
  { label: "Item 5", href: "/#sobre" },
  { label: "Item 6", href: "/#sobre" },
];

export default function Header() {
    {/* Menu */}
    return (
        <nav
          aria-label="Navegação principal"
          className="h-full"
        >
          <ul className="flex h-full flex-wrap items-stretch justify-center gap-6">
            {menu.map((item) => {
              const isActive = item.href === "/";

              return (
                <li key={item.label} className="flex">
                  <a
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative flex items-center text-sm font-semibold transition-colors hover:text-[#FF525C] ${
                      isActive
                        ? "text-[#FF525C] after:absolute after:bottom-[-1px] after:left-0 after:h-[3px] after:w-full after:bg-[#FF525C]"
                        : "text-[#101D35]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
    );
}