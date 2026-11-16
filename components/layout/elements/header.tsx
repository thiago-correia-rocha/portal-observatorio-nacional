"use client";


import { useState } from "react";
import { Search } from "lucide-react";
import Menu from "@/components/layout/elements/menu";


export default function Header() {
  const [search, setSearch] = useState("");
  return (
    <header className="w-full border-b border-gray-200 bg-[#FCFAF8]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-5 px-6 lg:grid-cols-[1fr_auto_1fr]">

        {/* Logótipo à esquerda */}
        <a href="/" className="whitespace-nowrap py-5 font-serif text-2xl text-[#101D35]">
          Observatório{" "}
          <span className="text-[#FF525C]">
            Nacional
          </span>
        </a>

        {/* Menu centralizado */}
        <Menu />

        {/* Pesquisa à direita */}
        <div className="flex w-full justify-end py-5">
          <div className="flex w-full max-w-[250px] items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5 focus-within:border-[#FF525C]">
            <Search
              size={18}
              className="shrink-0 text-[#64748B]"
              aria-hidden="true"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Pesquisar..."
              aria-label="Pesquisar por temas, indicadores ou territórios"
              className="min-w-0 w-full bg-transparent text-sm text-[#101D35] outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
