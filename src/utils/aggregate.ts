// // utils/aggregate.ts
// import { parseISO, format } from "date-fns";

// export function getMonthlySeries(sales: any[]) {
//   const monthly = sales.reduce((acc, sale) => {
//     const month = format(parseISO(sale.date), "yyyy-MM");
//     if (!acc[month]) {
//       acc[month] = { revenue: 0, target: 0 };
//     }
//     acc[month].revenue += sale.revenue;
//     acc[month].target += sale.target;
//     return acc;
//   }, {} as Record<string, { revenue: number; target: number }>);

//   return Object.entries(monthly).map(([month, val]) => ({
//     month,
//     revenue: val.revenue,
//     target: val.target,
//   }));
// }

// export function getProductShare(sales: any[]) {
//   const byProduct = sales.reduce((acc, sale) => {
//     acc[sale.product] = (acc[sale.product] || 0) + sale.revenue;
//     return acc;
//   }, {} as Record<string, number>);

//   return Object.entries(byProduct).map(([name, value]) => ({
//     name,
//     value,
//   }));
// }

// export function getTopProducts(sales: any[]) {
//   return getProductShare(sales)
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 5);
// }

// export function getTopCustomers(sales: any[]) {
//   const byClient = sales.reduce((acc, sale) => {
//     acc[sale.client] = (acc[sale.client] || 0) + sale.revenue;
//     return acc;
//   }, {} as Record<string, number>);

//   return Object.entries(byClient)
//     .map(([name, value]) => ({ name, value }))
//     .sort((a, b) => b.value - a.value)
//     .slice(0, 5);
// }
