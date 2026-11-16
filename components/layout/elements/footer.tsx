"use client";

import { FaLinkedin, FaGithub } from 'react-icons/fa6';

const menu = [
  { label: "Início", href: "/" },
  { label: "Temas", href: "/#temas" },
  { label: "Explorar dados", href: "/#explorar" },
  { label: "Sobre", href: "/#sobre" },
];

export default function Footer() {

  return (
    <footer className="border-t border-gray-200 bg-[#FCFAF8] ">
      <div className="mx-auto flex flex-col grid max-w-7xl grid-cols-1 items-center gap-5 px-6 lg:grid-cols-[1fr_auto_1fr]">
            <a href="/public" className="whitespace-nowrap py-5 font-serif text-sm text-[#101D35] font-bold">
              Observatório{" "}
              <span className="text-[#FF525C]">
                Nacional
              </span>
            </a>
            <p className="text-xs center text-gray-500">
                <strong> Fontes </strong>
                IBGE, Datasus, bases analíticas do projeto
            </p>
            <div className="flex items-center gap-4">
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={18} className="text-gray-600 transition-colors hover:text-[#ff525c]" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <FaGithub size={18} className="text-gray-600 transition-colors hover:text-[#ff525c]" />
                </a>
            </div>
      </div>
    </footer>
  );
}
