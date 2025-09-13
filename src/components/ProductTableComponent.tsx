import { useState, type FC } from 'react';
export type Product = {
  name: string;
  value: number;
};
export type ProductTableProps = {
  products: Product[];
};
export const ProductTableComponent: FC<ProductTableProps> = ({ products }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'des'>('des');
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'des' : 'asc'));
    products.sort((a, b) =>
      sortOrder === 'asc' ? a.value - b.value : b.value - a.value,
    );
  };
  return (
    <div className="w-full flex px-5 max-sm:px-0">
      <div className="w-full overflow-x-auto">
        <table className="w-full   border-collapse rounded-lg overflow-hidden shadow-sm bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="py-3 px-4 flex gap-3 items-center justify-center text-center text-sm font-medium text-gray-600">
                Revenue
                <div className="cursor-pointer" onClick={toggleSortOrder}>
                  {sortOrder === 'des' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e65151"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-move-up-icon lucide-move-up"
                    >
                      <path d="M8 6L12 2L16 6" />
                      <path d="M12 2V22" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#e65151"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-move-down-icon lucide-move-down"
                    >
                      <path d="M8 18L12 22L16 18" />
                      <path d="M12 2V22" />
                    </svg>
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((row, idx) => (
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
