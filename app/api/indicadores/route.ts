
import { NextRequest, NextResponse } from "next/server";
import { lerPopulacaoS3 } from "@/lib/s3";


export async function GET(request: NextRequest) {
  try {
    const nivel = request.nextUrl.searchParams.get("nivel");
    const codIbge = request.nextUrl.searchParams.get("cod_ibge");

    if (
      !nivel ||
      !["BR", "REGIAO", "UF", "MU"].includes(nivel) ||
      !codIbge ||
      !/^\d{1,7}$/.test(codIbge)
    ) {
      return NextResponse.json(
        { erro: "Território inválido" },
        { status: 400 }
      );
    }

    const dados = await lerPopulacaoS3();

    console.log("Quantidade de registos:", dados.length);
    console.log("Primeiros registos:", dados.slice(0, 3));
    
    console.log(
      "Exemplo de UF:",
      dados.find((item) => item.nivel === "UF")
    );
    
    console.log(
      "Exemplo de Rondônia:",
      dados.find((item) => String(item.cod_ibge) === "11")
    );

    const registro = dados.find((item) =>
      item.nivel === nivel &&
      item.cod_ibge === codIbge &&
      item.faixa_etaria === "Total"
    );

    if (!registro) {
      return NextResponse.json(
        { erro: "Território não encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      cod_ibge: registro.cod_ibge,
      nivel: registro.nivel,
      descricao: registro.descricao,
      populacao: registro.pop_total,
      mulheres: registro.mulheres_pop,
      homens: registro.homens_pop,
      mulheres_percentual: registro.mulheres_pop_perct,
      homens_percentual: registro.homens_pop_perct,
    });

  } catch (erro) {
    console.error("Erro na leitura do S3:", erro);

    return NextResponse.json(
      { erro: "Não foi possível obter os indicadores" },
      { status: 500 }
    );
  }
}
