import type { FC } from 'react';
export type Customer = {
  name: string;
  value: number;
};
export type CustomerTableProps = {
  customers: Customer[];
};
export const CustomerTableComponent: FC<CustomerTableProps> = ({
  customers,
}) => {
  return (
    <div className="w-full flex px-5 max-sm:px-0">
      <div className="w-full overflow-x-auto">
        <table className="w-full   border-collapse rounded-lg overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 text-center text-sm font-medium text-gray-600">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((row, idx) => (
              <tr
                key={idx}
                className={`hover:bg-gray-50 
                   bg-white
                `}
              >
                <td className="py-2 px-4 whitespace-nowrap text-gray-800 text-sm">
                  {row.name}
                </td>
                <td className="py-2 px-4 whitespace-nowrap text-gray-800 text-sm text-center font-semibold">
                  ₹{row.value.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
