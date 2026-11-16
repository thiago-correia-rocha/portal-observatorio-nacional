
type IndicatorRow = {
  value: number | string;
  suffix?: string;
  decimals?: number;
};

type IndicatorTableProps = {
  descricao?: string;
  items: IndicatorRow[];
};
export default function IndicatorTable({
    items,
}:IndicatorTableProps){


    return (
        <table className="w-full text-sm text-left">
            <thead>
            <tr className="border-b border-gray-200 text-left">
                <th className="p-3">Classe Demográfica</th>
                <th className="p-3">Valor</th>
            </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                  <tr
                      className="border-b border-gray-200 odd:bg-[#F9F7F5] h-[30px]"
                      key ={item.label}
                  >
                      <td>
                          {item.label}
                      </td>
                      <td className="font-bold">
                          {item.value.toLocaleString("PT-BR")} {item.suffix}
                      </td>
                  </tr>
                ))}
            </tbody>
        </table>
    );
}