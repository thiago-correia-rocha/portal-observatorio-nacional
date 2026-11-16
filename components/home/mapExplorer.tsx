"use client"

import { Lightbulb } from "lucide-react";

import BrazilMap from "@/components/maps/BrazilMap";
import IndicatorTable from "@/components/tables/indicatorTable";

type MapData = {
    cod_ibge: string;
    descricao: string;
    pop_total: number;
    pop_ranking: number;
}

type Indicadores = {
  label: string;
  value: number | string;
  suffix?: string;
  decimals?: number;
};


type MapProps = {
    titulo: string;
    texto: string;
    titulo_importancia: string;
    texto_importancia: string;
    titulo_ajuda: string;
    texto_ajuda: string;
    MapData: MapData[]; // Traz o tipo se populacaoTotalUf for um array de objetos ou números
    indicadores?: Indicadores[]; // Traz o tipo se populacaoTotalUf for um array de objetos ou números
    territorio: string; // Traz o tipo se populacaoTotalUf for um array de objetos ou números (Br/Regiao/Uf e Municipio). ATENÇÃO: Como o coód é sempre da UF, para o municipios passamos o parâmetro municipio, abaixo
    municipio?: string; //Traz o total do municipio selecionado
    json_file:string;
};


export default function MapExplorer({
   titulo ,
   texto,
   titulo_importancia,
   texto_importancia,
   titulo_ajuda,
   texto_ajuda,
   MapData,
   indicadores,
   territorio,
   municipio,
   json_file
}: MapProps) {
    return (
        <>
        <div className="m-5 flex flex-col flex-wrap items-center justify-between gap-1 rounded-lg border border-gray-200 p-6 lg:flex-row">
            {/* Coluna da Esquerda: Título e Texto empilhados */}
            <div className="flex max-w-md flex-col gap-4 text-left">
                <div className="flex items-center gap-2">
                    <div className="h-[3px] w-10 rounded-full bg-[#FF525C]" />
                    <p className="text-xs text-[#FF525C]">EM DESTAQUE</p>
                </div>
                <h1 className="font-serif text-4xl leading-[1.08] tracking-tight text-[#101D35] md:text-5xl xl:text-[2.75rem]">
                    {titulo}
                </h1>
                <p className="text-sm leading-relaxed text-gray-400">
                    {texto}
                </p>
                {indicadores && (
                        <IndicatorTable
                          items={indicadores}
                        />
                    )
                }
            </div>
             <div className="flex flex-1 justify-right">
               <BrazilMap
                 MapData={MapData}
                 territorio={territorio}
                 munic={municipio}
                 json={json_file}
               />
             </div>
            <div className="h-60 w-[2px] rounded-full bg-gray-200" />
            <div className=" max-w-[400px] items-center gap-2 ml-3">
                <div className="flex gap-2">
                    <div className="h-5 w-[3px] rounded-full bg-[#FF525C]" />
                    <p className="font-bold text-base text-gray-700">{titulo_ajuda}</p>
                </div>
                <p className="text-xs text-gray-400 ml-3 text-justify ">{texto_ajuda}</p>
                <div className=" max-w-[400px] items-center gap-1 mt-5 bg-[#fdf3f1] p-5 rounded-lg ">
                <div className="flex gap-2 ">
                    <Lightbulb  className="text-[#FF525C]"/>
                    <p className="font-bold text-base text-gray-700">{titulo_importancia}</p>
                </div>
                <p className="text-xs text-gray-400 m-3 text-justify ">{texto_importancia}</p>
            </div>
            </div>
        </div>

        </>

    );
}