"use client";

export function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex p-0.5 rounded-[9px] bg-[var(--fill-tertiary)] border border-[var(--separator)]"
    >
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(opt.value)}
            className={`min-h-[32px] px-3 sm:px-4 rounded-[7px] text-[13px] font-medium transition-colors whitespace-nowrap ${
              selected
                ? "bg-[var(--fill-secondary)] text-[var(--label-primary)] shadow-sm"
                : "text-[var(--label-secondary)] hover:text-[var(--label-primary)]"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
