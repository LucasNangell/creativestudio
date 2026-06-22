"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = ["#22d3ee", "#818cf8", "#34d399", "#fbbf24", "#f472b6", "#a78bfa"];

type AdmChartsProps = {
  visitsByDay: { date: string; count: number }[];
  eventsByType: { name: string; count: number }[];
  demoViews: { slug: string; opens: number; interactions: number; ctaClicks: number }[];
  locations: { country: string; region: string | null; city: string | null; count: number }[];
};

function ChartCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-nangell-xl border border-glass-border bg-nangell-surface/50 p-4 ${className ?? ""}`}
    >
      <h2 className="mb-4 font-heading text-sm font-semibold text-nangell-text">{title}</h2>
      {children}
    </section>
  );
}

export function AdmCharts({
  visitsByDay,
  eventsByType,
  demoViews,
  locations,
}: AdmChartsProps) {
  const locationChart = locations.slice(0, 8).map((row) => ({
    name: row.city ? `${row.city}, ${row.country}` : row.country,
    count: row.count,
  }));

  const demoChart = demoViews.slice(0, 8).map((row) => ({
    name: row.slug,
    opens: row.opens,
  }));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <ChartCard title="Visitas por dia">
        {visitsByDay.length === 0 ? (
          <p className="py-12 text-center text-sm text-nangell-muted">Sem dados no período.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={visitsByDay}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="date"
                tick={{ fill: "#94a3b8", fontSize: 11 }}
                tickFormatter={(value: string) => value.slice(5)}
              />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                name="Visitas"
                stroke="#22d3ee"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Ações por tipo">
        {eventsByType.length === 0 ? (
          <p className="py-12 text-center text-sm text-nangell-muted">Sem eventos no período.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={eventsByType}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name} (${((percent ?? 0) * 100).toFixed(0)}%)`
                }
              >
                {eventsByType.map((_, index) => (
                  <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Demonstrações mais abertas">
        {demoChart.length === 0 ? (
          <p className="py-12 text-center text-sm text-nangell-muted">Sem aberturas de demo.</p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={demoChart} layout="vertical" margin={{ left: 8, right: 8 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis type="number" tick={{ fill: "#94a3b8", fontSize: 11 }} allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                width={120}
                tick={{ fill: "#94a3b8", fontSize: 10 }}
              />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="opens" name="Aberturas" fill="#818cf8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title="Visitantes por localização">
        {locationChart.length === 0 ? (
          <p className="py-12 text-center text-sm text-nangell-muted">
            Geolocalização aparecerá após as primeiras visitas.
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={locationChart}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="name"
                tick={{ fill: "#94a3b8", fontSize: 10 }}
                interval={0}
                angle={-20}
                textAnchor="end"
                height={70}
              />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                }}
              />
              <Bar dataKey="count" name="Visitas" fill="#34d399" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>
    </div>
  );
}
