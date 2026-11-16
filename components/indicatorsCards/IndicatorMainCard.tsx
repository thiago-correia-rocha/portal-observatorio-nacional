

type DemographicProps = {
    label: string;
    value: number;
    sub_value: string | number;
    suffix?: string; //opcional (o ? indica que é opcional)
    icone: React.ReactNode;
}

export default function IndicatorMainCard({
    label,
    value,
    sub_value,
    suffix,
    icone
}:DemographicProps){

    const sub_value_formatado =
        typeof sub_value === "number"
        ? (sub_value * 100).toFixed(2).replace('.', ',') + '%'
        : sub_value

    function formatarSubValue(sub_value_formatado: string) {
      switch (sub_value_formatado) {
        case "BR":
          return "no Brasil";
        case "REGIAO":
          return "região mais populosa";
        case "UF":
          return "estado mais populoso";
        case "MU":
          return "município mais populoso";
        default:
          return sub_value_formatado; // Caso seja um número (como percentagem) ou outro texto, mantém o valor original
      }
    }


    return (
        <>
        <article className="flex justify-between gap-3">
        <div className="flex items-center gap-3  w-[240px] border border-gray-200 rounded-lg bg-white p-5 text-xs transition-all duration-200 hover:-translate-x-0.5 hover:shadow-md">
            <div className="bg-[#FFF0F1] text-[#FF525C] p-2 rounded-xl">
              {icone}
            </div>
            <p className="font-bold">
                {label}
                <br />
                <strong className="font-serif text-[clamp(1.35rem,1.35vw,1.35rem)] text-[#FF525C]">{value.toLocaleString("pt-BR")}{suffix}</strong>
                <br />
                <strong className="mt-10 font-bold text-[#64748B] ">{formatarSubValue(sub_value_formatado)}</strong>
            </p>
        </div>
        </article>

        </>
    )
}