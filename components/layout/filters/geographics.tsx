

//A indicação se é UF/Região/municipio ou BR virá da invocação do componente no page.tsx
type GeoData = {
  cod_ibge: string;
  descricao: string;
};

type GeoProps = {
    options: GeoData[];
    label: string;
    value: string;
    onChange: (regiao: string) => void;
}

export default function GeoFilter ({
    options,
    label,
    value,
    onChange
}:GeoProps) {
    return (
        <select
          className="max-w-[200px] gap-3"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          {/* Opção padrão (Brasil / Todos) */}
          <option value="76">{label}</option>

          {/* Lista apenas as opções diferentes de "76" para não duplicar */}
          {options
            .filter((data) => String(data.cod_ibge) !== "76")
            .map((data) => (
              <option key={data.cod_ibge} value={data.cod_ibge}>
                {data.descricao}
              </option>
            ))}
        </select>
    )
}


