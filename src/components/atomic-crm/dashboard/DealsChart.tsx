import { ResponsiveBar } from "@nivo/bar";
import { format, startOfMonth } from "date-fns";
import { DollarSign } from "lucide-react";
import { useGetList } from "ra-core";
import { memo, useMemo } from "react";

import type { Deal } from "../types";

// ✅ Define cuáles son "ganados" y "perdidos" con tu nuevo pipeline
const WON_STAGES = new Set(["me-compro", "ya-compro"]);
const LOST_STAGES = new Set(["caidos"]);

// ✅ Multiplicador para revenue "expected" (pending)
// Ajusta estos pesos a tu negocio (estos son razonables como ejemplo).
const multiplier: Record<string, number> = {
  leads: 0.05,
  "en-proceso-de-contacto": 0.1,
  "en-proceso-de-agendamiento": 0.15,
  "no-responde": 0.02,
  "no-asistio-a-reunion": 0.05,
  "asesoria-agendada": 0.25,
  "documentos-solicitados": 0.35,
  calificados: 0.45,
  "presentacion-de-proyectos-agendada": 0.55,
  "propuestas-enviadas": 0.65,
  "visita-agendada": 0.75,
  "evaluando-documentos": 0.85,
  reserva: 0.9,
  promesa: 0.95,
  escritura: 0.98,

  congelados: 0.1,
  "informacion-con-error": 0.05,

  // si te aparecen stages raros/antiguos, cae en default (ver abajo)
};

const threeMonthsAgo = new Date(
  new Date().setMonth(new Date().getMonth() - 6),
).toISOString();

const DEFAULT_LOCALE = "en-US";
const CURRENCY = "USD";

export const DealsChart = memo(() => {
  const acceptedLanguages = navigator
    ? navigator.languages || [navigator.language]
    : [DEFAULT_LOCALE];

  const { data, isPending } = useGetList<Deal>("deals", {
    pagination: { perPage: 100, page: 1 },
    sort: {
      field: "created_at",
      order: "ASC",
    },
    filter: {
      "created_at@gte": threeMonthsAgo,
    },
  });

  const months = useMemo(() => {
    if (!data) return [];

    const dealsByMonth = data.reduce((acc, deal) => {
      const month = startOfMonth(deal.created_at ?? new Date()).toISOString();
      if (!acc[month]) acc[month] = [];
      acc[month].push(deal);
      return acc;
    }, {} as Record<string, Deal[]>);

    return Object.keys(dealsByMonth).map((month) => {
      const deals = dealsByMonth[month];

      const won = deals
        .filter((deal) => WON_STAGES.has(deal.stage))
        .reduce((acc, deal) => acc + (deal.amount ?? 0), 0);

      const lost = deals
        .filter((deal) => LOST_STAGES.has(deal.stage))
        .reduce((acc, deal) => acc - (deal.amount ?? 0), 0);

      const pending = deals
        .filter(
          (deal) => !WON_STAGES.has(deal.stage) && !LOST_STAGES.has(deal.stage),
        )
        .reduce((acc, deal) => {
          const stageMultiplier = multiplier[deal.stage] ?? 0.2; // default razonable
          return acc + (deal.amount ?? 0) * stageMultiplier;
        }, 0);

      return {
        date: format(month, "MMM"),
        won,
        pending,
        lost,
      };
    });
  }, [data]);

  if (isPending) return null;

  const range = months.reduce(
    (acc, month) => {
      acc.min = Math.min(acc.min, month.lost);
      acc.max = Math.max(acc.max, month.won + month.pending);
      return acc;
    },
    { min: 0, max: 0 },
  );

  return (
    <div className="flex flex-col">
      <div className="flex items-center mb-4">
        <div className="mr-3 flex">
          <DollarSign className="text-muted-foreground w-6 h-6" />
        </div>
        <h2 className="text-xl font-semibold text-muted-foreground">
          Upcoming Deal Revenue
        </h2>
      </div>

      <div className="h-[400px]">
        <ResponsiveBar
          data={months}
          indexBy="date"
          keys={["won", "pending", "lost"]}
          colors={["#61cdbb", "#97e3d5", "#e25c3b"]}
          margin={{ top: 30, right: 50, bottom: 30, left: 0 }}
          padding={0.3}
          valueScale={{
            type: "linear",
            min: range.min * 1.2,
            max: range.max * 1.2,
          }}
          indexScale={{ type: "band", round: true }}
          enableGridX={true}
          enableGridY={false}
          enableLabel={false}
          tooltip={({ value, indexValue }) => (
            <div className="p-2 bg-secondary rounded shadow inline-flex items-center gap-1 text-secondary-foreground">
              <strong>{indexValue}: </strong>&nbsp;{value > 0 ? "+" : ""}
              {value.toLocaleString(acceptedLanguages.at(0) ?? DEFAULT_LOCALE, {
                style: "currency",
                currency: CURRENCY,
              })}
            </div>
          )}
          axisTop={{
            tickSize: 0,
            tickPadding: 12,
            style: {
              ticks: { text: { fill: "var(--color-muted-foreground)" } },
              legend: { text: { fill: "var(--color-muted-foreground)" } },
            },
          }}
          axisBottom={{
            legendPosition: "middle",
            legendOffset: 50,
            tickSize: 0,
            tickPadding: 12,
            style: {
              ticks: { text: { fill: "var(--color-muted-foreground)" } },
              legend: { text: { fill: "var(--color-muted-foreground)" } },
            },
          }}
          axisLeft={null}
          axisRight={{
            format: (v: any) => `${Math.abs(v / 1000)}k`,
            tickValues: 8,
            style: {
              ticks: { text: { fill: "var(--color-muted-foreground)" } },
              legend: { text: { fill: "var(--color-muted-foreground)" } },
            },
          }}
          markers={
            [
              {
                axis: "y",
                value: 0,
                lineStyle: { strokeOpacity: 0 },
                textStyle: { fill: "#2ebca6" },
                legend: "Won",
                legendPosition: "top-left",
                legendOrientation: "vertical",
              },
              {
                axis: "y",
                value: 0,
                lineStyle: { stroke: "#f47560", strokeWidth: 1 },
                textStyle: { fill: "#e25c3b" },
                legend: "Lost",
                legendPosition: "bottom-left",
                legendOrientation: "vertical",
              },
            ] as any
          }
        />
      </div>
    </div>
  );
});