"use client"
// Usado para os diferentes estados dos filtros UF/Regiao
import { useState } from "react";
import { Users, Venus, Mars, MapPinCheck, MapPinIcon,Trophy   } from "lucide-react";



// Importa os dados
import demografia from "@/public/data/demografia/populacao-geral.json"
import area from "@/public/data/demografia/area-geral.json"
import territorios from "@/public/data/master-data/territorios-geral.json"
import metadata from "@/public/data/master-data/portal-geral.json"

// Importa componentes do Card do indicador
import IndicatorMainCard from "@/components/indicatorsCards/IndicatorMainCard";
import MapExplorer from "@/components/home/mapExplorer";

// Importa componentes de Filtros (geo e temática)
import GeoFilter  from "@/components/layout/filters/geographics"; //filtros geograficos
import SubFilter  from "@/components/layout/filters/subjects"; //filtros geograficos


// Extrai a população Total (faixa etária = 'Total')
const populacaoTotal = demografia.filter(
    (data) => data.faixa_etaria === 'Total'
)

// Extrai a população Total do nivel Regiao
const populacaoTotalBrRegiaoUf = populacaoTotal.filter(
    (data) => data.nivel !== 'MU'
)

// Extrai a população Total do nivel Uf (Usada no mapa)
const populacaoTotalUf = populacaoTotal.filter(
    (data) => data.nivel === 'UF'
)

// Extrai a população Total do Municipios
const populacaoTotalMun = populacaoTotal.filter(
    (data) => data.nivel === 'MU'
)

// Extrai a população Total do nivel Regiao
const metadataDemo = metadata.filter(
    (data) => data.tema !== 'demografia'
)

