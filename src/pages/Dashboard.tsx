import { useMemo, useState } from 'react';
import { ChartComponent } from '../components/ChartComponent';
import { NavBar } from '../components/NavBar';
import salesData from '../../data.json';
import { PieChartComponent } from '../components/PieChartComponent';
import {
  ProductTableComponent,
  type Product,
} from '../components/ProductTableComponent';
import { CustomerTableComponent } from '../components/CustomerTableComponent';

type SalesDataType = {
  date: string;
  rep: string;
  client: string;
  product: string;
  units: number;
  revenue: number;
  target: number;
};

function toMonthKey(d: string) {
  return d.slice(0, 7); // YYYY-MM
}

// Utility: format numbers as currency (simple)
const fmtCurrency = (n: number) =>
  n.toLocaleString(undefined, { maximumFractionDigits: 0 });

export default function Dashboard() {
  const [selectedMonth, setSelectedMonth] = useState(
    toMonthKey(salesData[0].date),
  );

  const {
    totalRevenue,
    targetAchPct,
    revenueGrowthPct,
    monthlySeries,
    productShare,
    topProducts,
    topCustomers,
    months,
  } = useMemo(() => {
    const byMonth = new Map<
      string,
      {
        revenue: number;
        target: number;
        products: Map<string, number>;
        customers: Map<string, number>;
      }
    >();

    for (const row of salesData as SalesDataType[]) {
      const m = toMonthKey(row.date);

      if (!byMonth.has(m)) {
        byMonth.set(m, {
          revenue: 0,
          target: 0,
          products: new Map(),
          customers: new Map(),
        });
      }
      const mv = byMonth.get(m)!;

      mv.revenue += row.revenue;
      mv.target += row.target;

      mv.products.set(
        row.product,
        (mv.products.get(row.product) ?? 0) + row.revenue,
      );
      mv.customers.set(
        row.client,
        (mv.products.get(row.client) ?? 0) + row.revenue,
      );
    }

    const monthlySeries = Array.from(byMonth.entries())
      .map(([month, vals]) => ({
        month,
        revenue: vals.revenue,
        target: vals.target,
      }))
      .sort((a, b) => (a.month < b.month ? -1 : 1));
    console.log(monthlySeries);

    const current = byMonth.get(selectedMonth);

    let totalRevenue = 0;
    let totalTarget = 0;
    let targetAchPct = 0;
    let revenueGrowthPct: number | null = null;
    let productShare: { name: string; value: number }[] = [];
    let topProducts: Product[] = [];
    let topCustomers: { name: string; value: number }[] = [];

    if (current) {
      totalRevenue = current.revenue;
      totalTarget = current.target;
      targetAchPct = totalTarget === 0 ? 0 : (totalRevenue / totalTarget) * 100;

      productShare = Array.from(current.products.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
      topProducts = productShare.slice(0, 5);
      topCustomers = Array.from(current.customers.entries())
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      console.log(topCustomers);
    }

    const idx = monthlySeries.findIndex((m) => m.month === selectedMonth);
    if (idx > 0) {
      const last = monthlySeries[idx].revenue;
      const prev = monthlySeries[idx - 1].revenue;
      revenueGrowthPct = prev === 0 ? null : ((last - prev) / prev) * 100;
    }

    const months = monthlySeries.map((m) => m.month);

    return {
      totalRevenue,
      totalTarget,
      targetAchPct,
      revenueGrowthPct,
      productShare,
      topProducts,
      topCustomers,
      monthlySeries,
      months,
    };
  }, [selectedMonth]);

  return (
    <div className="w-full h-screen flex flex-col items-center ">
      <NavBar />
      <div className="flex flex-col mt-28 gap-2 w-full max-w-7xl px-8 max-sm:px-2  ">
        <div className="flex gap-3 items-center  justify-start ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#da4e4e"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle-dot-icon lucide-circle-dot"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="1" />
          </svg>
          <h2 className="font-sans text-xl text-[#342d2d]">Dashboard</h2>
        </div>
        <div className="grid grid-cols-2 gap-2   grid-rows-8 max-sm:grid-rows-8  ">
          <div className="col-span-2 min-h-20 row-start-1 col-start-1 max-sm:flex-col  flex justify-center  items-center gap-5">
            <div className=" flex gap-5 h-full  max-sm:text-sm max-sm:py-1.5  px-2  items-center justify-around rounded-xl bg-slate-50 w-full">
              {' '}
              <div className="w-full h-full  px-2 justify-center items-center flex flex-col bg-slate-50 rounded-xl">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2092f0"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-circle-pound-sterling-icon lucide-circle-pound-sterling"
                  >
                    <path d="M10 16V9.5a1 1 0 0 1 5 0" />
                    <path d="M8 12h4" />
                    <path d="M8 16h7" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </div>
                <div className="text-xl font-bold">
                  {fmtCurrency(totalRevenue)}
                </div>
                <div className="text-xs">Total Revenue</div>
              </div>
              <div className="w-full h-full  px-2 justify-center items-center flex flex-col bg-slate-50 rounded-xl">
                <div>
                  <div className="w-full h-full  px-2 justify-center items-center flex flex-col bg-slate-50 rounded-xl">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#2092f0"
                        stroke-width="1.25"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-circle-pound-sterling-icon lucide-circle-pound-sterling"
                      >
                        <path d="M10 16V9.5a1 1 0 0 1 5 0" />
                        <path d="M8 12h4" />
                        <path d="M8 16h7" />
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                    </div>
                    <div className="text-xl font-bold">
                      {targetAchPct.toFixed(1)}%
                    </div>
                    <div className="text-xs text-center">
                      Target Achievement{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 h-full max-sm:text-sm max-sm:py-1.5 px-2  items-center justify-around rounded-xl bg-slate-50 w-full">
              <div className=" h-full  px-2 justify-center items-center flex flex-col bg-slate-50 rounded-xl">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2092f0"
                    stroke-width="1.25"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-chart-column-decreasing-icon lucide-chart-column-decreasing"
                  >
                    <path d="M13 17V9" />
                    <path d="M18 17v-3" />
                    <path d="M3 3v16a2 2 0 0 0 2 2h16" />
                    <path d="M8 17V5" />
                  </svg>
                </div>
                <div className="text-xl font-bold">
                  {revenueGrowthPct === null
                    ? '—'
                    : `${revenueGrowthPct.toFixed(1)}%`}
                </div>
                <div className="text-xs">KPI </div>
              </div>
              <div className="flex justify-center flex-col items-center  rounded-xl py-0.5">
                <div className="p-1 rounded-full border border-[#2092f0] bg-[#2092f0]/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#2092f0"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-calendar-days-icon lucide-calendar-days"
                  >
                    <path d="M8 2v4" />
                    <path d="M16 2v4" />
                    <rect width="18" height="18" x="3" y="4" rx="2" />
                    <path d="M3 10h18" />
                    <path d="M8 14h.01" />
                    <path d="M12 14h.01" />
                    <path d="M16 14h.01" />
                    <path d="M8 18h.01" />
                    <path d="M12 18h.01" />
                    <path d="M16 18h.01" />
                  </svg>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className=" rounded-xl ring-0 outline-0 px-3 py-1"
                  >
                    {months.map((m, idx) => {
                      const date = new Date(m + '-01');
                      const formatted = date.toLocaleString('default', {
                        month: 'short',
                        year: 'numeric',
                      });
                      return (
                        <option
                          key={`${m}-${idx}`}
                          value={m}
                          className="py-2  rounded-xl"
                        >
                          {formatted}
                        </option>
                      );
                    })}
                  </select>
                  <div className="text-xs">Month</div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 max-sm:col-span-2 max-sm:row-span-2  min-h-80 row-span-4 row-start-2 col-start-1">
            <ChartComponent monthlySeries={monthlySeries} />
          </div>
          <div className="col-span-1 max-sm:col-span-2 max-sm:row-start-4 max-sm:row-span-3 row-span-4 row-start-2 col-start-2">
            <PieChartComponent productShare={productShare} />
          </div>
          <div className="col-span-1 max-sm:col-span-2 max-sm:row-span-1 row-start-6 col-start-1 row-span-2   ">
            <div className="flex font-sans w-full items-center py-2 max-sm:mt-3 justify-center mt-2    text-neutral-600 dark:text-neutral-200">
              Top 5 Products
            </div>
            <ProductTableComponent products={topProducts} />
          </div>
          <div className="col-span-1 max-sm:col-span-2 max-sm:row-start-7 max-sm:row-span-1 col-start-2 row-start-6 row-span-2    ">
            <div className="flex font-sans w-full items-center py-2 max-sm:mt-3 justify-center mt-2    text-neutral-600 dark:text-neutral-200">
              Top 5 Customers
            </div>
            <CustomerTableComponent customers={topCustomers} />
          </div>
        </div>
      </div>
    </div>
  );
}
