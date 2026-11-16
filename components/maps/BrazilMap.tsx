"use client";

// Imports para projeção do mapa
import { geoMercator } from "d3-geo";
import { feature } from "topojson-client";
import type { GeoProjection } from "d3-geo";

//import dos estados: useState para os hovers e userRef para posição do mouse (para o tooltip). O userEffect é para projeçao do Mapa
import { useState ,useRef, useEffect } from "react";

//importa libs para leitura do mapa
import {
  ComposableMap, //Cria a área SVG e define a projeção geográfica.
  Geographies, //Lê o topoJson do mapa
  Geography, // Desenha cada território individualmente.
} from "react-simple-maps";



//parâmetros de entrada (atualmente a page.tsx chama o mapa e deve passar ou conter (ao menos) esses parâmetros)
type MapData = {
    cod_ibge: string;
    descricao: string;
    pop_total: number;
    pop_ranking: number;
}

//define a pros com array dos parâmetros
type BrazilMapProps = {
    MapData: MapData[],
    territorio: string,
    munic: string,
    json: string
};



export default function BrazilMap ({
    MapData,
    territorio,
    munic,
    json
}: BrazilMapProps) {

    //estados/ações do mapa para hover e posição da tooltip
    //hover
    const [hoveredTerritorio, sethoveredTerritorio] = useState("");

    //posição do mouse
    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0
    })

    // Estados que guardam a projeção do map
    const [projection, setProjection] = useState<GeoProjection | null>(null);

    //define const com a url do mapa (a partir do parametro da props (territorio selecionado pelo User)
    const geoUrl = json;

    const mapRef = useRef<HTMLDivElement>(null)


    //Filtra dados de ufs que estão selecionadas com o cursor (hover)
    const dadosHover = MapData.find(
        data =>
        geoUrl.endsWith("BR_UF.json")
            ? String(data.descricao) === hoveredTerritorio
            : String(data.cod_ibge) === hoveredTerritorio
    )

    // Cálculo do tamanho do mapa
    useEffect(() => {
        let cancelled = false;

        async function ajustarMapa() {

            const response = await fetch(geoUrl);

            if (!response.ok) {
                throw new Error("Erro ao carregar o mapa");
            }

            const topology = await response.json();

            const objectName = Object.keys(topology.objects)[0];

            const geometria = feature(
                topology,
                topology.objects[objectName]
            );

            const novaProjection = geoMercator()
                .fitExtent(
                    [[20, 20], [480, 480]], // faz a mágica: expande um conteudo de 20x20 para quase os 500x500 do mapa :)
                    geometria
                );

            if (!cancelled) {
                setProjection(() => novaProjection);
            }
        }

        ajustarMapa().catch(console.error);

        return () => {
            cancelled = true;
        };

    }, [geoUrl]);

    //main return
    return (
        //div que envolve o map (importante para a tooltip)
        <div className="flex relative w-[500px]" ref={mapRef}>
            <ComposableMap
                height = {500}
                width = {500}
                projection={projection ?? "geoMercator"}
                projectionConfig={{
                    center: [-54, -15],
                    scale: 650,
                }}
              className="w-full max-w-[600px]"
            >
            <Geographies geography={geoUrl}>
              {({ geographies }) => {
                //calcula a maxima populacao das ufs, para ser usada no degrade de cores no map
                const maxPop = Math.max(
                    ...MapData.map((data) => data.pop_total)
                );

                return geographies.map((geo:any) => {

                  const codigo = geoUrl.endsWith("BR_UF.json")
                    ?String(geo.id)
                    :String(geo.properties.Cod);

                  const municipioSelecionado =
                      !geoUrl.endsWith("BR_UF.json") &&
                      codigo === munic;

                  const dadosTerritorio = MapData.find(data =>
                    geoUrl.endsWith("BR_UF.json")
                        ? String(data.descricao) === codigo
                        : String(data.cod_ibge) === codigo
                  );

                  const pertenceAoTerritorio = territorio === "76" ||  dadosTerritorio?.cod_ibge.startsWith(territorio) ;

                  const populacao = dadosTerritorio?.pop_total ?? 0;
                  const populacao_perct = populacao / (maxPop || 1);

                  const corFinal = pertenceAoTerritorio
                    ? cor()
                    : "#E5E7EB";

                  function cor() {
                      if (populacao_perct > 0.90) return "#7F1427";
                      if (populacao_perct > 0.75) return "#981B30";
                      if (populacao_perct > 0.60) return "#B42336";
                      if (populacao_perct > 0.45) return "#C92F43";
                      if (populacao_perct > 0.30) return "#D93648";
                      if (populacao_perct > 0.20) return "#E74759";
                      if (populacao_perct > 0.15) return "#F25F6B";
                      if (populacao_perct > 0.10) return "#F57580";
                      if (populacao_perct > 0.07) return "#F88C95";
                      if (populacao_perct > 0.05) return "#F99AA2";
                      if (populacao_perct > 0.03) return "#F9A8AF";
                      if (populacao_perct > 0.02) return "#FAB8BE";
                      if (populacao_perct > 0.01) return "#FBC7CC";
                      if (populacao_perct > 0.005) return "#FCD7DA";
                      return "#FDE7E9";
                  }
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={hoveredTerritorio === String(codigo) ? "#ff525c" : corFinal} // se a uf for selecionada retorna a cor #ff525c, para o resto chama a funcao cor()
                      stroke={municipioSelecionado ? "black" : "#FFFFFF"}
                      strokeWidth={municipioSelecionado ? 5 : 0.5}
                      className="cursor-pointer transition-colors duration-200"

                      //ações do Mouse
                      // Hover: Seta a uf/regiao/municipio quando selecionada
                      onMouseEnter={() => sethoveredTerritorio(String(codigo))}
                      // Hover: desmarca a uf/regiao/municipio quando deixada de hover
                      onMouseLeave={() => sethoveredTerritorio("")}
                      // Posição: Calcula a posição do mouse (usada para referência da tooltip
                      onMouseMove={(event) => {
                                  const rect = mapRef.current?.getBoundingClientRect();

                                  if (rect) {
                                    setMousePosition({
                                      x: event.clientX - rect.left,
                                      y: event.clientY - rect.top
                                    });
                                  }
                      }}
                    />
                  );
                });
              }}
            </Geographies>
            </ComposableMap>
            {dadosHover && (
                <div className="absolute bg-white border border-gray-200 rounded-lg shadow-lg p-4 pointer-events-none z-10"
                     //seta posição da tooltip
                     style={{
                              left: mousePosition.x + 12,
                              top: mousePosition.y + 12
                            }}
                >
                    <p className="font-bold">
                        {dadosHover.descricao}
                    </p>
                    <p className=" text-xs flex gap-1">
                        População: <strong className="font-bold text-[#ff525c]">{dadosHover.pop_total.toLocaleString("pt-BR")} </strong>
                    </p>
                    <p className=" text-xs flex gap-1">
                        Ranking: <strong className="font-bold text-[#ff525c]">{dadosHover.pop_ranking.toLocaleString("pt-BR")}º</strong>
                    </p>
                </div>
            )}
        </div>

    );

}