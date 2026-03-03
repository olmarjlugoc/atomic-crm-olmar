import { Droppable } from "@hello-pangea/dnd";

import { useConfigurationContext } from "../root/ConfigurationContext";
import type { Deal } from "../types";
import { findDealLabel } from "./deal";
import { DealCard } from "./DealCard";

export const DealColumn = ({
  stage,
  deals,
}: {
  stage: string;
  deals: Deal[];
}) => {
  const totalAmount = deals.reduce((sum, deal) => sum + deal.amount, 0);

  const { dealStages } = useConfigurationContext();

  // ✅ Buscamos la definición completa del stage para usar className (color)
  const stageDef = dealStages?.find((s: any) => s.value === stage);

  return (
    <div className="min-w-[280px] max-w-[320px] pb-4 p-2 rounded-2xl border border-muted/40 bg-background">
      {/* ✅ Header con color (borde + fondo suave) */}
      <div
        className={[
          "rounded-2xl border-l-4 px-3 py-2",
          stageDef?.className ?? "border-muted bg-muted/20",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold leading-snug line-clamp-2">
            {stageDef?.label ?? findDealLabel(dealStages, stage)}
          </h3>

          {/* pequeño contador de deals para ayudar visualmente */}
          <span className="text-xs text-muted-foreground">
            {deals.length}
          </span>
        </div>

        <p className="text-xs text-muted-foreground mt-1">
          {totalAmount.toLocaleString("en-US", {
            notation: "compact",
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
            minimumSignificantDigits: 3,
          })}
        </p>
      </div>

      <Droppable droppableId={stage}>
        {(droppableProvided, snapshot) => (
          <div
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
            className={`flex flex-col rounded-2xl mt-2 gap-2 min-h-[140px] border border-dashed border-muted/40 p-2 ${
              snapshot.isDraggingOver ? "bg-muted/40" : "bg-transparent"
            }`}
          >
            {deals.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
            {droppableProvided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};