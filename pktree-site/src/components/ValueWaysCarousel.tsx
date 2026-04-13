import type { CSSProperties } from "react";
import type { PaymentMethod } from "../types";

interface ValueWaysCarouselProps {
  methods: PaymentMethod[];
  selectedId: string | null;
  onSelect: (method: PaymentMethod) => void;
}

const ValueWaysCarousel = ({
  methods,
  selectedId,
  onSelect,
}: ValueWaysCarouselProps) => (
  <section aria-label="Donation methods" className="value-ways">

    <div className="value-ways-track" role="list">
      {methods.map((method) => {
        const Icon = method.icon;
        const selected = method.id === selectedId;

        return (
          <button
            className={`value-card${selected ? " is-selected" : ""}${method.featured ? " is-featured" : ""}`}
            key={method.id}
            data-id={method.id}
            role="listitem"
            type="button"
            onClick={() => onSelect(method)}
            style={{ "--accent": method.accent } as CSSProperties}
            aria-pressed={selected}
            aria-label={`${method.label} - ${method.summary}`}
          >
            <Icon aria-hidden="true" />
            <span className="value-card-tooltip">{method.label}</span>
          </button>
        );
      })}
    </div>
  </section>
);

export default ValueWaysCarousel;
