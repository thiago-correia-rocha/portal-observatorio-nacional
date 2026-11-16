
// Importa ícone
import {Goal, MapPinIcon} from "lucide-react";//A indicação se é UF/Região/municipio ou BR virá da invocação do componente no page.tsx

type Subject = {
  subject: string;
};

type SubProps = {
    subject: Subject;
    onChange: (regiao: string) => void;
}

export default function SubFilter ({
    subject,
    onChange
}:SubProps) {
    if (subject == "demografia")
        return (
            <>
                <div className="flex gap-3">
                <div className="text-[#FF525C] p-2 rounded-xl">
                  <Goal />
                </div>
                <div className="flex flex-col text-left">
                    <h1 className="text-lg font-bold">Explore o Censo 2022 </h1>
                    <p className="left text-xs text-gray-500">Escolhas entre as diferentes temáticas</p>
                </div>
                    <button
                          type="button"
                          className="rounded-md px-4 py-1 text-sm font-bold text-gray-600 transition-colors bg-[#FF525C] text-white"
                    >
                        Visão Geral
                    </button>
                    <button
                          type="button"
                          className="rounded-md px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                    >
                        Habitações
                    </button>
                    <button
                          type="button"
                          className="rounded-md px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900"
                    >
                        Povos Originários
                    </button>
                </div>
            </>
        );
}


