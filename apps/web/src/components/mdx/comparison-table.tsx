type ComparisonTableProps = {
  headers: string[];
  rows: string[][];
};

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-[color:var(--border)]">
            {headers.map((h) => (
              <th
                key={h}
                className="py-2 pr-6 text-left font-semibold text-[color:var(--fg)]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr
              key={ri}
              className="border-b border-[color:var(--border)] last:border-0"
            >
              {row.map((cell, ci) => (
                <td
                  key={ci}
                  className="py-2 pr-6 leading-7 text-[color:var(--fg-muted)]"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