export default function DemographicExplorer() {
    // Prepara as alterações de estado do Select Box da Região
    const [territoriosSelecionados, setTerritoriosSelecionados] = useState("76");


    // Prepara as alterações de Municipio do Select Box do Municipio
    const [munSelecionado, setMunSelecionado] = useState("76");


    // FILTRO - Extrai os territórios
    const filterGeo = territorios.filter(
        (data) => data.nivel !== "MU"
    )


    // Filtra os Municipios a partir da UF.
    const munFiltrados = populacaoTotalMun.filter(
        (data) =>
            territoriosSelecionados !== "76" &&
            String(data.cod_ibge).slice(0, 2) === territoriosSelecionados //pega apenas muni que comecem com o cod da uf
    );

    // Procura os dados da região selecionada (usa o find para pegar o primeiro nome)
    const dadosTotalBrRegiaoUf = populacaoTotalBrRegiaoUf.find(
        (data) => String(data.cod_ibge) === territoriosSelecionados
    );

    // Procura os dados da UF selecionada para ser renderizada (usa o find para só exibir a UF selecionada)
    const dadosMun = munFiltrados.find(
        (data) => String(data.cod_ibge) === munSelecionado
    );

    // Define qual território será apresentado. essa é a const usada no IndicatorMainCard
    const dadosSelecionados =
        dadosMun ?? dadosTotalBrRegiaoUf;


    // EXTRAI A ÁREA TOTAL
    // Filtra os indicadores de território a partir da seleção
    const indicadoresTerritoriais = area.find(
        (data) => String(data.cod_ibge) === String(dadosSelecionados?.cod_ibge)
    )


    // Monta a estrutura dos indicadores para ser usada/enviada para o Indicators table
    const indicadoresDemo = [
        {
            label: "Área territorial",
            value: Number(indicadoresTerritoriais?.area),
            suffix: "km²",
            decimals: 3
        },
        {
            label: "Densidade demográfica",
            value: Number(indicadoresTerritoriais?.densidade),
            suffix: "hab/km²",
            decimals: 2
        }
    ];


    // Indicador de muncípios
    // Encontra território (BR/REGIAO/UF)
    const territorioAtual = filterGeo.find(
        (item) => String(item.cod_ibge) === String(territoriosSelecionados)
    );

    // Passa o endereço do json para o mapa da respectiva UF (só quando o nivel for uf)
    const geografiaMapa = territorioAtual?.nivel === "UF"
        ?"/maps/" + territorioAtual?.descricao + ".json"
        :"/maps/BR_UF.json" ;

    const dadosMapa  = territorioAtual?.nivel !== "UF"
        ?populacaoTotalUf
        :munFiltrados


    // Se territorio não for encontrado, é municipio (portanto qtd municipio = 1)
    const qtdMunicipios = munSelecionado && munSelecionado !== "76"
            ? 1
            : (territorioAtual?.qtd_municipios ?? 1);

    // METADATA DOS INDICADORES/GRAFICOS
    // Filtra os metadados de demografia
    const metadataDemo = metadata.find(
        (data) => data.id_conteudo === "demografia_populacao"
    )



    return (
        <>
            <div className="mx-auto w-full max-w-7xl px-6 sm:px-4">
                <div className="flex w-full flex-wrap items-stretch justify-start gap-4">
                    {dadosSelecionados && (
                    <IndicatorMainCard
                      label = "População Total"
                      value={Number(dadosSelecionados.pop_total)}
                      sub_value =  {String(dadosSelecionados.descricao)}
                      icone={<Users size={28} />}
                    />
                  )}
                  {dadosSelecionados && (
                    <IndicatorMainCard
                      label = "Mulheres"
                      value={Number(dadosSelecionados.mulheres_pop)}
                      sub_value = {Number(dadosSelecionados.mulheres_pop_perct)}
                      icone={<Venus size={28} />}
                    />
                  )}
                  {dadosSelecionados && (
                    <IndicatorMainCard
                      label = "Homens"
                      value={Number(dadosSelecionados.homens_pop)}
                      sub_value = {Number(dadosSelecionados.homens_pop_perct)}
                      icone={<Mars size={28} />}
                    />
                  )}
                  {dadosSelecionados && (
                    <IndicatorMainCard
                      label = "Municípios"
                      value={Number(qtdMunicipios)}
                      sub_value = "no território"
                      icone={<MapPinCheck size={28} />}
                    />
                  )}
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-5 border border-gray-200 rounded-lg m-5 p-5">
               <div className="flex flex-wrap items-center justify-between gap-5 rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm">
                        <div className="bg-[#FFF0F1] text-[#FF525C] p-2 rounded-xl">
                          <MapPinIcon />
                        </div>
                        <div className="flex flex-col text-left gap-1">
                            <h1 className="text-lg font-bold">Explore por terriório</h1>
                            <p className="left text-xs text-gray-500">Selecione uma região para ver os indicadores</p>
                        </div>
                        <div className="flex  gap-5">
                            <GeoFilter
                            options={filterGeo}
                            label="Brasil"
                            value={territoriosSelecionados}
                            //onChange para alterar a regiao e "zerar" a Uf selecionada para 76
                            onChange={(novoTerritorio) => {
                              setTerritoriosSelecionados(novoTerritorio);
                              setMunSelecionado("76");
                            }}
                            />
                            <div className="w-[200px] shrink overflow-hidden">
                                {territorioAtual?.nivel === "UF"  && (
                                            <GeoFilter
                                              options={munFiltrados}
                                              label="Todos os Municípios"
                                              value={munSelecionado}
                                              onChange={setMunSelecionado}
                                            />

                                )}
                            </div>
                        </div>
               </div>
                <div >
                    <SubFilter
                        subject="demografia"
                    />
                </div>
            </div>
                <div>
                <MapExplorer
                        titulo ={metadataDemo.titulo_principal}
                        texto ={metadataDemo.texto_principal}
                        titulo_ajuda ={metadataDemo.titulo_ajuda}
                        texto_ajuda ={metadataDemo.texto_ajuda}
                        titulo_importancia ={metadataDemo.titulo_importancia}
                        texto_importancia ={metadataDemo.texto_importancia}
                        MapData={dadosMapa}
                        indicadores={indicadoresDemo}
                        territorio={territoriosSelecionados} //Br/UF e Regiao
                        municipio={munSelecionado} // Municipios
                        json_file={geografiaMapa}
                    />
                </div>
        </>
    );
}
